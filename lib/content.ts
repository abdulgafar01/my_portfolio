// --- Practice strip -------------------------------------------------------
// components/practice-strip.tsx — the thin band of practice areas.
export const PRACTICE_AREAS = [
  { k: "01", v: "AI SaaS products" },
  { k: "02", v: "Full-stack systems" },
  { k: "03", v: "Workflow automation" },
  { k: "04", v: "Product UI" },
  { k: "05", v: "API-first architecture" },
] as const

// --- Selected work --------------------------------------------------------
// components/selected-work.tsx — the project carousel.
export type Project = {
  index: string
  title: string
  description: string
  year: string
  status: string
  tags: readonly string[]
  href: string
  image: string
  imageAlt: string
}

export const PROJECTS: readonly Project[] = [
  {
    index: "01",
    title: "AI Interior Design Platform",
    description:
      "A workflow-driven SaaS product for interior designers and architects, combining image transformation, regional processing, and public API delivery.",
    year: "2026",
    status: "Live · v3.2",
    tags: ["AI SaaS", "Image workflows", "API", "B2B"],
    href: "#",
    image: "/assets/projects/interior-design-platform.png",
    imageAlt:
      "Interior design platform UI showing a before/after room render with a materials palette and a generate-design control bar.",
  },
  {
    index: "02",
    title: "AI Headshot Generator",
    description:
      "A polished consumer and team headshot experience with model training, image editing, credits, and premium generation flows.",
    year: "2025",
    status: "Live",
    tags: ["AI Images", "Product UX", "Credits", "Teams"],
    href: "#",
    image: "/assets/projects/headshot-generator.png",
    imageAlt:
      "AI headshot generator UI with a grid of generated professional portraits, style and lighting controls, and a credits counter.",
  },
  {
    index: "03",
    title: "Automation & Agent Systems",
    description:
      "Internal tools, workflow engines, and agent-backed systems designed to reduce manual operations and speed up product execution.",
    year: "2024",
    status: "Private",
    tags: ["Automation", "Agents", "Workflows", "Infra"],
    href: "#",
    image: "/assets/projects/automation-agent-systems.png",
    imageAlt:
      "Dark automation dashboard showing an agent workflow node graph alongside a live event stream and run log.",
  },
  {
    index: "04",
    title: "Document Intelligence",
    description:
      "Extraction, classification, and review tooling that turns dense unstructured documents into structured, queryable records.",
    year: "2024",
    status: "Live",
    tags: ["NLP", "Extraction", "Review UX", "Pipelines"],
    href: "#",
    image: "/assets/projects/document-intelligence.png",
    imageAlt:
      "Document intelligence UI extracting structured fields from an invoice, with a review queue and confidence indicators.",
  },
  {
    index: "05",
    title: "Data Labeling Platform",
    description:
      "A collaborative annotation surface with quality controls, reviewer queues, and exports tuned for fast model iteration.",
    year: "2023",
    status: "Live",
    tags: ["Labeling", "Collaboration", "QA", "Tooling"],
    href: "#",
    image: "/assets/projects/data-labeling-platform.png",
    imageAlt:
      "Data labeling platform annotating a room scene with bounding boxes, a reviewer queue, and a quality score panel.",
  },
]