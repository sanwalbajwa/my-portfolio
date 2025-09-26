import { supabase } from '../../lib/supabase'
import BlogCard from '../../components/BlogCard'

export default async function Blog() {
  // Fetch blog posts from Supabase
  const { data: blogs, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blogs:', error)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thoughts on web development, technology trends, and lessons learned 
            from building digital experiences.
          </p>
        </div>

        {/* Blog Posts */}
        {blogs && blogs.length > 0 ? (
          <div className="grid gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
            <p className="text-gray-400 mt-2">Blog posts will appear here once added to the database.</p>
          </div>
        )}
      </div>
    </div>
  )
}