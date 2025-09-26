"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ExternalLink, Github, Lock } from 'lucide-react'
import Image from 'next/image'

export default function ProjectDetailDialog({ project, open, onOpenChange }) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Project Image */}
          {project.image && (
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Category */}
          <div>
            <Badge variant="outline" className="mb-4">
              {project.category || 'Web Development'}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">About This Project</h3>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-semibold mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack && project.tech_stack.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {/* Live Site Button */}
            {project.is_live && project.live_url ? (
              <Button asChild className="flex-1">
                <a 
                  href={project.live_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  View Live Site
                </a>
              </Button>
            ) : (
              <Button variant="outline" disabled className="flex-1">
                <Lock size={16} className="mr-2" />
                Private Project
              </Button>
            )}

            {/* GitHub Button */}
            {project.is_code_available && project.github_url ? (
              <Button variant="outline" asChild className="flex-1">
                <a 
                  href={project.github_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              </Button>
            ) : (
              <Button variant="outline" disabled className="flex-1">
                <Lock size={16} className="mr-2" />
                Private Code
              </Button>
            )}
          </div>

          {/* Project Stats */}
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Status:</span>
                <span className="ml-2 text-gray-600">
                  {project.is_live ? 'Live' : 'In Development'}
                </span>
              </div>
              <div>
                <span className="font-medium">Created:</span>
                <span className="ml-2 text-gray-600">
                  {new Date(project.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}