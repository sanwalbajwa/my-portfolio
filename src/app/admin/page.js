"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { FileText, FolderOpen, Award, Mail } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    certificates: 0,
    contacts: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      const [blogs, projects, certificates, contacts] = await Promise.all([
        supabase.from('blogs').select('id', { count: 'exact' }),
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('certificates').select('id', { count: 'exact' }),
        supabase.from('contacts').select('id', { count: 'exact' })
      ])

      setStats({
        blogs: blogs.count || 0,
        projects: projects.count || 0,
        certificates: certificates.count || 0,
        contacts: contacts.count || 0
      })
    }

    fetchStats()
  }, [])

  const statCards = [
    { title: 'Blog Posts', value: stats.blogs, icon: FileText, color: 'bg-blue-500' },
    { title: 'Projects', value: stats.projects, icon: FolderOpen, color: 'bg-green-500' },
    { title: 'Certificates', value: stats.certificates, icon: Award, color: 'bg-yellow-500' },
    { title: 'Contact Messages', value: stats.contacts, icon: Mail, color: 'bg-purple-500' }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white" size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/blogs"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium mb-2">Manage Blog Posts</h3>
              <p className="text-sm text-gray-600">Create, edit, and delete blog posts</p>
            </a>
            <a
              href="/admin/projects"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium mb-2">Manage Projects</h3>
              <p className="text-sm text-gray-600">Add and update your portfolio projects</p>
            </a>
            <a
              href="/admin/contacts"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium mb-2">View Messages</h3>
              <p className="text-sm text-gray-600">Check contact form submissions</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}