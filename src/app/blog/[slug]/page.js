import { supabase } from '../../../lib/supabase'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import BlogTableOfContents from '../../../components/BlogTableOfContents'
import '../../../app/blog-content.css'

const stripHtml = (html) => {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

const slugifyHeading = (text) => {
  return text
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const addHeadingAnchors = (html) => {
  const headings = []
  const usedIds = new Map()

  const content = html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attributes, innerHtml) => {
    const text = stripHtml(innerHtml)

    if (!text) {
      return match
    }

    const baseId = slugifyHeading(text) || `section-${headings.length + 1}`
    const count = usedIds.get(baseId) || 0
    usedIds.set(baseId, count + 1)
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`

    if (Number(level) === 2 && headings.length < 10) {
      headings.push({
        id,
        text,
        level: Number(level)
      })
    }

    const cleanAttributes = attributes.replace(/\s*id=(["']).*?\1/i, '')
    return `<h${level}${cleanAttributes} id="${id}">${innerHtml}</h${level}>`
  })

  return { content, headings }
}

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
    title: {
      absolute: blog.title,
    },
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

  const { content: articleContent, headings } = addHeadingAnchors(blog.content)

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
    wordCount: stripHtml(blog.content).split(/\s+/).length,
    timeRequired: `PT${blog.read_time || 5}M`,
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-[#f7f2e8]">
        <header className="relative overflow-hidden border-y border-[#d8cdb9] bg-[#efe6d7] px-5 py-12 sm:px-8 md:px-10 md:py-16 lg:px-12">
          <div className="absolute right-0 top-0 hidden h-full w-28 bg-[#d9952f]/10 md:block lg:w-44" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mb-8">
              <Button
                variant="ghost"
                asChild
                className="h-auto px-0 text-[#5f665f] hover:bg-transparent hover:text-[#2b766f]"
              >
                <Link href="/blog" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Back to Blog
                </Link>
              </Button>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] lg:items-end">
              <div>
                {blog.category && (
                  <div className="mb-5 flex items-center gap-4">
                    <span className="h-px w-14 bg-[#d9952f]" />
                    <Badge className="rounded-full border border-[#d8cdb9] bg-[#f7f2e8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#2b766f] hover:bg-[#f7f2e8]">
                      {blog.category}
                    </Badge>
                  </div>
                )}

                <h1 className="font-display text-4xl font-bold leading-[1.02] text-[#17262d] sm:text-5xl lg:text-6xl">
                  {blog.title}
                </h1>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#d8cdb9] pt-6 text-sm text-[#5f665f]">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-[#2b766f]" />
                    <span>{blog.author || 'Sanwal Bajwa'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#2b766f]" />
                    <time dateTime={blog.created_at}>
                      {formatDate(blog.created_at)}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#2b766f]" />
                    <span>{blog.read_time || 5} min read</span>
                  </div>
                </div>
              </div>

              {blog.featured_image && (
                <div className="relative">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-xl border border-[#2b766f]/25 sm:h-32 sm:w-32" />
                  <div className="relative overflow-hidden rounded-xl border border-[#d8cdb9] bg-white p-2 shadow-xl ring-1 ring-[#2b766f]/10">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                      <Image
                        src={blog.featured_image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="px-5 py-12 sm:px-8 md:px-10 md:py-16 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:items-start xl:grid-cols-[210px_minmax(0,1fr)]">
            <BlogTableOfContents headings={headings} />

            <div className="min-w-0">
              {/* Article Content - Using blog-content CSS class */}
              <div
                className="blog-content mx-auto max-w-4xl"
                dangerouslySetInnerHTML={{ __html: articleContent }}
              />

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mx-auto mt-12 max-w-4xl border-t border-gray-200 pt-8">
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
              <footer className="mx-auto mt-12 max-w-4xl border-t border-gray-200 pt-8">
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
        </div>
      </article>
    </>
  )
}
