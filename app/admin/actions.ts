'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { signAdminToken, setAdminCookie, deleteAdminCookie, getAdminSession } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import type { StatutProjet } from '@/lib/supabase'

// ─── Helpers étude de cas ─────────────────────────────────────────────────────

/**
 * Parse un champ JSON provenant de FormData.
 * Retourne null si la valeur est vide ou si le tableau résultant est vide.
 */
function parseCaseField<T>(raw: FormDataEntryValue | null): T[] | null {
  if (!raw || typeof raw !== 'string' || !raw.trim()) return null
  try {
    const parsed = JSON.parse(raw) as T[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null
  } catch {
    return null
  }
}

/** Lit et parse tous les champs "étude de cas" depuis un FormData. */
function extractCaseStudyData(formData: FormData): Record<string, unknown> {
  const statement = (formData.get('case_statement') as string)?.trim() || null
  const enjeux    = parseCaseField(formData.get('case_enjeux'))
  const livrables = parseCaseField<string>(formData.get('case_livrables'))
  const approche  = parseCaseField(formData.get('case_approche'))
  const outils    = parseCaseField(formData.get('case_outils'))
  const resultats = parseCaseField(formData.get('case_resultats'))
  return { statement, enjeux, livrables, approche, outils, resultats }
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export async function loginAction(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const password = formData.get('password') as string
  const expected = process.env.ADMIN_PASSWORD ?? ''

  // Comparaison en temps constant pour éviter les timing attacks
  if (!password || !timingSafeEqual(password, expected)) {
    return { error: 'Mot de passe incorrect' }
  }

  const token = await signAdminToken()
  await setAdminCookie(token)
  redirect('/admin')
}

/**
 * Comparaison de chaînes en temps constant (protection contre les timing attacks).
 * Utilise la même durée quelle que soit la position du premier caractère différent.
 */
function timingSafeEqual(a: string, b: string): boolean {
  const bufA = new TextEncoder().encode(a)
  const bufB = new TextEncoder().encode(b)
  if (bufA.length !== bufB.length) {
    // On compare quand même pour consommer du temps
    let diff = 0
    for (let i = 0; i < bufA.length; i++) diff |= bufA[i] ^ (bufB[i % bufB.length] ?? 0)
    return false
  }
  let diff = 0
  for (let i = 0; i < bufA.length; i++) diff |= bufA[i] ^ bufB[i]
  return diff === 0
}

export async function logoutAction() {
  await deleteAdminCookie()
  redirect('/admin/login')
}

// ─── STATUT ───────────────────────────────────────────────────────────────────

/**
 * Change le statut d'un projet.
 * Si on passe un projet en "vedette", l'ancien vedette repasse en "en_cours".
 */
export async function setStatutAction(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const isAuth = await getAdminSession()
  if (!isAuth) return { error: 'Non autorisé' }

  const id = Number(formData.get('id'))
  const statut = formData.get('statut') as StatutProjet

  // Un seul projet peut être "vedette" — l'ancien repasse en "en_cours"
  if (statut === 'vedette') {
    await supabase
      .from('projets')
      .update({ statut: 'en_cours', updated_at: new Date().toISOString() })
      .eq('statut', 'vedette')
      .neq('id', id)
  }

  const updateData: Record<string, unknown> = {
    statut,
    updated_at: new Date().toISOString(),
  }

  // Champs supplémentaires quand le projet devient "en cours" ou "vedette"
  if (statut === 'vedette' || statut === 'en_cours') {
    const avancement = formData.get('avancement')
    if (avancement !== null && avancement !== '') {
      updateData.avancement = Math.min(100, Math.max(0, Number(avancement)))
    }
    const lancement = (formData.get('lancement') as string)?.trim()
    if (lancement) updateData.lancement = lancement
    const emoji = (formData.get('emoji') as string)?.trim()
    if (emoji) updateData.emoji = emoji
  }

  const { error } = await supabase.from('projets').update(updateData).eq('id', id)
  if (error) {
    console.error('[setStatutAction] Erreur Supabase:', error.message)
    return { error: 'Erreur lors de la mise à jour du statut.' }
  }

  revalidatePath('/realisations')
  revalidatePath('/admin/realisations')
  revalidatePath('/')
  return { success: true }
}

// ─── PROJETS ──────────────────────────────────────────────────────────────────

const IMAGE_BUCKET = 'realisations'

// Types MIME et extensions autorisés pour les images
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif'])
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024 // 5 Mo

function buildSlug(nom: string): string {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function uploadImage(file: File, slug: string): Promise<string> {
  // Validation du type MIME déclaré
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error('Type de fichier non autorisé. Formats acceptés : JPG, PNG, WebP, GIF.')
  }

  // Validation de l'extension (basée sur le nom de fichier)
  const ext = (file.name.split('.').pop() ?? '').toLowerCase()
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error('Extension de fichier non autorisée. Formats acceptés : jpg, png, webp, gif.')
  }

  // Validation de la taille
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error('Fichier trop volumineux. Taille maximale : 5 Mo.')
  }

  // Lire les premiers octets pour vérifier la signature magique du fichier
  const bytes = await file.arrayBuffer()
  const header = new Uint8Array(bytes.slice(0, 8))
  if (!isValidImageSignature(header, file.type)) {
    throw new Error('Le contenu du fichier ne correspond pas à son type déclaré.')
  }

  const safePath = `${slug}-${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(safePath, bytes, { contentType: file.type, upsert: true })

  if (error) {
    console.error('[uploadImage] Erreur Supabase storage:', error.message)
    throw new Error('Erreur lors de l\'upload de l\'image.')
  }
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(safePath).data.publicUrl
}

/**
 * Vérifie la signature magique des fichiers image (magic bytes).
 * Empêche d'uploader un fichier malveillant renommé en .jpg, etc.
 */
function isValidImageSignature(header: Uint8Array, mime: string): boolean {
  // JPEG: FF D8 FF
  if (mime === 'image/jpeg') return header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (mime === 'image/png')
    return header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47
  // WebP: 52 49 46 46 ... 57 45 42 50
  if (mime === 'image/webp') return header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46
  // GIF: 47 49 46 38
  if (mime === 'image/gif') return header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x38
  return false
}

async function deleteImageByUrl(url: string) {
  const marker = `/object/public/${IMAGE_BUCKET}/`
  const idx = url.indexOf(marker)
  if (idx === -1) return
  const path = url.slice(idx + marker.length)
  await supabase.storage.from(IMAGE_BUCKET).remove([path])
}

export async function createProjetAction(_prevState: unknown, formData: FormData) {
  const isAuth = await getAdminSession()
  if (!isAuth) throw new Error('Non autorisé')

  const nom = formData.get('nom') as string
  const slug = buildSlug(nom)
  const statut = (formData.get('statut') as StatutProjet) || 'termine'

  const imageFile = formData.get('image') as File | null
  let image_url: string | null = null
  if (imageFile && imageFile.size > 0) {
    image_url = await uploadImage(imageFile, slug)
  }

  // Si on crée un nouveau "vedette", l'ancien repasse en "en_cours"
  if (statut === 'vedette') {
    await supabase
      .from('projets')
      .update({ statut: 'en_cours', updated_at: new Date().toISOString() })
      .eq('statut', 'vedette')
  }

  const data: Record<string, unknown> = {
    statut,
    slug,
    nom,
    ville: formData.get('ville') as string,
    service: formData.get('service') as string,
    description: formData.get('description') as string,
    lien: (formData.get('lien') as string).trim() || null,
    image_url,
    ordre: Number(formData.get('ordre')) || 99,
  }

  if (statut === 'vedette' || statut === 'en_cours') {
    data.avancement = Math.min(100, Math.max(0, Number(formData.get('avancement') || 0)))
    data.lancement = (formData.get('lancement') as string)?.trim() || null
    data.emoji = (formData.get('emoji') as string)?.trim() || '🏗️'
  } else {
    data.type = formData.get('type') as string
    data.annee = formData.get('annee') as string
    data.tag = formData.get('tag') as string
    data.gradient = formData.get('gradient') as string
    data.accent = formData.get('accent') as string
  }

  // Champs étude de cas
  Object.assign(data, extractCaseStudyData(formData))

  const { error } = await supabase.from('projets').insert(data)
  if (error) {
    console.error('[createProjetAction] Erreur Supabase:', error.message)
    throw new Error('Erreur lors de la création du projet.')
  }

  revalidatePath('/realisations')
  revalidatePath('/admin/realisations')
  redirect('/admin/realisations')
}

export async function updateProjetAction(_prevState: unknown, formData: FormData) {
  const isAuth = await getAdminSession()
  if (!isAuth) throw new Error('Non autorisé')

  const id = formData.get('id') as string
  const nom = formData.get('nom') as string
  const slug = buildSlug(nom)
  const statut = (formData.get('statut') as StatutProjet) || 'termine'

  const imageFile = formData.get('image') as File | null
  const currentImageUrl = (formData.get('current_image_url') as string) || null
  const removeImage = formData.get('remove_image') === '1'

  let image_url: string | null = currentImageUrl
  if (removeImage) {
    if (currentImageUrl) await deleteImageByUrl(currentImageUrl)
    image_url = null
  } else if (imageFile && imageFile.size > 0) {
    if (currentImageUrl) await deleteImageByUrl(currentImageUrl)
    image_url = await uploadImage(imageFile, slug)
  }

  // Si on passe ce projet en "vedette", l'ancien repasse en "en_cours"
  if (statut === 'vedette') {
    await supabase
      .from('projets')
      .update({ statut: 'en_cours', updated_at: new Date().toISOString() })
      .eq('statut', 'vedette')
      .neq('id', id)
  }

  const data: Record<string, unknown> = {
    statut,
    nom,
    slug,
    ville: formData.get('ville') as string,
    service: formData.get('service') as string,
    description: formData.get('description') as string,
    lien: (formData.get('lien') as string).trim() || null,
    image_url,
    ordre: Number(formData.get('ordre')) || 99,
    updated_at: new Date().toISOString(),
  }

  if (statut === 'vedette' || statut === 'en_cours') {
    data.avancement = Math.min(100, Math.max(0, Number(formData.get('avancement') || 0)))
    data.lancement = (formData.get('lancement') as string)?.trim() || null
    data.emoji = (formData.get('emoji') as string)?.trim() || '🏗️'
  } else {
    data.type = formData.get('type') as string
    data.annee = formData.get('annee') as string
    data.tag = formData.get('tag') as string
    data.gradient = formData.get('gradient') as string
    data.accent = formData.get('accent') as string
  }

  // Champs étude de cas
  Object.assign(data, extractCaseStudyData(formData))

  const { error } = await supabase.from('projets').update(data).eq('id', id)
  if (error) {
    console.error('[updateProjetAction] Erreur Supabase:', error.message)
    throw new Error('Erreur lors de la mise à jour du projet.')
  }

  revalidatePath('/realisations')
  revalidatePath(`/realisations/${data.slug}`)
  revalidatePath('/admin/realisations')
  redirect('/admin/realisations')
}

export async function deleteProjetAction(formData: FormData) {
  const isAuth = await getAdminSession()
  if (!isAuth) throw new Error('Non autorisé')

  const id = formData.get('id') as string

  const { error } = await supabase.from('projets').delete().eq('id', id)
  if (error) {
    console.error('[deleteProjetAction] Erreur Supabase:', error.message)
    throw new Error('Erreur lors de la suppression du projet.')
  }

  revalidatePath('/realisations')
  revalidatePath('/admin/realisations')
}
