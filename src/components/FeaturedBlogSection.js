"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { supabase } from '../lib/supabase'

export default function FeaturedBlogSection() {
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedBlogs()
  }, [])

  const fetchFeaturedBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'published')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(3) // Show only 3 featured blogs

      if (!error && data) {
        setFeaturedBlogs(data)
      }
    } catch (error) {
      console.error('Error fetching featured blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate reading time
  const getReadingTime = (content) => {
    const words = content.replace(/<[^>]*>/g, '').split(' ').length
    return Math.ceil(words / 200)
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600">Loading featured content...</p>
          </div>
        </div>
      </section>
    )
  }

  // Don't render section if no featured blogs
  if (featuredBlogs.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked articles covering web development insights, tutorials, 
              and industry best practices.
            </p>
          </motion.div>
        </div>

        {/* Featured Blogs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group overflow-hidden">
                {/* Featured Image */}
                {blog.featured_image && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={blog.featured_image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">
                        Featured
                      </Badge>
                    </div>
                  </div>
                )}

                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{blog.category}</Badge>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(blog.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{blog.read_time || getReadingTime(blog.content)} min</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                    {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                  </p>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {blog.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{blog.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <Button variant="ghost" asChild className="group/btn p-0 h-auto font-medium">
                    <Link href={`/blog/${blog.slug}`} className="flex items-center gap-2">
                      Read Article
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="group">
              <Link href="/blog" className="flex items-center gap-2">
                <BookOpen size={20} />
                View All Articles
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}