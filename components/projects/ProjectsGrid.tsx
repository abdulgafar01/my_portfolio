'use client'

import { m } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/types/project'

interface ProjectsGridProps {
  projects: Project[]
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
      className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </m.div>
  )
}
