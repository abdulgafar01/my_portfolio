"use client"

// import { Project, PROJECTS } from '@/lib/content'
import { Project, PROJECTS } from '@/lib/content'
import React, { useCallback, useEffect, useState } from 'react'
import { m } from 'framer-motion'
import { Card } from './ui/card'
import Image from 'next/image'
import { Badge } from './ui/badge'
import Link from 'next/link'
// import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
// import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'


// const Timeline = ({ active }: { active: number }) => {
//     const baseFraction = active / (PROJECTS.length - 1)
//     const segmentFraction = 1 / (PROJECTS.length - 1)
//     return (
//         <div className="relative h-full w-px bg-hairline">

//             <div className="absolute inset-x-0 top-0 origin-top bg-ink"
//             style={{ height: `${baseFraction * 100}%`, transformOrigin: 'top' }}
//              />

//             <div className="absolute inset-x-0 origin-top bg-ink"
//             key={active}
//             style={{
//                  top: `${baseFraction * 100}%`,
//                  height: `${segmentFraction * 100}%`,
//                   animation: `selected-work-fill-y .7s linear` }}
//              />


//             {
//                 PROJECTS.map((project, index) => {

//                     const isActive = index === active
//                     const offset = (index / (PROJECTS.length)) * 100
//                     return (
//                         <div 
//                         style={{ top: `${offset}%` }}
                        
//                         key={index} className="absolute left-1/2 top-0 h-full w-full">
//                             <m.span
//                             animate={{ scale: isActive ? 1.4 : 1 }}
//                             transition={{ duration: 0.3 , ease:[0.22,1,0.36,1] }}
//                              className={cn(
//                                 "absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full border bg-ink transition-colors ",
//                                 isActive ? 'border-ink bg-ink' : 'border-hairline-strong'
//                             )} />
//                             <span className={cn("absolute left-3 font-mono text-[11px] tabular-nums text-muted-soft/60 transition-colors duration-300",
//                                 isActive ? 'text-ink' : 'text-muted-soft'
//                             )}>
//                                 {project.year}
//                             </span>
//                             {/* <div className="absolute left-0 top-0 h-full w-full border-l border-hairline-soft" />
//                             <div className="absolute left-0 top-0 h-full w-full border-l border-hairline-soft" /> */}
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }

const CountDownRing = ({ label }: { label: string }) => {
    const radius = (26 - 1.5) / 2; // Adjusted radius to account for stroke width
    const circumference = 2 * Math.PI * radius; // Circumference of the circle with radius 7
     return (
        <span className="relative grid shrink-0 place-items-center"
        style={{ width: 26, height: 26 }}
        >
            <svg
            width={26}
            height={26}
             viewBox="0 0 26 26"
            className="absolute -rotate-90"
             >
               <circle
                 cx={26/2}
                 cy={26/2}
                 r= {radius}
                //  stroke="currentColor"
                 strokeWidth="2"
                 fill="none"
                 className="stroke-hairline/70"
               />

               <circle
                 cx={26/2}
                 cy={26/2}
                 r={radius}
                 strokeLinecap="round"
                 strokeWidth="2"
                 fill="none"
                 className="stroke-ink"
                 strokeDasharray={circumference}
                 strokeDashoffset={25}

                 style={{ 
                    ["--cd-circumference" as string]: circumference,
                    animation: `selected-work-ring 7s linear infinite forwards`,
                  }}
               />

            </svg>
            <span className=' font-mono text-[11px] text-ink tabular-nums'>
                {label}
                
            </span>
        </span>
     )
}

const CarouselArrows = ({ onPrev, onNext }: { onPrev: () => void, onNext: () => void }) => {
    return (
        <div className="flex items-center gap-3 mt-auto border-hairline-soft">
            <button
             onClick={onPrev}
             className="cursor-pointer grid place-items-center size-10 rounded-full border border-hairline-strong bg-surface-card text-ink 
             transition-colors  hover:text-ink">
                <ArrowLeftIcon size={16} />
            </button>

            <button
            onClick={onNext} className="cursor-pointer grid place-items-center size-10 rounded-full border border-hairline-strong bg-surface-card text-ink 
             transition-colors  hover:text-ink">
                <ArrowRightIcon size={16}  />
            </button>
        </div>
    )
}

