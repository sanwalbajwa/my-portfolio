"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Badge } from '../../../components/ui/badge'
import { Plus, Edit, Trash2, Save, X, Award } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import Image from 'next/image'

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    image: ''
  })

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setCertificates(data || [])
    setLoading(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAdd = async () => {
    if (!formData.title || !formData.issuer) return

    const { error } = await supabase
      .from('certificates')
      .insert([formData])

    if (!error) {
      setFormData({ title: '', issuer: '', image: '' })
      setShowAddForm(false)
      fetchCertificates()
    }
  }

  const handleEdit = (certificate) => {
    setFormData(certificate)
    setEditingId(certificate.id)
  }

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('certificates')
      .update(formData)
      .eq('id', editingId)

    if (!error) {
      setEditingId(null)
      setFormData({ title: '', issuer: '', image: '' })
      fetchCertificates()
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return

    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id)

    if (!error) fetchCertificates()
  }

  const handleCancel = () => {
    setEditingId(null)
    setShowAddForm(false)
    setFormData({ title: '', issuer: '', image: '' })
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-600">Manage your professional certificates</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Add New Certificate
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Certificate' : 'Add New Certificate'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Certificate Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. React Developer Certification"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Issuing Organization</label>
                <Input
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleInputChange}
                  placeholder="e.g. Meta, Google, AWS"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Certificate Image URL</label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://images.unsplash.com/photo-..."
              />
              {formData.image && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={formData.image}
                      alt="Certificate preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={editingId ? handleUpdate : handleAdd}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                {editingId ? 'Update' : 'Create'} Certificate
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X size={16} className="mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {certificates.map((certificate) => (
          <Card key={certificate.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {/* Certificate Image */}
              {certificate.image && (
                <div className="relative h-40 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={certificate.image}
                    alt={certificate.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              {/* Certificate Info */}
              <div className="p-4">
                <div className="flex items-start gap-2 mb-3">
                  <Award className="text-yellow-600 mt-1 flex-shrink-0" size={18} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                      {certificate.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(certificate.created_at).getFullYear()}
                    </p>
                  </div>
                </div>
                
                <Badge variant="secondary" className="w-full justify-center text-xs mb-3">
                  {certificate.issuer}
                </Badge>
                
                {/* Action Buttons */}
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(certificate)}
                  >
                    <Edit size={12} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDelete(certificate.id)}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table View for easier management */}
      {certificates.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>All Certificates (Table View)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Issuer</th>
                    <th className="text-left p-2">Date Added</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((certificate) => (
                    <tr key={certificate.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{certificate.title}</td>
                      <td className="p-2">{certificate.issuer}</td>
                      <td className="p-2 text-gray-500">
                        {new Date(certificate.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(certificate)}
                          >
                            <Edit size={12} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(certificate.id)}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {certificates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Award className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-500">No certificates yet. Add your first certificate!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}