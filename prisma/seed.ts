import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const nextjs = await prisma.technology.upsert({
    where: {
      slug: "nextjs",
    },
    update: {},
    create: {
      name: "Next.js",
      slug: "nextjs",
      icon: "/icons/nextjs.svg",
    },
  });

  const typescript = await prisma.technology.upsert({
    where: {
      slug: "typescript",
    },
    update: {},
    create: {
      name: "TypeScript",
      slug: "typescript",
      icon: "/icons/typescript.svg",
    },
  });

  const prismaTech = await prisma.technology.upsert({
    where: {
      slug: "prisma",
    },
    update: {},
    create: {
      name: "Prisma",
      slug: "prisma",
      icon: "/icons/prisma.svg",
    },
  });

  const fullstack = await prisma.category.upsert({
    where: {
      slug: "fullstack",
    },
    update: {},
    create: {
      name: "Full Stack",
      slug: "fullstack",
    },
  });

  const project = await prisma.project.create({
    data: {
      title: "Legal AI Platform",

      slug: "legal-ai-platform",

      shortDescription:
        "An AI-powered legal research and document management platform.",

      description:
        "A full-stack platform designed to help legal professionals manage documents, research cases, and interact with AI-powered tools.",

      coverImage:
        "/projects/legal-ai/cover.webp",

      liveUrl:
        "https://example.com",

      githubUrl:
        "https://github.com/example/legal-ai",

      featured: true,

      published: true,

      displayOrder: 1,

      technologies: {
        create: [
          {
            technology: {
              connect: {
                id: nextjs.id,
              },
            },
          },
          {
            technology: {
              connect: {
                id: typescript.id,
              },
            },
          },
          {
            technology: {
              connect: {
                id: prismaTech.id,
              },
            },
          },
        ],
      },

      categories: {
        create: [
          {
            category: {
              connect: {
                id: fullstack.id,
              },
            },
          },
        ],
      },
    },
  });

  console.log("Created project:", project.title);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });