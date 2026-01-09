import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import '../../../app/blog-content.css'

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  // Await params in Next.js 15+
  const { slug } = await params
  
  const { data: blog } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!blog) {
    return {
      title: 'Blog Post Not Found'
    }
  }

  // Strip HTML tags for meta description
  const stripHtml = (html) => {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  }

  const description = blog.meta_description || blog.excerpt || stripHtml(blog.content).substring(0, 160)
  const keywords = Array.isArray(blog.meta_keywords) ? blog.meta_keywords.join(', ') : blog.meta_keywords || ''

  return {
    title: `${blog.title}`,
    description: description,
    keywords: keywords,
    authors: [{ name: blog.author }],
    creator: blog.author,
    publisher: 'Sanwal Bajwa',
    category: blog.category,
    
    // Open Graph for social media
    openGraph: {
      title: blog.title,
      description: description,
      url: `https://sanwalbajwa.com/blog/${blog.slug}`,
      siteName: 'Sanwal Bajwa',
      images: blog.featured_image ? [
        {
          url: blog.featured_image,
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ] : [],
      locale: 'en_US',
      type: 'article',
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at,
      authors: [blog.author || 'Sanwal Bajwa'],
      tags: Array.isArray(blog.tags) ? blog.tags : [],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: description,
      creator: '@yourtwitterhandle',
      images: blog.featured_image ? [blog.featured_image] : [],
    },

    // Additional metadata
    alternates: {
      canonical: `https://sanwalbajwa.com/blog/${blog.slug}`,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function BlogPost({ params }) {
  // Await params in Next.js 15+
  const { slug } = await params
  
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
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

  // JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.meta_description || blog.excerpt,
    image: blog.featured_image || 'https://www.sanwalbajwa.com/default-blog-image.jpg',
    datePublished: blog.created_at,
    dateModified: blog.updated_at || blog.created_at,
    author: {
      '@type': 'Person',
      name: blog.author || 'Sanwal Bajwa',
      url: 'https://www.sanwalbajwa.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Sanwal Bajwa',
      url: 'https://www.sanwalbajwa.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.sanwalbajwa.com/blog/${blog.slug}`,
    },
    keywords: Array.isArray(blog.meta_keywords) ? blog.meta_keywords.join(', ') : blog.meta_keywords,
    articleSection: blog.category,
    wordCount: blog.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    timeRequired: `PT${blog.read_time || 5}M`,
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen py-12 bg-white">
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
            {/* Category Badge */}
            {blog.category && (
              <div className="mb-4">
                <Badge variant="secondary" className="text-sm">
                  {blog.category}
                </Badge>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Featured Image */}
            {blog.featured_image && (
              <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
                <Image
                  src={blog.featured_image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 border-b border-gray-200 pb-6">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{blog.author || 'Sanwal Bajwa'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={blog.created_at}>
                  {formatDate(blog.created_at)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{blog.read_time || 5} min read</span>
              </div>
            </div>
          </header>

          {/* Article Content - Using blog-content CSS class */}
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

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
      </article>
    </>
  )
}