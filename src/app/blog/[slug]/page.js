import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'

// Generate static params for all blog posts
export async function generateStaticParams() {
  const { data: blogs } = await supabase
    .from('blogs')
    .select('slug')
  
  return blogs || []
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!blog) {
    return {
      title: 'Blog Post Not Found'
    }
  }

  return {
    title: `${blog.title} | Your Name`,
    description: blog.content.substring(0, 160) + '...',
  }
}

export default async function BlogPost({ params }) {
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !blog) {
    notFound()
  }

  // Calculate reading time
  const getReadingTime = (content) => {
    const words = content.split(' ').length
    const readingTime = Math.ceil(words / 200)
    return readingTime
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-500 border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(blog.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{getReadingTime(blog.content)} min read</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown
            className="leading-relaxed"
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
              p: ({ children }) => <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>,
              code: ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm">{children}</code>,
              pre: ({ children }) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">{children}</pre>,
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </article>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/blog">
                Read More Articles
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}