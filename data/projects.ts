export interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  stack: string[]
  github: string
  demo: string
  featured: boolean
  views: number
  stars: number
}

export const projects: Project[] = [
  {
    id: 'ai-financial-dashboard',
    title: 'AI Financial Dashboard',
    description:
      'A real-time analytics platform for portfolio forecasting, anomaly detection, and executive reporting.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    category: 'Full Stack',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    github: 'https://github.com/',
    demo: 'https://example.com/',
    featured: true,
    views: 3200,
    stars: 245,
  },
  {
    id: 'design-system-studio',
    title: 'Design System Studio',
    description:
      'A scalable component hub that unifies product design and engineering across multi-team releases.',
    image:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
    category: 'Frontend',
    stack: ['React', 'TypeScript', 'Tailwind', 'Storybook'],
    github: 'https://github.com/',
    demo: 'https://example.com/',
    featured: true,
    views: 1840,
    stars: 132,
  },
  {
    id: 'agentic-workflow-console',
    title: 'Agentic Workflow Console',
    description:
      'An orchestration experience for AI agents, approvals, and human-in-the-loop operations.',
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    category: 'AI',
    stack: ['Next.js', 'TypeScript', 'OpenAI', 'Supabase', 'Docker'],
    github: 'https://github.com/',
    demo: 'https://example.com/',
    featured: true,
    views: 2760,
    stars: 198,
  },
  {
    id: 'supply-chain-ops',
    title: 'Supply Chain Ops',
    description:
      'A resilient operations suite that visualizes inventory health, delivery risk, and fulfillment metrics.',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    category: 'Backend',
    stack: ['Node.js', 'TypeScript', 'Prisma', 'Postgres', 'Docker'],
    github: 'https://github.com/',
    demo: 'https://example.com/',
    featured: false,
    views: 1420,
    stars: 87,
  },
  {
    id: 'creator-analytics-hub',
    title: 'Creator Analytics Hub',
    description:
      'A premium reporting experience for content teams with segmentation, funnels, and content health insights.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    category: 'Frontend',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/',
    demo: 'https://example.com/',
    featured: true,
    views: 2210,
    stars: 154,
  },
  {
    id: 'developer-platform',
    title: 'Developer Platform',
    description:
      'An internal platform designed to accelerate onboarding, deployment, and engineering productivity.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    category: 'Full Stack',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Prisma', 'Framer Motion'],
    github: 'https://github.com/',
    demo: 'https://example.com/',
    featured: false,
    views: 1980,
    stars: 116,
  },
  {
    id: 'open-source-cli',
    title: 'Open Source CLI',
    description:
      'A developer-focused command-line tool for generating polished project scaffolds from templates.',
    image:
      'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&w=1200&q=80',
    category: 'Open Source',
    stack: ['TypeScript', 'Node.js', 'CLI', 'Docker'],
    github: 'https://github.com/',
    demo: 'https://example.com/',
    featured: true,
    views: 1530,
    stars: 203,
  },
  {
    id: 'next-portfolio-system',
    title: 'Next Portfolio System',
    description:
      'A modular portfolio framework focused on storytelling, content management, and delightful motion.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    category: 'React',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/',
    demo: 'https://example.com/',
    featured: false,
    views: 1660,
    stars: 97,
  },
]

export const projectCategories = [
  'All',
  'Frontend',
  'Full Stack',
  'Backend',
  'AI',
  'Open Source',
  'React',
  'Next.js',
  'TypeScript',
]
