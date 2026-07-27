"use client"
import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { supabase } from '../lib/supabase'
import ProjectDetailDialog from './ProjectDetailDialog'

export default function FeaturedWork() {
  const [projects, setProjects] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjectsAndCategories()
  }, [])

  const fetchProjectsAndCategories = async () => {
    try {
      let { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('show_on_home', true)
        .order('display_order', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: false })
        .limit(3)

      if (projectsError?.message?.includes('show_on_home')) {
        const fallback = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true, nullsFirst: false })
          .order('created_at', { ascending: false })
          .limit(3)

        projectsData = fallback.data
        projectsError = fallback.error
      }

      if (projectsError?.message?.includes('display_order')) {
        const fallback = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3)

        projectsData = fallback.data
        projectsError = fallback.error
      }

      if (!projectsError && projectsData) {
        setProjects(projectsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setShowDialog(true)
  }

  const filteredProjects = useMemo(() => projects.slice(0, 3), [projects])

  const getProjectAt = (offset) => {
    if (filteredProjects.length === 0) {
      return null
    }

    const nextIndex = (activeSlide + offset + filteredProjects.length) % filteredProjects.length
    return filteredProjects[nextIndex]
  }

  const handlePreviousSlide = () => {
    setActiveSlide((current) => (
      current === 0 ? filteredProjects.length - 1 : current - 1
    ))
  }

  const handleNextSlide = () => {
    setActiveSlide((current) => (
      current === filteredProjects.length - 1 ? 0 : current + 1
    ))
  }

  const handleKeyDown = (event) => {
    if (filteredProjects.length <= 1) {
      return
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      handlePreviousSlide()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      handleNextSlide()
    }
  }

  const handleDragEnd = (_, info) => {
    if (filteredProjects.length <= 1) {
      return
    }

    if (info.offset.x < -80 || info.velocity.x < -500) {
      handleNextSlide()
    }

    if (info.offset.x > 80 || info.velocity.x > 500) {
      handlePreviousSlide()
    }
  }

  const carouselProjects = [
    { project: getProjectAt(-1), position: 'left' },
    { project: getProjectAt(0), position: 'center' },
    { project: getProjectAt(1), position: 'right' }
  ].filter(({ project }, index, items) => (
    project && items.findIndex(item => item.project?.id === project.id) === index
  ))

  const ProjectCard = ({ project, position }) => {
    const isCenter = position === 'center'
    const isLeft = position === 'left'
    const slideLabel = isLeft ? 'Previous project' : 'Next project'

    const handleSideCardClick = () => {
      if (isCenter) {
        return
      }

      if (isLeft) {
        handlePreviousSlide()
        return
      }

      handleNextSlide()
    }

    return (
      <motion.div
        layout
        initial={false}
        animate={{
          opacity: isCenter ? 1 : 0.72,
          scale: isCenter ? 1 : 0.86,
          y: isCenter ? 0 : 22,
          rotateY: isCenter ? 0 : isLeft ? 5 : -5
        }}
        whileHover={isCenter ? { y: -6 } : { opacity: 0.72, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.9 }}
        role={isCenter ? undefined : 'button'}
        tabIndex={isCenter ? undefined : 0}
        onClick={handleSideCardClick}
        onKeyDown={(event) => {
          if (!isCenter && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            handleSideCardClick()
          }
        }}
        aria-label={isCenter ? undefined : slideLabel}
        className={`${isCenter ? 'z-10 md:col-span-4' : 'hidden cursor-pointer md:block md:col-span-3'} min-w-0 transform-gpu`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Card className={`h-full overflow-hidden border-[#e3d9c8] bg-white py-0 pb-6 transition-all duration-300 group ${
          isCenter ? 'shadow-xl ring-1 ring-[#2b766f]/10' : 'shadow-sm'
        }`}>
          {project.image && (
            <div className={`${isCenter ? 'h-56 md:h-72' : 'h-48'} relative w-full overflow-hidden`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3">
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                  {project.category}
                </Badge>
              </div>
            </div>
          )}

          <CardHeader>
            <CardTitle className={isCenter ? 'text-2xl' : 'text-xl'}>
              {project.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-4 flex flex-wrap gap-2">
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

            <div className={`mt-6 flex flex-col gap-3 border-t border-[#e3d9c8] pt-4 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between ${isCenter ? '' : 'pointer-events-none'}`}>
              {project.case_study_url ? (
                <a
                  href={project.case_study_url}
                  className="group inline-flex items-center gap-2 text-[#17262d] transition-colors hover:text-[#2b766f]"
                >
                  View Case Study
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => handleProjectClick(project)}
                  className="group inline-flex items-center gap-2 text-left text-[#17262d] transition-colors hover:text-[#2b766f]"
                >
                  View Case Study
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </button>
              )}

              {project.is_live && project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[#2b766f] transition-colors hover:text-[#17313b]"
                >
                  Live Project
                  <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-[#f7f2e8]">
        <div className="px-5 sm:px-8 md:px-10 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#17262d] mb-4">
              Selected Engineering Work
            </h2>
            <p className="text-base md:text-lg text-[#5f665f]">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="overflow-x-clip py-16 md:py-20 bg-[#f7f2e8]">
      <div className="px-5 sm:px-8 md:px-10 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#17262d] mb-4">
            Selected Engineering Work
          </h2>
          <p className="mx-auto max-w-3xl text-base md:text-lg text-[#5f665f]">
            A selection of full-stack applications and custom WordPress systems built to solve real business requirements.
          </p>
        </div>

        {filteredProjects.length > 0 && (
          <div className="mb-12">
            <div
              className="relative px-1 py-8"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              aria-label="Selected engineering work carousel"
            >
              {filteredProjects.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handlePreviousSlide}
                    className="absolute left-1 top-1/2 z-20 -translate-y-1/2 bg-white/90 shadow-md"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={18} />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleNextSlide}
                    className="absolute right-1 top-1/2 z-20 -translate-y-1/2 bg-white/90 shadow-md"
                    aria-label="Next project"
                  >
                    <ChevronRight size={18} />
                  </Button>
                </>
              )}

              <motion.div
                layout
                drag={filteredProjects.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
                transition={{ type: 'spring', stiffness: 170, damping: 26, mass: 0.9 }}
                className="grid min-h-[560px] cursor-grab grid-cols-1 items-center gap-6 active:cursor-grabbing md:grid-cols-10 md:gap-4 lg:gap-6"
              >
                {carouselProjects.map(({ project, position }) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    position={position}
                  />
                ))}
              </motion.div>
            </div>

            {filteredProjects.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {filteredProjects.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === index ? 'w-8 bg-[#2b766f]' : 'w-2.5 bg-[#d8cdb9] hover:bg-[#8fb3ad]'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No projects found.
            </p>
          </motion.div>
        )}

        {projects.length > 0 && (
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/portfolio">
                View All Projects
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
