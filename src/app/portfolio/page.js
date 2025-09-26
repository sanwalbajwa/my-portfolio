import { supabase } from '../../lib/supabase'
import ProjectCard from '../../components/ProjectCard'

export default async function Portfolio() {
  // Fetch projects from Supabase
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of projects I&apos;ve worked on, showcasing different technologies 
            and design approaches.
          </p>
        </div>

        {/* Projects Grid */}
        {projects && projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found.</p>
            <p className="text-gray-400 mt-2">Projects will appear here once added to the database.</p>
          </div>
        )}
      </div>
    </div>
  )
}