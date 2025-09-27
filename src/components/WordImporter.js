"use client"
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import mammoth from 'mammoth'

export default function WordImporter({ onImport }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.name.endsWith('.docx')) {
      setResult({ type: 'error', message: 'Please upload a .docx file' })
      return
    }

    setIsProcessing(true)
    setResult(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      
      const result = await mammoth.convertToHtml({ arrayBuffer })
      
      // Extract title from the first heading or paragraph
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = result.value
      
      let title = ''
      const firstHeading = tempDiv.querySelector('h1, h2, h3')
      if (firstHeading) {
        title = firstHeading.textContent.trim()
        firstHeading.remove() // Remove title from content
      } else {
        const firstParagraph = tempDiv.querySelector('p')
        if (firstParagraph && firstParagraph.textContent.trim()) {
          title = firstParagraph.textContent.trim().substring(0, 100)
        }
      }

      // Clean up the HTML content
      let content = tempDiv.innerHTML
      
      // Convert Word styles to proper HTML
      content = content
        .replace(/<p><strong>(.*?)<\/strong><\/p>/g, '<h3>$1</h3>')
        .replace(/<p style="font-weight: bold">(.*?)<\/p>/g, '<h3>$1</h3>')
        .replace(/style="[^"]*"/g, '') // Remove inline styles
        .replace(/<span[^>]*>/g, '') // Remove span tags
        .replace(/<\/span>/g, '')
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()

      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-')

      const importedData = {
        title: title || 'Imported Document',
        slug: slug || 'imported-document',
        content: content,
        excerpt: content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
      }

      onImport(importedData)
      setResult({ 
        type: 'success', 
        message: `Successfully imported: "${title}"`,
        warnings: result.messages.length > 0 ? result.messages : null
      })
      
      // Clear file input
      event.target.value = ''
      
    } catch (error) {
      console.error('Import error:', error)
      setResult({ 
        type: 'error', 
        message: 'Failed to import document. Please check the file format.' 
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
      <div className="mb-4">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Import from Word Document
      </h3>
      
      <p className="text-sm text-gray-500 mb-4">
        Upload a .docx file to automatically extract title, content, and formatting
      </p>

      <div className="mb-4">
        <Input
          type="file"
          accept=".docx"
          onChange={handleFileUpload}
          disabled={isProcessing}
          className="hidden"
          id="word-upload"
        />
        <Button 
          asChild 
          variant="outline" 
          disabled={isProcessing}
          className="cursor-pointer"
        >
          <label htmlFor="word-upload" className="flex items-center gap-2">
            <Upload size={16} />
            {isProcessing ? 'Processing...' : 'Choose Word Document'}
          </label>
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className={`p-3 rounded-lg ${
          result.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center gap-2 justify-center">
            {result.type === 'success' ? (
              <CheckCircle className="text-green-600" size={16} />
            ) : (
              <AlertCircle className="text-red-600" size={16} />
            )}
            <span className={`text-sm font-medium ${
              result.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {result.message}
            </span>
          </div>
          
          {result.warnings && (
            <div className="mt-2 text-xs text-orange-600">
              Note: Some formatting may have been simplified during import
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>Supported: .docx files</p>
        <p>Preserves: Headings, paragraphs, lists, bold, italic text</p>
      </div>
    </div>
  )
}