const ProjectCard = ({ project,isActive }: { project: Project, isActive: boolean }) => {
    return (
        <m.div
          initial={false} 
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
          transition={{ duration: 0.3, ease:[0.22,1,0.36,1] }}

          style={{
            zIndex: isActive ? 1 : 0,
             pointerEvents: isActive ? 'auto' : 'none',
             transformOrigin:  'top center',
             willChange: isActive ? 'opacity, transform' : 'auto',

            }}

         className="[grid-area:1/1]">
            <Card className={cn(
                'relative flex h-full flex-col overflow-hidden rounded-xl border bg-surface-card p-0 ring-0 transition-colors duration-300',
                isActive ? 'border-hairline-strong' : 'border-hairline'
            )}>
                    <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-2">
                        <div className="aspect-square relative overflow-hidden border-b border-hairline md:border-b-0 md:border-r">
                            <Image src={project.image} alt={project.title} className="object-cover" fill />
                        </div>

                        <div className="flex flex-col p-6 sm:p-7">
                            <div className="flex flex-wrap items-center gap-2">
                               
                                <span className="text-muted-ink eyebrow">
                                    /
                                    {project.index}
                                </span>
                                <span className="ml-auto font-mono text-[11px] tracking-[0.11em] texet-muted-ink">
                                    {project.year}
                                </span>
                            </div>

                            <h3 className="p-6 text-[1.625rem] tracking-[0.125em]">
                                {project.title}
                            </h3>
                            <p className="mt-3 max-w-4xl text-[15px] leading-[1.6] text-body">
                                {project.description}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                {
                                    project.tags.map((tag, index) => (
                                        <Badge key={index} variant="outline" className="rounded-full border-hairline px-2 py-1 text-[10px] font-mono tracking-[0.1em] text-ink">
                                            {tag}
                                        </Badge> 
                                    ))
                                }
                            </div>
                                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-hairline-soft pt-5">

                        <Link href={project.href} className="inline-flex items-center gap-2 border-b border-transparent pb-1/2 text-sm font-medium text-ink hover:gap-3 hover:border-ink
                         transition-{gap,border} 
                         " aria-label={`View ${project.title} project`}>
                                View Case Study <ArrowUpRightIcon size={16}  />
                        </Link>

                        <span className="font-mono  text-[11px]  tracking-[0.1em] text-muted-ink">
                            {project.status}
                        </span>
                                    </div>
                    
                        </div>

                    </div>



            </Card>

        </m.div>
    )
}

const SelectedWork = () => {

        const [active, setActive] = useState(0)
        const goTo = useCallback((index: number) => {
            setActive(index % PROJECTS.length)
        }, [])
        const goNext = useCallback(() => {
            setActive((previous) => (previous + 1) % PROJECTS.length)
        }, [])
        const goPrevious = useCallback(() => {
            setActive((previous) => (previous - 1 + PROJECTS.length) % PROJECTS.length)
        }, [])

        useEffect(() => {
            const timer = setInterval(() => {
                 setActive((previous) => (previous + 1) % PROJECTS.length)
            }, 7000)
            return () => clearTimeout(timer)
        }, [])

    return (
        <section id="work" className="relative border-t border-hairline-soft"
        >
            <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10 pt-20 sm:pt-28">
                <div className="flex items-start justify-between gap-6 sm:gap-10">
                    <div className="flex items-center gap-3">
                        <span className="text-muted-ink eyebrow">
                            01
                        </span>
                        <span className="text-ink eyebrow uppercase">
                            Selected Work
                        </span>
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.1em] text-muted-ink uppercase">2024-2026</span>
                </div>

                <h2 className="mt-10 max-w-[20ch] text-[clamp(2rem,4.4vw,2.75rem)]  tracking-tight">
                    A Focused set of Recent products and systems each with a unique story and design challenge for real users
                </h2>

            </div>

            <div className="pt-12 pb-20 sm:pb-28">
                <div className="mx-auto w-full max-w-[1240px] px-6 sm:px-10">
                    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-8">
                        <nav className="flex flex-col lg:col-span-3 lg:col-start-1 lg:row-start-1" >
                            <ol className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 lg:snap-none lg:flex-col
                        lg:gap-1 lg:overflow-visible lg:pb-0">
                                {
                                    PROJECTS.map((project, index) => {
                                        const isActive = active === index
                                        return (
                                            <li key={index} className="snap-center">
                                                <button
                                                onClick={() => goTo(index)}
                                                    className="relative cursor-pointer group flex items-center gap-3 py-2 text-left 
                                             whitespace-nowrap lg:w-full lg:whitespace-normal">
                                                {
                                                    isActive ? <CountDownRing
                                                     label={project.index}
                                                    /> 


                                                    :
                                                    <span className="grid shrink-0 place-items-center font-mono
                                                text-[11px] tracking-[-0.12em] text-muted-soft tabular-nums"
                                                style={{ width: 26, height: 26 }}
                                                >
                                                        {project.index}
                                                    </span>
                                                }

                                               
                                                    <span className={
                                                        cn(
                                                            "text-[14px] leading-snug transition-colors ",
                                                            isActive ? 'text-ink' : 'text-muted-ink group-hover:text-body '
                                                        )
                                                    }>{project.title}</span>
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ol>
                            <CarouselArrows onPrev={goPrevious} onNext={goNext} />
                        </nav>

                                {/* <div>
                                  <Timeline active={active} />
                                </div> */}
                        {/* projects cards */}

                        <div className="relative isolate grid lg:col-span-8 lg:col-start-4 lg:row-start-1 lg:mt-2">
                            {
                                PROJECTS.map((project, index) => (
                                    <ProjectCard key={index} 
                                    isActive={active === index}
                                    project={project} />
                                ))
                            }
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default SelectedWork