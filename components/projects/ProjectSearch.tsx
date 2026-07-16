'use client'

import { m } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProjectSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ProjectSearch({ value, onChange }: ProjectSearchProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
      className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-3 py-2 shadow-[0_0_60px_rgba(59,130,246,0.12)] backdrop-blur"
    >
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <Search className="ml-2 size-4 shrink-0 text-zinc-400" />
      <input
        id="project-search"
        aria-label="Search projects"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search projects..."
        className="h-11 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-zinc-500"
      />
      <Button
        type="button"
        variant="outline"
        className="hidden h-10 rounded-full border-white/10 bg-white/5 px-4 text-sm font-medium text-zinc-100 hover:bg-white/10 sm:inline-flex"
      >
        Search
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </m.div>
  )
}
