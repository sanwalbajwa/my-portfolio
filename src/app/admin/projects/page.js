"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Badge } from '../../../components/ui/badge'
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github, ArrowUp, ArrowDown, CircleCheck, Lock, FolderOpen } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import Image from 'next/image'
import ProjectImageUpload from '../../../components/ProjectImageUpload'

export default function AdminProjects() {
  const emptyProjectForm = {
    title: '',
    description: '',
    tech_stack: '',
    image: '',
    category: 'Web Development',
    display_order: '',
    is_live: false,
    live_url: '',
    is_code_available: true,
    github_url: ''
  }

  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [orderColumnAvailable, setOrderColumnAvailable] = useState(true)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [formData, setFormData] = useState(emptyProjectForm)

  useEffect(() => {
    fetchProjects()
    fetchCategories()
  }, [])

  const fetchProjects = async () => {
    let { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (error?.message?.includes('display_order')) {
      setOrderColumnAvailable(false)
      const fallback = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      data = fallback.data
      error = fallback.error
    } else if (!error) {
      setOrderColumnAvailable(true)
    }
    
    if (!error) setProjects(data || [])
    setLoading(false)
  }

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('project_categories')
      .select('*')
      .order('name')
    
    if (!error) setCategories(data || [])
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const formatTechStack = (techString) => {
    return techString.split(',').map(tech => tech.trim()).filter(tech => tech)
  }

  const getProjectOrder = (project, index) => {
    return Number.isFinite(Number(project.display_order)) ? Number(project.display_order) : index + 1
  }

  const getNextDisplayOrder = () => {
    return projects.reduce((maxOrder, project, index) => {
      return Math.max(maxOrder, getProjectOrder(project, index))
    }, 0) + 1
  }

  const getProjectPayload = () => {
    const payload = {
      ...formData,
      tech_stack: formatTechStack(formData.tech_stack)
    }

    if (orderColumnAvailable) {
      payload.display_order = formData.display_order === '' ? null : Number(formData.display_order)
    } else {
      delete payload.display_order
    }

    return payload
  }

  const handleShowAddForm = () => {
    setEditingId(null)
    setFormData({
      ...emptyProjectForm,
      display_order: getNextDisplayOrder()
    })
    setShowAddForm(true)
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return

    const { error } = await supabase
      .from('project_categories')
      .insert([{ name: newCategoryName.trim() }])

    if (!error) {
      setNewCategoryName('')
      setShowCategoryForm(false)
      fetchCategories()
      setFormData(prev => ({ ...prev, category: newCategoryName.trim() }))
    }
  }

  const handleAdd = async () => {
    if (!formData.title || !formData.description) {
      alert('Please fill in required fields')
      return
    }

    const projectData = getProjectPayload()

    const { error } = await supabase
      .from('projects')
      .insert([projectData])

    if (!error) {
      setFormData(emptyProjectForm)
      setShowAddForm(false)
      fetchProjects()
    } else {
      alert('Error adding project: ' + error.message)
    }
  }

  const handleEdit = (project) => {
    setFormData({
      ...project,
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : project.tech_stack,
      display_order: project.display_order ?? '',
      is_live: project.is_live || false,
      is_code_available: project.is_code_available !== false
    })
    setEditingId(project.id)
  }

  const handleUpdate = async () => {
    const projectData = getProjectPayload()

    const { error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', editingId)

    if (!error) {
      setEditingId(null)
      setFormData(emptyProjectForm)
      fetchProjects()
    } else {
      alert('Error updating project: ' + error.message)
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
    setFormData(emptyProjectForm)
  }

  const handleMoveProject = async (index, direction) => {
    if (!orderColumnAvailable) {
      alert('Project ordering needs the display_order database migration first.')
      return
    }

    const targetIndex = index + direction
    const currentProject = projects[index]
    const targetProject = projects[targetIndex]

    if (!currentProject || !targetProject) return

    const currentOrder = getProjectOrder(currentProject, index)
    const targetOrder = getProjectOrder(targetProject, targetIndex)

    const [{ error: currentError }, { error: targetError }] = await Promise.all([
      supabase
        .from('projects')
        .update({ display_order: targetOrder })
        .eq('id', currentProject.id),
      supabase
        .from('projects')
        .update({ display_order: currentOrder })
        .eq('id', targetProject.id)
    ])

    if (currentError || targetError) {
      alert('Error updating project order')
      return
    }

    fetchProjects()
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#17262d]">Projects</h1>
          <p className="text-[#5f665f]">Manage your portfolio projects</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowCategoryForm(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Category
          </Button>
          <Button onClick={handleShowAddForm} className="flex items-center gap-2">
            <Plus size={16} />
            Add New Project
          </Button>
        </div>
      </div>

      {!orderColumnAvailable && (
        <Card className="mb-6 border-[#d9952f] bg-[#f4dfb9]">
          <CardContent className="p-4 text-sm text-[#7a4b16]">
            Project ordering is ready in the app, but the database migration still needs to be applied.
            Run the SQL file at supabase/migrations/20260626000000_add_project_display_order.sql in Supabase.
          </CardContent>
        </Card>
      )}

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
                  placeholder="e.g. Machine Learning, E-commerce"
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

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title *</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#d8cdb9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2b766f]"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <Input
                  name="display_order"
                  type="number"
                  min="1"
                  value={formData.display_order}
                  onChange={handleInputChange}
                  placeholder="1"
                  disabled={!orderColumnAvailable}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe your project in detail..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tech Stack (comma-separated) *</label>
              <Input
                name="tech_stack"
                value={formData.tech_stack}
                onChange={handleInputChange}
                placeholder="Next.js, React, Tailwind CSS, Supabase"
              />
            </div>

            {/* Image Upload Component */}
            <ProjectImageUpload
              onImageUpload={(imageUrl) => setFormData(prev => ({ ...prev, image: imageUrl }))}
              currentImageUrl={formData.image}
            />

            {/* Project Status & URLs */}
            <div className="border border-[#d8cdb9] rounded-lg p-4 bg-[#f7f2e8]">
              <h3 className="font-medium mb-4">Project Status & Links</h3>
              
              {/* Live Site Section */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_live"
                    name="is_live"
                    checked={formData.is_live}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <label htmlFor="is_live" className="text-sm font-medium">
                    Project is live and publicly accessible
                  </label>
                </div>
                
                {formData.is_live && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Live Site URL</label>
                    <Input
                      name="live_url"
                      value={formData.live_url}
                      onChange={handleInputChange}
                      placeholder="https://your-project.com"
                    />
                  </div>
                )}
              </div>

              {/* Code Availability Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_code_available"
                    name="is_code_available"
                    checked={formData.is_code_available}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <label htmlFor="is_code_available" className="text-sm font-medium">
                    Source code is publicly available
                  </label>
                </div>
                
                {formData.is_code_available && (
                  <div>
                    <label className="block text-sm font-medium mb-1">GitHub Repository URL</label>
                    <Input
                      name="github_url"
                      value={formData.github_url}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/repository"
                    />
                  </div>
                )}
              </div>
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
        {projects.map((project, index) => (
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
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <Badge variant="outline">{project.category}</Badge>
                        <Badge variant="secondary">Order {getProjectOrder(project, index)}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#6c675d] mb-2">
                        <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                        <span className={`flex items-center gap-1 ${project.is_live ? 'text-[#2b766f]' : 'text-[#6c675d]'}`}>
                          {project.is_live ? <CircleCheck size={14} /> : <Lock size={14} />}
                          {project.is_live ? 'Live' : 'Private'}
                        </span>
                        <span className={`flex items-center gap-1 ${project.is_code_available ? 'text-[#2b766f]' : 'text-[#6c675d]'}`}>
                          {project.is_code_available ? <FolderOpen size={14} /> : <Lock size={14} />}
                          {project.is_code_available ? 'Open Source' : 'Private Code'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {/* Live Site Link */}
                      {project.is_live && project.live_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} />
                          </a>
                        </Button>
                      )}
                      
                      {/* GitHub Link */}
                      {project.is_code_available && project.github_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github size={14} />
                          </a>
                        </Button>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveProject(index, -1)}
                        disabled={index === 0}
                        aria-label="Move project up"
                      >
                        <ArrowUp size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveProject(index, 1)}
                        disabled={index === projects.length - 1}
                        aria-label="Move project down"
                      >
                        <ArrowDown size={14} />
                      </Button>
                      
                      <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                        <Edit size={14} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-[#5f665f] mb-3 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack && project.tech_stack.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-[#6c675d]">No projects yet. Add your first project!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
