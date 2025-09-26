"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300">
        {/* Project Image */}
        {project.image && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-3">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech_stack && project.tech_stack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto space-y-2">
            {project.link && (
              <Button 
                className="w-full" 
                asChild
              >
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  View Live Project
                </a>
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="w-full"
              asChild
            >
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Github size={16} />
                View Source Code
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}