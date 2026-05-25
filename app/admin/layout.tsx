'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from './actions'
import { LayoutGrid, FolderOpen, LogOut } from 'lucide-react'

const navItems = [
  { href: '/admin',            label: 'Dashboard', Icon: LayoutGrid, exact: true },
  { href: '/admin/realisations', label: 'Projets',   Icon: FolderOpen, exact: false },
]

function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 min-h-screen bg-[#0F0F0F] border-r border-white/8 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/8">
        <Link href="/" target="_blank" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#2D6A4F] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">LP</span>
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-none">Le Panaf</p>
            <p className="text-white/40 text-[10px] leading-none mt-0.5 group-hover:text-white/60 transition-colors">
              Admin ↗
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 px-3 mb-2">
          Contenu
        </p>
        {navItems.map(({ href, label, Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#2D6A4F]/20 text-[#52B788]'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={17} className={isActive ? 'text-[#52B788]' : 'text-white/30'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/8">
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
          >
            <LogOut size={17} />
            Déconnexion
          </button>
        </form>
      </div>

    </aside>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="flex min-h-screen bg-[#F7F7F5]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
