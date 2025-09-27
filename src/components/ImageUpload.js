"use client"
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Image from 'next/image'

export default function ImageUpload({ onImageUpload, currentImageUrl = null }) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl)

  const uploadImage = async (event) => {
    try {
      setUploading(true)
      
      const file = event.target.files[0]
      if (!file) return

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `certificate-${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('certificates')
        .upload(fileName, file)

      if (error) {
        throw error
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('certificates')
        .getPublicUrl(fileName)

      setPreviewUrl(publicUrl)
      onImageUpload(publicUrl)
      
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setPreviewUrl(null)
    onImageUpload(null)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Certificate Image
      </label>
      
      {previewUrl ? (
        <div className="relative">
          <div className="relative w-full h-48 border-2 border-gray-300 rounded-lg overflow-hidden">
            <Image
              src={previewUrl}
              alt="Certificate preview"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <div className="mb-4">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          
          <div className="mb-4">
            <label htmlFor="certificate-upload" className="cursor-pointer">
              <Button 
                type="button" 
                variant="outline" 
                disabled={uploading}
                asChild
              >
                <span className="flex items-center gap-2">
                  <Upload size={16} />
                  {uploading ? 'Uploading...' : 'Upload Certificate Image'}
                </span>
              </Button>
            </label>
            <Input
              id="certificate-upload"
              type="file"
              accept="image/*"
              onChange={uploadImage}
              disabled={uploading}
              className="hidden"
            />
          </div>
          
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      )}
    </div>
  )
}