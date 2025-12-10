"use client"
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Image from 'next/image'

export default function BlogImageUpload({ onImageUpload, currentImageUrl = null }) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

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
      const fileName = `blog-featured-${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('certificates') // You can create a dedicated 'blog-images' bucket if preferred
        .upload(fileName, file)

      if (error) throw error

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
      event.target.value = '' // Reset file input
    }
  }

  const addImageFromUrl = () => {
    if (imageUrl) {
      setPreviewUrl(imageUrl)
      onImageUpload(imageUrl)
      setImageUrl('')
      setShowUrlInput(false)
    }
  }

  const removeImage = () => {
    setPreviewUrl(null)
    onImageUpload('')
    setShowUrlInput(false)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Featured Image
      </label>
      
      {previewUrl ? (
        <div className="relative">
          <div className="relative w-full h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
            <Image
              src={previewUrl}
              alt="Featured image preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="bg-white/80 backdrop-blur-sm"
            >
              <LinkIcon size={16} />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeImage}
              className="bg-white/80 backdrop-blur-sm"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Upload from Computer */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <div className="mb-4">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="blog-image-upload" className="cursor-pointer">
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={uploading}
                  asChild
                >
                  <span className="flex items-center gap-2">
                    <Upload size={16} />
                    {uploading ? 'Uploading...' : 'Upload Featured Image'}
                  </span>
                </Button>
              </label>
              <Input
                id="blog-image-upload"
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

          {/* Toggle URL Input */}
          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-blue-600"
            >
              <LinkIcon size={14} className="mr-2" />
              Or paste image URL
            </Button>
          </div>
        </div>
      )}

      {/* URL Input (toggled) */}
      {showUrlInput && !previewUrl && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <div className="flex gap-2">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={addImageFromUrl}
              disabled={!imageUrl}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}