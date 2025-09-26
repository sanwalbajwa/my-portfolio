"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ExternalLink, Github, Eye, Lock } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { supabase } from '../lib/supabase'
import ProjectDetailDialog from './ProjectDetailDialog'

export default function FeaturedWork() {
  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjectsAndCategories()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, activeCategory])

  const fetchProjectsAndCategories = async () => {
    try {
      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6) // Limit to 6 featured projects

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('project_categories')
        .select('*')
        .order('name')

      if (!projectsError && projectsData) {
        setProjects(projectsData)
      }

      if (!categoriesError && categoriesData) {
        setCategories(categoriesData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProjects = () => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter(project => project.category === activeCategory)
      setFilteredProjects(filtered)
    }
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setShowDialog(true)
  }

  // Get unique categories that have projects
  const categoriesWithProjects = categories.filter(category => 
    projects.some(project => project.category === category.name)
  )

  const tabVariants = {
    inactive: { 
      backgroundColor: "transparent", 
      color: "#6B7280" 
    },
    active: { 
      backgroundColor: "#3B82F6", 
      color: "#FFFFFF" 
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-gray-600">
            Explore my projects across different technologies
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <motion.button
            variants={tabVariants}
            animate={activeCategory === 'All' ? 'active' : 'inactive'}
            onClick={() => setActiveCategory('All')}
            className="px-6 py-3 rounded-full border-2 border-blue-600 font-medium transition-all duration-200 hover:border-blue-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All ({projects.length})
          </motion.button>
          
          {categoriesWithProjects.map((category) => {
            const projectCount = projects.filter(p => p.category === category.name).length
            return (
              <motion.button
                key={category.id}
                variants={tabVariants}
                animate={activeCategory === category.name ? 'active' : 'inactive'}
                onClick={() => setActiveCategory(category.name)}
                className="px-6 py-3 rounded-full border-2 border-blue-600 font-medium transition-all duration-200 hover:border-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name} ({projectCount})
              </motion.button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                {/* Project Image */}
                {project.image && (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack && project.tech_stack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech_stack && project.tech_stack.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tech_stack.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {/* Live Site Button */}
                    {project.is_live && project.live_url ? (
                      <Button size="sm" variant="outline" asChild>
                        <a 
                          href={project.live_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <ExternalLink size={12} />
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        <Lock size={12} />
                      </Button>
                    )}

                    {/* GitHub Button */}
                    {project.is_code_available && project.github_url ? (
                      <Button size="sm" variant="outline" asChild>
                        <a 
                          href={project.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <Github size={12} />
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        <Lock size={12} />
                      </Button>
                    )}

                    {/* View More Button */}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleProjectClick(project)}
                      className="flex items-center justify-center"
                    >
                      <Eye size={12} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No projects found in {activeCategory === 'All' ? 'any category' : activeCategory}.
            </p>
          </motion.div>
        )}

        {/* View All Projects Button */}
        {projects.length > 0 && (
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/portfolio">
                View All Projects ({projects.length})
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Project Detail Dialog */}
      <ProjectDetailDialog 
        project={selectedProject}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </section>
  )
}