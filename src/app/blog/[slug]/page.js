import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
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
    description: blog.meta_description || blog.excerpt || blog.content.substring(0, 160) + '...',
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
              <span>{blog.read_time || 5} min read</span>
            </div>
          </div>
        </header>

        {/* Article Content - Render HTML directly */}
        <div 
          className="prose prose-lg max-w-none 
            prose-headings:text-gray-900 
            prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-4
            prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-gray-800
            prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-200
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:space-y-2
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:space-y-2
            prose-li:text-gray-700
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:my-6 prose-blockquote:italic prose-blockquote:text-gray-600
            prose-img:rounded-lg prose-img:shadow-md prose-img:my-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

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