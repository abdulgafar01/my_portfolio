'use client'

import { useId } from 'react'

interface SortDropdownProps {
  value: string
  onChange: (value: string) => void
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const id = useId()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-sm text-zinc-400">
        Sort
      </label>
      <select
        id={id}
        aria-label="Sort projects"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-full border border-white/10 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-100 outline-none transition hover:border-sky-400/40"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="popular">Most Popular</option>
        <option value="featured">Featured</option>
      </select>
    </div>
  )
}
