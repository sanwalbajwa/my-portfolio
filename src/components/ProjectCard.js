"use client"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ExternalLink, Github, Eye, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import ProjectDetailDialog from './ProjectDetailDialog'

export default function ProjectCard({ project }) {
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
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
            <div className="flex justify-between items-start">
              <Badge variant="outline" className="mb-2">
                {project.category || 'Web Development'}
              </Badge>
            </div>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <CardDescription className="text-sm line-clamp-3">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech_stack && project.tech_stack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.tech_stack && project.tech_stack.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.tech_stack.length - 3} more
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-auto space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {/* View More Button */}
                <Button 
                  variant="outline" 
                  onClick={() => setShowDialog(true)}
                  className="flex items-center justify-center gap-1"
                >
                  <Eye size={14} />
                  View More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Project Detail Dialog */}
      <ProjectDetailDialog 
        project={project}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  )
}