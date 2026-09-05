'use client'

import React from 'react'
import { m } from 'motion/react'
import { Button } from './ui/button'
import Container from './layout/Container'

const approachSteps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'Every successful product starts with understanding the problem. I take time to learn about the users, business goals, and project requirements before making technical decisions.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
  },
  {
    number: '02',
    title: 'Design & Architecture',
    description:
      'Before development begins, I plan the application structure, user experience, and technical architecture so the product is scalable, maintainable, and built on a strong foundation.',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop',
  },
  {
    number: '03',
    title: 'Development & Collaboration',
    description:
      'This is where ideas become reality. I build responsive, high-performance applications while keeping you informed through regular progress updates, demos, and feedback loops.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
  },
  {
    number: '04',
    title: 'Testing, Launch & Improvement',
    description:
      'Before launch, every feature is tested for performance, accessibility, and reliability. After deployment, I continue refining the product as user needs and business goals evolve.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop',
  },
]

export const MyApproach = () => {
  const [hoveredProject, setHoveredProject] = React.useState<string | null>(null)

  return (
    <section className="py-32 px-6  text-black dark:text-white overflow-hidden relative min-h-screen">
      <Container className="max-w-7xl mx-auto z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter">
            My Engineering<br />
            <span className="italic">Approach</span>
          </h2>
          <div className="max-w-md space-y-6">
            <p className="text-zinc-500 text-lg md:text-xl text-pretty leading-relaxed">
              I guide products from strategy to launch with a thoughtful process that balances clarity, collaboration, and long-term growth.
            </p>
            <Button className="h-12 px-6 dark:hover:bg-zinc-50 border text-black border-zinc-200 bg-zinc-100 rounded-full text-sm font-bold hover:bg-zinc-50 transition-colors active:scale-95 cursor-pointer">
              See how I work
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="grid sm:grid-cols-2 ">
            {approachSteps.map((v, i) => (
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
              {approachSteps.slice(0, 2).map((project, index) => (
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
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/50 transition-all duration-300 cursor-pointer sm:flex-row ${
                      hoveredProject === project.title ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {/* <a
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
                    ) : null} */}
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
              {approachSteps.slice(2).map((project, index) => (
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
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center  cursor-pointer gap-3 bg-black/50 transition-all duration-300 sm:flex-row ${
                      hoveredProject === project.title ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {/* <a
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
                    ) : null} */}
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
      </Container>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-80 mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)]"></div>
    </section>
  )
}
