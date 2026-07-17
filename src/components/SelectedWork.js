"use client"
import ProjectCard from "./ProjectCard"
import { projects as sampleProjects } from "../data/projects"

export default function SelectedWork() {
  return (
    <section className="py-16 md:py-20 bg-[#f7f2e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#17262d] mb-4">01 / SELECTED WORK</h2>
          <p className="text-base md:text-lg text-[#5f665f]">Projects built around performance, usability, and business outcomes.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sampleProjects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
