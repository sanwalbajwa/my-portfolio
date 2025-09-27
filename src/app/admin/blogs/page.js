"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Badge } from '../../../components/ui/badge'
import { Plus, Edit, Trash2, Save, X, Eye, Upload } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import RichTextEditor from '../../../components/RichTextEditor'
import WordImporter from '../../../components/WordImporter'

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showImporter, setShowImporter] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'General',
    featured_image: '',
    meta_description: '',
    meta_keywords: '',
    status: 'draft',
    author: 'Sanwal Bajwa',
    tags: ''
  })

  useEffect(() => {
    fetchBlogs()
    fetchCategories()
  }, [])

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setBlogs(data || [])
    setLoading(false)
  }

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')
    
    if (!error) setCategories(data || [])
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  const calculateReadTime = (content) => {
    const words = content.replace(/<[^>]*>/g, '').split(' ').length
    return Math.ceil(words / 200) // Average reading speed
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && { slug: generateSlug(value) })
    }))
  }

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content,
      read_time: calculateReadTime(content)
    }))
  }

  const handleWordImport = (importedData) => {
    setFormData(prev => ({
      ...prev,
      ...importedData,
      read_time: calculateReadTime(importedData.content)
    }))
    setShowImporter(false)
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return

    const slug = generateSlug(newCategoryName)
    const { error } = await supabase
      .from('blog_categories')
      .insert([{ 
        name: newCategoryName.trim(),
        slug: slug,
        description: `Articles about ${newCategoryName.toLowerCase()}`
      }])

    if (!error) {
      setNewCategoryName('')
      setShowCategoryForm(false)
      fetchCategories()
      setFormData(prev => ({ ...prev, category: newCategoryName.trim() }))
    }
  }

  const formatTags = (tagsString) => {
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
  }

  const formatKeywords = (keywordsString) => {
    return keywordsString.split(',').map(keyword => keyword.trim()).filter(keyword => keyword)
  }

  const handleAdd = async () => {
    if (!formData.title || !formData.content) return

    const blogData = {
      ...formData,
      tags: formatTags(formData.tags),
      meta_keywords: formatKeywords(formData.meta_keywords),
      read_time: calculateReadTime(formData.content)
    }

    const { error } = await supabase
      .from('blogs')
      .insert([blogData])

    if (!error) {
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        category: 'General',
        featured_image: '',
        meta_description: '',
        meta_keywords: '',
        status: 'draft',
        author: 'Sanwal Bajwa',
        tags: ''
      })
      setShowAddForm(false)
      fetchBlogs()
    }
  }

  const handleEdit = (blog) => {
    setFormData({
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
      meta_keywords: Array.isArray(blog.meta_keywords) ? blog.meta_keywords.join(', ') : blog.meta_keywords || ''
    })
    setEditingId(blog.id)
  }

  const handleUpdate = async () => {
    const blogData = {
      ...formData,
      tags: formatTags(formData.tags),
      meta_keywords: formatKeywords(formData.meta_keywords),
      read_time: calculateReadTime(formData.content)
    }

    const { error } = await supabase
      .from('blogs')
      .update(blogData)
      .eq('id', editingId)

    if (!error) {
      setEditingId(null)
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        category: 'General',
        featured_image: '',
        meta_description: '',
        meta_keywords: '',
        status: 'draft',
        author: 'Sanwal Bajwa',
        tags: ''
      })
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
    setShowImporter(false)
    setFormData({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      category: 'General',
      featured_image: '',
      meta_description: '',
      meta_keywords: '',
      status: 'draft',
      author: 'Sanwal Bajwa',
      tags: ''
    })
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600">Manage your blog content with SEO optimization</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowCategoryForm(true)}
          >
            <Plus size={16} className="mr-2" />
            Add Category
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowImporter(true)}
          >
            <Upload size={16} className="mr-2" />
            Import Word Doc
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus size={16} className="mr-2" />
            Add New Post
          </Button>
        </div>
      </div>

      {/* Add Category Form */}
      {showCategoryForm && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Category Name</label>
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Machine Learning, Tutorial"
                />
              </div>
              <Button onClick={handleAddCategory}>Add</Button>
              <Button variant="outline" onClick={() => {
                setShowCategoryForm(false)
                setNewCategoryName('')
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Word Importer */}
      {showImporter && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Import from Word Document</CardTitle>
          </CardHeader>
          <CardContent>
            <WordImporter onImport={handleWordImport} />
            <div className="mt-4">
              <Button variant="outline" onClick={() => setShowImporter(false)}>
                Close Importer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Blog Post' : 'Add New Blog Post'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <Input
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="url-friendly-slug"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <RichTextEditor 
                content={formData.content}
                onChange={handleContentChange}
              />
            </div>

            {/* SEO Section */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-4">SEO Settings</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Excerpt</label>
                  <Textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Brief description of the post (recommended: 150-160 characters)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Meta Description</label>
                  <Textarea
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="SEO meta description (recommended: 150-160 characters)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Keywords (comma-separated)</label>
                    <Input
                      name="meta_keywords"
                      value={formData.meta_keywords}
                      onChange={handleInputChange}
                      placeholder="web development, javascript, tutorial"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                    <Input
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="coding, tutorial, tips"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                  <Input
                    name="featured_image"
                    value={formData.featured_image}
                    onChange={handleInputChange}
                    placeholder="https://images.example.com/featured-image.jpg"
                  />
                </div>
              </div>
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
                    <Badge variant="outline">{blog.category}</Badge>
                    <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                      {blog.status}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-500">
                      {blog.read_time || 5} min read
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {blog.status === 'published' && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                        <Eye size={14} />
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleEdit(blog)}>
                    <Edit size={14} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(blog.id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3 mb-3">
                {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'}
              </p>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
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