"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseclient'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      if (data?.session?.user) {
        setUser(data.session.user)
        setLoading(false)
      } else {
        router.push('/login')
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        setLoading(false)
      } else {
        router.push('/login')
      }
    })

    return () => {
      mounted = false
      try {
        listener?.subscription?.unsubscribe?.()
      } catch (e) {
        // ignore
      }
    }
  }, [router])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="p-6">Checking authentication...</div>

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-black/80 p-3 flex items-center justify-between">
        <div className="text-lg font-bold text-[#FFD700]">Admin</div>
        <button onClick={() => setOpen(true)} className="p-2 rounded bg-white/5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed z-50 inset-y-0 left-0 transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:inset-auto w-64 bg-black/80 p-6 flex flex-col transition-transform`}>
        <div className="md:hidden flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#FFD700]">Admin</h2>
          <button onClick={() => setOpen(false)} className="p-2 rounded bg-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <Link href="/admin" className="text-white/90">Dashboard</Link>
          <Link href="/admin/products" className="text-white/90">Homes</Link>
          <Link href="/admin/orders" className="text-white/90">Orders</Link>
        </nav>

        <div className="mt-auto pt-6">
          <div className="text-sm text-white/70 mb-3">{user?.email}</div>
          <button onClick={handleSignOut} className="px-3 py-2 bg-red-600 rounded text-white w-full">Sign out</button>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar open */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setOpen(false)} />}

      <main className="flex-1 p-6 md:ml-64">
        <div className="md:hidden h-12" />
        {children}
      </main>
    </div>
  )
}
