'use client'

import { m } from 'framer-motion'

interface ProjectPaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ProjectPagination({ page, totalPages, onPageChange }: ProjectPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.2 }}
      className="mt-10 flex flex-wrap items-center justify-center gap-3"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="rounded-full border border-white/10 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-300 transition hover:border-sky-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      {pages.map((item) => {
        const isActive = item === page
        return (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
              isActive
                ? 'border-sky-400/50 bg-sky-500 text-black shadow-lg shadow-sky-500/20'
                : 'border-white/10 bg-zinc-900/80 text-zinc-300 hover:border-sky-400/40 hover:text-white'
            }`}
          >
            {item}
          </button>
        )
      })}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="rounded-full border border-white/10 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-300 transition hover:border-sky-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </m.div>
  )
}
