"use client"
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/button'
import { LogOut, Home, FileText, Award, Mail, PlusCircle, Upload } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
      
      if (!user) {
        router.push('/admin/login')
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        router.push('/admin/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router, pathname])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (pathname === '/admin/login') {
    return children
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2b766f]"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#f7f2e8]">
      {/* Admin Header */}
      <header className="bg-[#fbf8f1] shadow-sm border-b border-[#d8cdb9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:h-16 sm:py-0">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-[#17262d]">Admin Panel</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-sm text-[#5f665f] break-all">Welcome, {user.email}</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <Home size={16} />
                  View Site
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <nav className="bg-[#fbf8f1] shadow-sm border-b border-[#d8cdb9] lg:w-64 lg:min-h-screen lg:border-b-0 lg:border-r">
          <div className="p-3 lg:p-4">
            <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-2 lg:overflow-visible lg:pb-0">
              <Link
                href="/admin"
                className={`flex shrink-0 items-center gap-3 px-3 py-2 text-[#3e4948] rounded-lg hover:bg-[#efe6d7] ${
                  pathname === '/admin' ? 'bg-[#e0eee9] text-[#2b766f]' : ''
                }`}
              >
                <Home size={18} />
                Dashboard
              </Link>
              <Link
                href="/admin/blogs"
                className={`flex shrink-0 items-center gap-3 px-3 py-2 text-[#3e4948] rounded-lg hover:bg-[#efe6d7] ${
                  pathname === '/admin/blogs' ? 'bg-[#e0eee9] text-[#2b766f]' : ''
                }`}
              >
                <FileText size={18} />
                Blog Posts
              </Link>
              <Link
                href="/admin/projects"
                className={`flex shrink-0 items-center gap-3 px-3 py-2 text-[#3e4948] rounded-lg hover:bg-[#efe6d7] ${
                  pathname === '/admin/projects' ? 'bg-[#e0eee9] text-[#2b766f]' : ''
                }`}
              >
                <PlusCircle size={18} />
                Projects
              </Link>
              <Link
                href="/admin/certificates"
                className={`flex shrink-0 items-center gap-3 px-3 py-2 text-[#3e4948] rounded-lg hover:bg-[#efe6d7] ${
                  pathname === '/admin/certificates' ? 'bg-[#e0eee9] text-[#2b766f]' : ''
                }`}
              >
                <Award size={18} />
                Certificates
              </Link>
              {/* Add CV Management Link */}
              <Link
                href="/admin/cv"
                className={`flex shrink-0 items-center gap-3 px-3 py-2 text-[#3e4948] rounded-lg hover:bg-[#efe6d7] ${
                  pathname === '/admin/cv' ? 'bg-[#e0eee9] text-[#2b766f]' : ''
                }`}
              >
                <Upload size={18} />
                CV Management
              </Link>
              <Link
                href="/admin/contacts"
                className={`flex shrink-0 items-center gap-3 px-3 py-2 text-[#3e4948] rounded-lg hover:bg-[#efe6d7] ${
                  pathname === '/admin/contacts' ? 'bg-[#e0eee9] text-[#2b766f]' : ''
                }`}
              >
                <Mail size={18} />
                Contact Messages
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
