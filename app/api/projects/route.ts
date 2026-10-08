import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createProjectSchema } from "@/lib/validations/project";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
    //   where: {
    //     published: true,
    //   },

      include: {
        images: {
          orderBy: {
            displayOrder: "asc",
          },
        },

        technologies: {
          include: {
            technology: true,
          },
        },

        categories: {
          include: {
            category: true,
          },
        },
      },

      orderBy: [
        {
          featured: "desc",
        },
        {
          displayOrder: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch projects",
      },
      {
        status: 500,
      }
    );
  }
}



export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate the request body
    const body: unknown = await request.json();
    const validation = createProjectSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid project data",
          errors: validation.error.flatten(),
        },
        { status: 400 },
      );
    }

    const data = validation.data;

    // 2. Create the project and related records atomically
    const project = await prisma.$transaction(async (tx) => {
      // Ensure all selected technologies exist
      const technologies = await tx.technology.findMany({
        where: { id: { in: data.technologyIds } },
        select: { id: true },
      });

      if (technologies.length !== new Set(data.technologyIds).size) {
        throw new Error("INVALID_TECHNOLOGY_IDS");
      }

      // Ensure all selected categories exist
      const categories = await tx.category.findMany({
        where: { id: { in: data.categoryIds } },
        select: { id: true },
      });

      if (categories.length !== new Set(data.categoryIds).size) {
        throw new Error("INVALID_CATEGORY_IDS");
      }

      return tx.project.create({
        data: {
          title: data.title,
          slug: data.slug,
          shortDescription: data.shortDescription ?? null,
          description: data.description,
          coverImage: data.coverImage ?? null,
          liveUrl: data.liveUrl ?? null,
          githubUrl: data.githubUrl ?? null,
          caseStudyUrl: data.caseStudyUrl ?? null,
          featured: data.featured,
          published: data.published,
          displayOrder: data.displayOrder,
          completedAt: data.completedAt
            ? new Date(data.completedAt)
            : null,

          images: {
            create: data.images.map((image) => ({
              url: image.url,
              alt: image.alt ?? null,
              caption: image.caption ?? null,
              displayOrder: image.displayOrder,
            })),
          },

          technologies: {
            create: data.technologyIds.map((technologyId) => ({
              technology: {
                connect: { id: technologyId },
              },
            })),
          },

          categories: {
            create: data.categoryIds.map((categoryId) => ({
              category: {
                connect: { id: categoryId },
              },
            })),
          },
        },

        include: {
          images: {
            orderBy: { displayOrder: "asc" },
          },
          technologies: {
            include: { technology: true },
          },
          categories: {
            include: { category: true },
          },
        },
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: project,
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      [
        "INVALID_TECHNOLOGY_IDS",
        "INVALID_CATEGORY_IDS",
      ].includes(error.message)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: error.message === "INVALID_TECHNOLOGY_IDS"
            ? "One or more technologies do not exist"
            : "One or more categories do not exist",
        },
        { status: 400 },
      );
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A project with this slug already exists",
        },
        { status: 409 },
      );
    }

    console.error("POST /api/projects failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project",
      },
      { status: 500 },
    );
  }
}