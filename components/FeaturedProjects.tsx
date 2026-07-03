'use client'

import React from 'react'
import { m } from 'motion/react'
import { Button } from './ui/button'

const featuredProjects = [
  {
    number: '01',
    title: 'Who We Are',
    description:
      'A diverse collective of thinkers, makers, and problem solvers dedicated to pushing boundaries.',
    demoLink: 'https://www.kreativy.com/',
    githubLink: 'https://github.com/',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800',
  },
  {
    number: '02',
    title: 'What Do We Do',
    description:
      'We craft digital experiences that resonate, using state-of-the-art technology and timeless design.',
    demoLink: 'https://www.kreativy.com/',
    githubLink: 'https://github.com/',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800',
  },
  {
    number: '03',
    title: 'How Do We Help',
    description:
      'Through deep collaboration and strategic thinking, we help brands navigate the modern digital landscape.',
      demoLink: 'https://www.kreativy.com/',  
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800"
  },
  {
    number: '04',
    title: 'Create Success',
    description:
      'Our goal is measurable impact and lasting legacy for every client we partner with.',
      demoLink: 'https://www.kreativy.com/',
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800"
  },
]

export const FeaturedProjects = () => {
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null)

  return (
    <section className="py-32 px-6  text-black dark:text-white overflow-hidden relative min-h-screen">
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter">
            My Featured <br />
            <span className="italic">Projects</span>
          </h2>
          <div className="max-w-md space-y-6">
            <p className="text-zinc-500 text-lg md:text-xl text-pretty leading-relaxed">
              I create thoughtful digital work that blends aesthetics, clarity,
              and function to make a lasting impression.
            </p>
            <Button className="h-12 px-6 dark:hover:bg-zinc-50 border text-black border-zinc-200 bg-zinc-100 rounded-full text-sm font-bold hover:bg-zinc-50 transition-colors active:scale-95 cursor-pointer">
              Explore my work
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="grid sm:grid-cols-2 ">
            {featuredProjects.map((v, i) => (
              <m.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
                className="group hover:bg-zinc-100 p-6 border border-transparent hover:border-zinc-300 transition-colors duration-300"
              >
                <div className="text-xs font-black text-zinc-300 mb-4 tracking-tighter  group-hover:text-black transition-colors duration-300">
                  {v.number}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight font-spaceGrotesk">
                  {v.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed text-sm text-pretty">
                  {v.description}
                </p>
              </m.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 relative">
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6"
            >
              {featuredProjects.slice(0, 2).map((project, index) => (
                <div
                  key={project.title}
                  className={`rounded-3xl bg-zinc-100 overflow-hidden shadow-inner group relative ${
                    index === 0 ? 'aspect-4/5' : 'aspect-square'
                  }`}
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onFocus={() => setHoveredProject(project.title)}
                  onBlur={() => setHoveredProject(null)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover size-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/50 transition-all duration-300 sm:flex-row ${
                      hoveredProject === project.title ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                    >
                      Live Demo
                    </a>
                    {project.githubLink ? (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                      >
                        GitHub
                      </a>
                    ) : null}
                  </div>
                  <div className="absolute top-3 right-3 z-30 pointer-events-none">
                    <span className="text-2xl sm:text-6xl font-bold text-white/40">
                      {project.number}
                    </span>
                  </div>
                </div>

              ))}
            </m.div>
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="space-y-6 pt-12"
            >
              {featuredProjects.slice(2).map((project, index) => (
                <div
                  key={project.title}
                  className={`rounded-3xl bg-zinc-100 overflow-hidden shadow-inner group relative ${
                    index === 0 ? 'aspect-square' : 'aspect-4/5'
                  }`}
                  onMouseEnter={() => setHoveredProject(project.title)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onFocus={() => setHoveredProject(project.title)}
                  onBlur={() => setHoveredProject(null)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover size-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/50 transition-all duration-300 sm:flex-row ${
                      hoveredProject === project.title ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                    >
                      Live Demo
                    </a>
                    {project.githubLink ? (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                      >
                        GitHub
                      </a>
                    ) : null}
                  </div>
                  <div className="absolute top-3 right-3 z-30 pointer-events-none">
                    <span className="text-2xl sm:text-6xl font-bold text-white/40">
                      {project.number}
                    </span>
                  </div>
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
    </section>
  )
}
