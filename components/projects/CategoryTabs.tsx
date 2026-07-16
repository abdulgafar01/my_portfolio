'use client'

import { m } from 'framer-motion'

interface CategoryTabsProps {
  categories: string[]
  active: string
  onChange: (category: string) => void
}

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => {
        const isActive = category === active
        return (
          <m.button
            key={category}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? 'border-white bg-white text-black shadow-lg shadow-sky-500/10'
                : 'border-white/10 bg-zinc-900/80 text-zinc-300 hover:border-sky-400/40 hover:text-white'
            }`}
          >
            {category}
          </m.button>
        )
      })}
    </div>
  )
}
