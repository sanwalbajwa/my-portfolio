"use client"
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Upload, X, FileText, Download, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function CVUpload({ onCVUpload, currentCV = null }) {
  const [uploading, setUploading] = useState(false)

  const uploadCV = async (event) => {
    try {
      setUploading(true)
      
      const file = event.target.files[0]
      if (!file) return

      // Validate file type
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file')
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }

      // Generate unique filename
      const timestamp = Date.now()
      const fileName = `cv-${timestamp}.pdf`

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      // Get file size
      const fileSize = file.size

      // Save CV metadata to database
      const { data: cvData, error: dbError } = await supabase
        .from('cv_management')
        .insert([{
          filename: fileName,
          original_name: file.name,
          file_size: fileSize,
          description: `CV uploaded on ${new Date().toLocaleDateString()}`
        }])
        .select()
        .single()

      if (dbError) throw dbError

      // Deactivate previous CVs
      await supabase
        .from('cv_management')
        .update({ is_active: false })
        .neq('id', cvData.id)

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName)

      onCVUpload({ ...cvData, publicUrl })
      
    } catch (error) {
      console.error('Error uploading CV:', error)
      alert('Error uploading CV: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const removeCV = async () => {
    if (!currentCV) return

    try {
      // Delete from storage
      await supabase.storage
        .from('documents')
        .remove([currentCV.filename])

      // Delete from database
      await supabase
        .from('cv_management')
        .delete()
        .eq('id', currentCV.id)

      onCVUpload(null)
    } catch (error) {
      console.error('Error removing CV:', error)
      alert('Error removing CV: ' + error.message)
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        CV Management
      </label>
      
      {currentCV ? (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="text-red-600" size={24} />
              <div>
                <p className="font-medium">{currentCV.original_name}</p>
                <p className="text-sm text-gray-500">
                  {(currentCV.file_size / 1024 / 1024).toFixed(2)} MB • 
                  Uploaded {new Date(currentCV.upload_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(currentCV.publicUrl, '_blank')}
              >
                <Download size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={removeCV}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <div className="mb-4">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="cv-upload" className="cursor-pointer">
              <Button 
                type="button" 
                variant="outline" 
                disabled={uploading}
                asChild
              >
                <span className="flex items-center gap-2">
                  <Upload size={16} />
                  {uploading ? 'Uploading...' : 'Upload CV (PDF)'}
                </span>
              </Button>
            </label>
            <Input
              id="cv-upload"
              type="file"
              accept=".pdf"
              onChange={uploadCV}
              disabled={uploading}
              className="hidden"
            />
          </div>
          
          <p className="text-xs text-gray-500">
            PDF files only, max 10MB
          </p>
        </div>
      )}
    </div>
  )
}