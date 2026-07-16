'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'framer-motion'
import { ArrowUpRight, GitBranch, Sparkles } from 'lucide-react'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <m.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className="group overflow-hidden rounded-[24px] border border-white/10 bg-zinc-950/70 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-zinc-100 backdrop-blur">
          {project.category}
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`View GitHub for ${project.title}`}
            className="rounded-full border border-white/15 bg-black/50 p-2 text-zinc-100 backdrop-blur transition hover:bg-white/20"
          >
            <GitBranch className="size-4" />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open demo for ${project.title}`}
            className="rounded-full border border-white/15 bg-black/50 p-2 text-zinc-100 backdrop-blur transition hover:bg-white/20"
          >
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-6">
        <div className="space-y-3">
         
          <h3 className="text-xl font-semibold tracking-tight text-white">{project.title}</h3>
          <p className="line-clamp-3 text-sm leading-7 text-zinc-400">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-zinc-900/80 px-2.5 py-1 text-[0.72rem] font-medium text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm text-zinc-400">
          <div className="flex items-center gap-4">
            <span>⭐ {project.stars}</span>
            <span>👁 {project.views.toLocaleString()}</span>
          </div>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {project.featured ? 'Featured' : 'Completed'}
          </span>
        </div>

        <div className="flex gap-3">
          <Link
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full border border-white/15 px-4 py-2.5 text-center text-sm font-semibold text-zinc-100 transition hover:bg-white/10"
          >
            Live Demo
          </Link>
          <Link
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            View Project
          </Link>
        </div>
      </div>
    </m.article>
  )
}
