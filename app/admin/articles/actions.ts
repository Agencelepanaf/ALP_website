'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'

async function requireAdmin() {
  if (!await getAdminSession()) redirect('/admin/login')
}

// ─── Image upload ──────────────────────────────────────────────────────────────

const BUCKET = 'realisations'
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const ALLOWED_EXT  = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif'])
const MAX_SIZE     = 5 * 1024 * 1024

function checkMagicBytes(header: Uint8Array, mime: string): boolean {
  if (mime === 'image/jpeg') return header[0] === 0xFF && header[1] === 0xD8 && header[2] === 0xFF
  if (mime === 'image/png')  return header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47
  if (mime === 'image/webp') return header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46
  if (mime === 'image/gif')  return header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x38
  return false
}

async function uploadImage(file: File, slug: string): Promise<string> {
  if (!ALLOWED_MIME.has(file.type)) throw new Error('Format non autorisé. Utilisez JPG, PNG, WebP ou GIF.')
  const ext = (file.name.split('.').pop() ?? '').toLowerCase()
  if (!ALLOWED_EXT.has(ext)) throw new Error('Extension non autorisée.')
  if (file.size > MAX_SIZE) throw new Error('Fichier trop volumineux (max 5 Mo).')

  const bytes = await file.arrayBuffer()
  if (!checkMagicBytes(new Uint8Array(bytes.slice(0, 8)), file.type)) {
    throw new Error('Le contenu du fichier ne correspond pas à son type.')
  }

  const path = `articles/${slug}-${Date.now()}.${ext}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, { contentType: file.type, upsert: true })
  if (error) throw new Error('Erreur lors de l\'upload.')

  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

async function deleteImageByUrl(url: string) {
  const marker = `/object/public/${BUCKET}/`
  const idx = url.indexOf(marker)
  if (idx === -1) return
  await supabase.storage.from(BUCKET).remove([url.slice(idx + marker.length)])
}

// ─── Actions ───────────────────────────────────────────────────────────────────

export async function createArticleAction(_: unknown, formData: FormData) {
  await requireAdmin()

  const slug   = (formData.get('slug') as string).trim()
  const statut = formData.get('statut') as string

  let image_url: string | null = null
  const imageFile = formData.get('image') as File | null
  if (imageFile && imageFile.size > 0) {
    try { image_url = await uploadImage(imageFile, slug) }
    catch (e) { return { error: (e as Error).message } }
  }

  const { error } = await supabase.from('articles').insert({
    slug,
    titre:       (formData.get('titre') as string).trim(),
    description: (formData.get('description') as string).trim(),
    contenu:     (formData.get('contenu') as string).trim(),
    image_url,
    statut,
    published_at: statut === 'publie' ? new Date().toISOString() : null,
  })

  if (error) return { error: error.message }

  revalidatePath('/blog')
  redirect('/admin/articles')
}

export async function updateArticleAction(_: unknown, formData: FormData) {
  await requireAdmin()

  const id         = formData.get('id') as string
  const prevStatut = formData.get('prev_statut') as string
  const newStatut  = formData.get('statut') as string
  const slug       = (formData.get('slug') as string).trim()
  const removeImage = formData.get('remove_image') === '1'
  const currentImageUrl = formData.get('current_image_url') as string | null

  let image_url: string | null | undefined = undefined

  const imageFile = formData.get('image') as File | null
  if (imageFile && imageFile.size > 0) {
    try {
      if (currentImageUrl) await deleteImageByUrl(currentImageUrl)
      image_url = await uploadImage(imageFile, slug)
    } catch (e) { return { error: (e as Error).message } }
  } else if (removeImage && currentImageUrl) {
    await deleteImageByUrl(currentImageUrl)
    image_url = null
  }

  const payload: Record<string, unknown> = {
    slug,
    titre:       (formData.get('titre') as string).trim(),
    description: (formData.get('description') as string).trim(),
    contenu:     (formData.get('contenu') as string).trim(),
    statut:      newStatut,
    updated_at:  new Date().toISOString(),
  }

  if (image_url !== undefined) payload.image_url = image_url
  if (newStatut === 'publie' && prevStatut !== 'publie') payload.published_at = new Date().toISOString()

  const { error } = await supabase.from('articles').update(payload).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  redirect('/admin/articles')
}

export async function deleteArticleAction(formData: FormData) {
  await requireAdmin()

  const id   = formData.get('id') as string
  const slug = formData.get('slug') as string

  const { data } = await supabase.from('articles').select('image_url').eq('id', id).single()
  if (data?.image_url) await deleteImageByUrl(data.image_url)

  await supabase.from('articles').delete().eq('id', id)

  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  redirect('/admin/articles')
}
