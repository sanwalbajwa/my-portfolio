"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Badge } from '../../../components/ui/badge'
import { Plus, Edit, Trash2, Save, X, ExternalLink } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import Image from 'next/image'

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    link: '',
    image: ''
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setProjects(data || [])
    setLoading(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatTechStack = (techString) => {
    return techString.split(',').map(tech => tech.trim()).filter(tech => tech)
  }

  const handleAdd = async () => {
    if (!formData.title || !formData.description) return

    const projectData = {
      ...formData,
      tech_stack: formatTechStack(formData.tech_stack)
    }

    const { error } = await supabase
      .from('projects')
      .insert([projectData])

    if (!error) {
      setFormData({ title: '', description: '', tech_stack: '', link: '', image: '' })
      setShowAddForm(false)
      fetchProjects()
    }
  }

  const handleEdit = (project) => {
    setFormData({
      ...project,
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : project.tech_stack
    })
    setEditingId(project.id)
  }

  const handleUpdate = async () => {
    const projectData = {
      ...formData,
      tech_stack: formatTechStack(formData.tech_stack)
    }

    const { error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', editingId)

    if (!error) {
      setEditingId(null)
      setFormData({ title: '', description: '', tech_stack: '', link: '', image: '' })
      fetchProjects()
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (!error) fetchProjects()
  }

  const handleCancel = () => {
    setEditingId(null)
    setShowAddForm(false)
    setFormData({ title: '', description: '', tech_stack: '', link: '', image: '' })
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Add New Project
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Link</label>
                <Input
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://your-project.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your project..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tech Stack (comma-separated)</label>
              <Input
                name="tech_stack"
                value={formData.tech_stack}
                onChange={handleInputChange}
                placeholder="Next.js, React, Tailwind CSS, Supabase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://images.unsplash.com/photo-..."
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={editingId ? handleUpdate : handleAdd}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                {editingId ? 'Update' : 'Create'} Project
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X size={16} className="mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Project Image */}
                {project.image && (
                  <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {/* Project Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(project)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tech_stack && project.tech_stack.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <span className="text-sm text-gray-500">
                    Created: {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No projects yet. Add your first project!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}