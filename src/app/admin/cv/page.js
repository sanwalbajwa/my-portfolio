"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { FileText, Download, Trash2, Eye, Upload } from 'lucide-react'
import { supabase } from '../../../lib/supabase'
import CVUpload from '../../../components/CVUpload'

export default function AdminCV() {
  const [cvHistory, setCvHistory] = useState([])
  const [currentCV, setCurrentCV] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCVHistory()
  }, [])

  const fetchCVHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('cv_management')
        .select('*')
        .order('upload_date', { ascending: false })

      if (!error && data) {
        setCvHistory(data)
        const activeCV = data.find(cv => cv.is_active)
        if (activeCV) {
          const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(activeCV.filename)
          setCurrentCV({ ...activeCV, publicUrl })
        }
      }
    } catch (error) {
      console.error('Error fetching CV history:', error)
    } finally {
      setLoading(false)
    }
  }

  const setActiveCV = async (cvId) => {
    try {
      // Deactivate all CVs
      await supabase
        .from('cv_management')
        .update({ is_active: false })
        .neq('id', 'none')

      // Activate selected CV
      await supabase
        .from('cv_management')
        .update({ is_active: true })
        .eq('id', cvId)

      fetchCVHistory()
    } catch (error) {
      console.error('Error setting active CV:', error)
      alert('Error setting active CV')
    }
  }

  const deleteCV = async (cv) => {
    if (!confirm('Are you sure you want to delete this CV?')) return

    try {
      // Delete from storage
      await supabase.storage
        .from('documents')
        .remove([cv.filename])

      // Delete from database
      await supabase
        .from('cv_management')
        .delete()
        .eq('id', cv.id)

      fetchCVHistory()
    } catch (error) {
      console.error('Error deleting CV:', error)
      alert('Error deleting CV')
    }
  }

  const downloadCV = async (cv) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(cv.filename)

      if (error) throw error

      const blob = new Blob([data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = cv.original_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading CV:', error)
      alert('Error downloading CV')
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CV Management</h1>
          <p className="text-gray-600">Manage your curriculum vitae versions</p>
        </div>
      </div>

      {/* Upload New CV */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload size={20} />
            Upload New CV
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CVUpload
            onCVUpload={() => {
              setCurrentCV(null)
              fetchCVHistory()
            }}
            currentCV={null}
          />
        </CardContent>
      </Card>

      {/* Current Active CV */}
      {currentCV && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} />
              Currently Active CV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <FileText className="text-green-600" size={24} />
                <div>
                  <p className="font-medium">{currentCV.original_name}</p>
                  <p className="text-sm text-gray-600">
                    This CV will be downloaded when users click &quot;Download CV&quot; button
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(currentCV.publicUrl, '_blank')}
                >
                  <Eye size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadCV(currentCV)}
                >
                  <Download size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CV History */}
      <Card>
        <CardHeader>
          <CardTitle>CV History</CardTitle>
        </CardHeader>
        <CardContent>
          {cvHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No CVs uploaded yet</p>
          ) : (
            <div className="space-y-4">
              {cvHistory.map((cv) => (
                <div
                  key={cv.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-red-600" size={20} />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{cv.original_name}</p>
                        {cv.is_active && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {(cv.file_size / 1024 / 1024).toFixed(2)} MB • 
                        Uploaded {new Date(cv.upload_date).toLocaleDateString()}
                      </p>
                      {cv.description && (
                        <p className="text-xs text-gray-400">{cv.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {!cv.is_active && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveCV(cv.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Set Active
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const { data: { publicUrl } } = supabase.storage
                          .from('documents')
                          .getPublicUrl(cv.filename)
                        window.open(publicUrl, '_blank')
                      }}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadCV(cv)}
                    >
                      <Download size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCV(cv)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}