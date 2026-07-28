"use client"

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from './ui/badge'

const ALL_ARTICLES = 'All Articles'

export default function BlogFilterList({ blogs }) {
  const [activeCategory, setActiveCategory] = useState(ALL_ARTICLES)

  const categories = useMemo(() => {
    const categoryCounts = blogs.reduce((counts, blog) => {
      const category = blog.category || 'Article'
      counts.set(category, (counts.get(category) || 0) + 1)
      return counts
    }, new Map())

    return [
      { name: ALL_ARTICLES, count: blogs.length },
      ...Array.from(categoryCounts, ([name, count]) => ({ name, count }))
    ]
  }, [blogs])

  const filteredBlogs = useMemo(() => {
    if (activeCategory === ALL_ARTICLES) {
      return blogs
    }

    return blogs.filter((blog) => (blog.category || 'Article') === activeCategory)
  }, [activeCategory, blogs])

  const featuredBlog = filteredBlogs[0]
  const archiveBlogs = filteredBlogs.slice(1)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const stripHtmlTags = (html) => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  }

  const getExcerpt = (blog, length = 180) => {
    const text = blog.excerpt || stripHtmlTags(blog.content)
    if (!text || text.length <= length) return text
    return `${text.substring(0, length).trim()}...`
  }

  const getReadingTime = (blog) => {
    if (blog.read_time) return blog.read_time
    const words = stripHtmlTags(blog.content).split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(words / 200))
  }

  return (
    <div>
      <div className="mb-10 border-y border-[#d8cdb9] py-5">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-[#d9952f]" />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2b766f]">
            Browse by topic
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category.name

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setActiveCategory(category.name)}
                className={`group inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? 'border-[#2b766f] bg-[#2b766f] text-white shadow-sm'
                    : 'border-[#d8cdb9] bg-white/70 text-[#3e4948] hover:border-[#2b766f] hover:text-[#2b766f]'
                }`}
              >
                <span>{category.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive ? 'bg-white/15 text-white' : 'bg-[#efe6d7] text-[#6c675d] group-hover:text-[#2b766f]'
                }`}>
                  {category.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {featuredBlog ? (
        <motion.div layout className="space-y-12">
          <motion.article
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden rounded-lg border border-[#d8cdb9] bg-white shadow-sm"
          >
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <Link
                href={`/blog/${featuredBlog.slug}`}
                className="relative block min-h-[260px] overflow-hidden bg-[#efe6d7] lg:min-h-full"
              >
                {featuredBlog.featured_image ? (
                  <Image
                    src={featuredBlog.featured_image}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full min-h-[260px] items-center justify-center px-8 text-center">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#2b766f]">
                      Engineering Note
                    </span>
                  </div>
                )}
              </Link>

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <Badge variant="secondary">
                    {featuredBlog.category || 'Article'}
                  </Badge>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#6c675d]">
                    Featured
                  </span>
                </div>

                <h2 className="mb-4 text-3xl font-bold leading-tight text-[#17262d] md:text-4xl">
                  <Link href={`/blog/${featuredBlog.slug}`} className="transition-colors hover:text-[#2b766f]">
                    {featuredBlog.title}
                  </Link>
                </h2>

                <p className="mb-7 text-base leading-7 text-[#5f665f] md:text-lg">
                  {getExcerpt(featuredBlog, 240)}
                </p>

                <div className="mb-8 flex flex-wrap gap-5 text-sm text-[#6c675d]">
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={16} />
                    {formatDate(featuredBlog.created_at)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock size={16} />
                    {getReadingTime(featuredBlog)} min read
                  </span>
                </div>

                <Link
                  href={`/blog/${featuredBlog.slug}`}
                  className="group inline-flex items-center gap-2 rounded-md bg-[#2b766f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#17313b]"
                >
                  Read Featured Article
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.article>

          <div>
            <div className="mb-6 flex flex-col gap-2 border-b border-[#d8cdb9] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#2b766f]">
                  Archive
                </p>
                <h3 className="mt-2 text-2xl font-bold text-[#17262d]">
                  More engineering notes
                </h3>
              </div>
              <p className="text-sm text-[#6c675d]">
                {archiveBlogs.length} article{archiveBlogs.length === 1 ? '' : 's'}
              </p>
            </div>

            {archiveBlogs.length > 0 ? (
              <motion.div layout className="divide-y divide-[#d8cdb9] rounded-lg border border-[#d8cdb9] bg-white/70">
                {archiveBlogs.map((blog) => (
                  <motion.article
                    layout
                    key={blog.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="group grid gap-4 p-5 transition-colors hover:bg-[#efe6d7]/60 md:grid-cols-[1fr_auto] md:items-center md:p-6"
                    >
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-[#6c675d]">
                          <Badge variant="secondary">
                            {blog.category || 'Article'}
                          </Badge>
                          <span>{formatDate(blog.created_at)}</span>
                          <span>{getReadingTime(blog)} min read</span>
                        </div>
                        <h4 className="text-xl font-bold text-[#17262d] transition-colors group-hover:text-[#2b766f]">
                          {blog.title}
                        </h4>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5f665f]">
                          {getExcerpt(blog, 160)}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b766f]">
                        Read Article
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <div className="rounded-lg border border-[#d8cdb9] bg-white/70 py-10 text-center">
                <p className="text-[#5f665f]">
                  No additional articles in this category yet.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="rounded-lg border border-[#d8cdb9] bg-white/70 py-12 text-center">
          <p className="text-lg text-[#5f665f]">No articles found in this category.</p>
        </div>
      )}
    </div>
  )
}
