"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Badge } from '../../../components/ui/badge'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'
import { supabase } from '../../../lib/supabase'

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: ''
  })

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setBlogs(data || [])
    setLoading(false)
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && { slug: generateSlug(value) })
    }))
  }

  const handleAdd = async () => {
    if (!formData.title || !formData.content) return

    const { error } = await supabase
      .from('blogs')
      .insert([formData])

    if (!error) {
      setFormData({ title: '', slug: '', content: '' })
      setShowAddForm(false)
      fetchBlogs()
    }
  }

  const handleEdit = (blog) => {
    setFormData(blog)
    setEditingId(blog.id)
  }

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('blogs')
      .update(formData)
      .eq('id', editingId)

    if (!error) {
      setEditingId(null)
      setFormData({ title: '', slug: '', content: '' })
      fetchBlogs()
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)

    if (!error) fetchBlogs()
  }

  const handleCancel = () => {
    setEditingId(null)
    setShowAddForm(false)
    setFormData({ title: '', slug: '', content: '' })
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage your blog content</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Add New Post
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Blog Post' : 'Add New Blog Post'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={10}
                placeholder="Write your blog content in Markdown..."
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={editingId ? handleUpdate : handleAdd}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                {editingId ? 'Update' : 'Create'} Post
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X size={16} className="mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts List */}
      <div className="space-y-4">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{blog.title}</CardTitle>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">{blog.slug}</Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(blog)}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3">
                {blog.content.substring(0, 200)}...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {blogs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Create your first post!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}