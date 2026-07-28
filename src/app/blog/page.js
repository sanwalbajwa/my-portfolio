import { supabase } from '../../lib/supabase'
import BlogFilterList from '../../components/BlogFilterList'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Blog | Web Development & Tech Insights',
  description: 'Project breakdowns and practical articles about software engineering, full-stack development, WordPress, WooCommerce, architecture, and performance.',
  alternates: {
    canonical: 'https://sanwalbajwa.com/blog',
  },
  openGraph: {
    title: 'Engineering Notes & Case Studies | Sanwal Bajwa',
    description: 'Project breakdowns and practical articles about software engineering, full-stack development, WordPress, WooCommerce, architecture, and performance.',
    url: 'https://sanwalbajwa.com/blog',
  },
}

export default async function Blog() {
  // Fetch blog posts from Supabase
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blogs:', error)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="px-5 sm:px-8 md:px-10 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Engineering Notes & Case Studies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Project breakdowns and practical articles about software engineering, full-stack development, WordPress, WooCommerce, architecture, and performance.
          </p>
        </div>

        {/* Blog Posts */}
        {blogs && blogs.length > 0 ? (
          <BlogFilterList blogs={blogs} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
            <p className="text-gray-400 mt-2">Blog posts will appear here once published.</p>
          </div>
        )}
      </div>
    </div>
  )
}
