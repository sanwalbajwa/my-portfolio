"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function FeaturedWork() {
  // This will later be replaced with data from Supabase
  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with payment integration",
      tech: ["Next.js", "Supabase", "Stripe"],
      link: "#",
      github: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool",
      tech: ["React", "Node.js", "PostgreSQL"],
      link: "#",
      github: "#"
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio with admin panel",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      link: "#",
      github: "#"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-gray-600">
            Some of my recent projects
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <ExternalLink size={14} className="mr-1" />
                      View Live
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Github size={14} className="mr-1" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/portfolio">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}