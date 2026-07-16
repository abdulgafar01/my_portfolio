'use client'

import { m } from 'framer-motion'

export function ProjectsHeader() {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mx-auto flex max-w-3xl flex-col items-center text-center"
    >
     
      <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
        My{' '}
        <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-600 bg-clip-text text-transparent">
          Projects
        </span>
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
        A curated collection of production-ready applications showcasing modern frontend engineering,
        backend architecture, motion, and scalable software design.
      </p>
    </m.div>
  )
}
