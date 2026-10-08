'use client'

import { useMemo, useState } from 'react'
import { m } from 'framer-motion'
import { ProjectsHeader } from './ProjectsHeader'
import { ProjectSearch } from './ProjectSearch'
import { CategoryTabs } from './CategoryTabs'
import { ProjectsGrid } from './ProjectsGrid'
import { ProjectPagination } from './ProjectPagination'
import { SortDropdown } from './SortDropdown'
import { useProjects } from '@/hooks/use-projects'

const ITEMS_PER_PAGE = 6

export function ProjectsSection() {
  const { data: projects = [], isLoading, isError, error } = useProjects()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [page, setPage] = useState(1)

  const projectCategories = useMemo(
    () => ['All', ...new Set(projects.flatMap((project) => project.categories.map(({ category }) => category.name)))],
    [projects]
  )

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const matches = projects.filter((project) => {
      const categoryNames = project.categories.map(({ category }) => category.name)
      const techNames = project.technologies.map(({ technology }) => technology.name)

      const matchesCategory =
        activeCategory === 'All' ||
        categoryNames.includes(activeCategory) ||
        techNames.some((tech) => tech.toLowerCase() === activeCategory.toLowerCase())

      const matchesQuery =
        normalizedQuery.length === 0 ||
        [project.title, project.description, ...categoryNames, ...techNames]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })

    const sorted = [...matches].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'featured':
          return Number(b.featured) - Number(a.featured)
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return sorted
  }, [activeCategory, projects, query, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE))
  const visibleProjects = filteredProjects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white sm:px-8 lg:px-10 lg:py-32">
        <div className="relative mx-auto max-w-7xl">
          <p className="text-zinc-300">Loading projects...</p>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white sm:px-8 lg:px-10 lg:py-32">
        <div className="relative mx-auto max-w-7xl">
          <p className="text-red-400">{error instanceof Error ? error.message : 'Failed to load projects.'}</p>
        </div>
      </section>
    )
  }

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

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-zinc-400">
            Showing <span className="font-semibold text-zinc-100">{filteredProjects.length}</span> Projects
          </p>
          <ProjectPagination page={page} totalPages={totalPages} onPageChange={(nextPage) => setPage(nextPage)} />
        </div>
      </div>
    </section>
  )
}
