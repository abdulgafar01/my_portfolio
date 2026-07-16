'use client'

import { useMemo, useState } from 'react'
import { m } from 'framer-motion'
import { ProjectsHeader } from './ProjectsHeader'
import { ProjectSearch } from './ProjectSearch'
import { CategoryTabs } from './CategoryTabs'
import { ProjectsGrid } from './ProjectsGrid'
import { ProjectPagination } from './ProjectPagination'
import { SortDropdown } from './SortDropdown'
import { projectCategories, projects } from '@/data/projects'

const ITEMS_PER_PAGE = 6

export function ProjectsSection() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [page, setPage] = useState(1)

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const matches = projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' ||
        project.category === activeCategory ||
        project.stack.some((tech) => tech.toLowerCase() === activeCategory.toLowerCase())

      const matchesQuery =
        normalizedQuery.length === 0 ||
        [project.title, project.description, project.category, ...project.stack]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })

    const sorted = [...matches].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.id.localeCompare(b.id)
        case 'popular':
          return b.views - a.views
        case 'featured':
          return Number(b.featured) - Number(a.featured)
        case 'newest':
        default:
          return b.stars - a.stars
      }
    })

    return sorted
  }, [activeCategory, query, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE))
  const visibleProjects = filteredProjects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white sm:px-8 lg:px-10 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_35%,rgba(255,255,255,0.02))]" />
      <div className="relative mx-auto max-w-7xl">
        <ProjectsHeader />

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.12 }}
          className="mt-12 space-y-5"
        >
          <ProjectSearch value={query} onChange={setQuery} />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.16 }}
          className="mt-10 flex flex-col gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between"
        >
          <CategoryTabs categories={projectCategories} active={activeCategory} onChange={setActiveCategory} />
          
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </m.div>

        <div className="mt-10">
          <ProjectsGrid projects={visibleProjects} />
        </div>

        
        <div className='flex items-center justify-between'>
          <p className="text-sm text-zinc-400">
            Showing <span className="font-semibold text-zinc-100">{filteredProjects.length}</span> Projects
          </p>
        <ProjectPagination page={page} totalPages={totalPages} onPageChange={(nextPage) => setPage(nextPage)} />
        </div>
    

      </div>
    </section>
  )
}
