"use client"
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '../../lib/supabase'
import { Button } from '../../components/ui/button'
import { LogOut, Home, FileText, Award, Mail, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Always call useEffect, but conditionally execute logic
  useEffect(() => {
    // Don't run auth logic for login page
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

  // Return login page without admin layout
  if (pathname === '/admin/login') {
    return children
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
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

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <Home size={18} />
                Dashboard
              </Link>
              <Link
                href="/admin/blogs"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <FileText size={18} />
                Blog Posts
              </Link>
              <Link
                href="/admin/projects"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <PlusCircle size={18} />
                Projects
              </Link>
              <Link
                href="/admin/certificates"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <Award size={18} />
                Certificates
              </Link>
              <Link
                href="/admin/contacts"
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <Mail size={18} />
                Contact Messages
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}