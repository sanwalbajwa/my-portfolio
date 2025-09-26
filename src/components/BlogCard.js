"use client"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BlogCard({ blog }) {
  // Calculate reading time (rough estimate: 200 words per minute)
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-3 hover:text-blue-600 transition-colors">
                <Link href={`/blog/${blog.slug}`}>
                  {blog.title}
                </Link>
              </CardTitle>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{getReadingTime(blog.content)} min read</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <p className="text-gray-600 line-clamp-3 leading-relaxed">
              {blog.content.substring(0, 200)}...
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="secondary">
              Article
            </Badge>
            
            <Button variant="ghost" asChild className="group">
              <Link href={`/blog/${blog.slug}`} className="flex items-center gap-2">
                Read More 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}