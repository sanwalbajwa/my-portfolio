"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState, useEffect } from 'react'
import { 
  Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Undo, Redo, Link as LinkIcon, 
  Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Underline as UnderlineIcon, Upload, X
} from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function RichTextEditor({ content, onChange }) {
  const [imageUrl, setImageUrl] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      Typography,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-4 border rounded-lg',
      },
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!isMounted || !editor) {
    return (
      <div className="border rounded-lg p-4 min-h-[400px] bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    )
  }

  // Handle image file upload
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setUploadingImage(true)

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `blog-${Date.now()}.${fileExt}`

      const { data, error } = await supabase.storage
        .from('certificates') // or create a 'blog-images' bucket
        .upload(fileName, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('certificates')
        .getPublicUrl(fileName)

      editor.chain().focus().setImage({ src: publicUrl }).run()
      setShowImageDialog(false)
      
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image: ' + error.message)
    } finally {
      setUploadingImage(false)
      event.target.value = '' // Reset file input
    }
  }

  const addImageFromUrl = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
      setShowImageDialog(false)
    }
  }

  const addLink = () => {
    if (linkUrl) {
      if (editor.state.selection.empty) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkUrl}</a>`).run()
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run()
      }
      setLinkUrl('')
      setShowLinkDialog(false)
    }
  }

  const MenuButton = ({ onClick, isActive, disabled, children, title }) => (
    <Button
      type="button"
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-8 p-0"
      title={title}
    >
      {children}
    </Button>
  )

  return (
    <div className="border rounded-lg overflow-hidden relative">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold"
        >
          <Bold size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic"
        >
          <Italic size={16} />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Inline Code"
        >
          <Code size={16} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Headings */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Text Alignment */}
        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          title="Align Right"
        >
          <AlignRight size={16} />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          title="Justify"
        >
          <AlignJustify size={16} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Lists */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote size={16} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Media */}
        <MenuButton 
          onClick={() => setShowImageDialog(true)}
          title="Insert Image"
        >
          <ImageIcon size={16} />
        </MenuButton>
        
        <MenuButton 
          onClick={() => setShowLinkDialog(true)}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Undo/Redo */}
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo size={16} />
        </MenuButton>
        
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo size={16} />
        </MenuButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Image Dialog - WordPress Style */}
      {showImageDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Insert Image</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowImageDialog(false)}
                className="h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>
            
            {/* Upload from Computer */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Upload from Computer</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-3">
                  {uploadingImage ? 'Uploading...' : 'Click to upload image'}
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                  id="blog-image-upload"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={uploadingImage}
                  asChild
                >
                  <label htmlFor="blog-image-upload" className="cursor-pointer flex items-center gap-2">
                    <Upload size={16} />
                    {uploadingImage ? 'Uploading...' : 'Choose Image'}
                  </label>
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Insert from URL */}
            <div>
              <label className="block text-sm font-medium mb-2">Insert from URL</label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mb-4"
              />
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  onClick={addImageFromUrl}
                  disabled={!imageUrl}
                  className="flex-1"
                >
                  Insert Image
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowImageDialog(false)
                    setImageUrl('')
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Insert Link</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowLinkDialog(false)}
                className="h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {editor.state.selection.empty 
                ? 'Enter the URL to insert as a link'
                : 'Enter the URL for the selected text'
              }
            </p>
            <Input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="mb-4"
            />
            <div className="flex gap-2">
              <Button 
                type="button" 
                onClick={addLink}
                disabled={!linkUrl}
                className="flex-1"
              >
                Add Link
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowLinkDialog(false)
                  setLinkUrl('')
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}