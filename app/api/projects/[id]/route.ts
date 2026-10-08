
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { updateProjectSchema } from "@/lib/validations/project-update";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
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

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("GET /api/projects/[id] failed:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch project" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    const project = await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 },
      );
    }

    console.error("DELETE /api/projects/[id] failed:", error);

    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 },
      );
    }

    const body: unknown = await request.json();
    const validation = updateProjectSchema.safeParse(body);

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

    // Reject duplicate IDs in replacement collections.
    if (
      (data.technologyIds &&
        new Set(data.technologyIds).size !== data.technologyIds.length) ||
      (data.categoryIds &&
        new Set(data.categoryIds).size !== data.categoryIds.length)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Duplicate technology or category IDs are not allowed",
        },
        { status: 400 },
      );
    }

    const project = await prisma.$transaction(async (tx) => {
      // Check the project and requested relationships.
      const existingProject = await tx.project.findUnique({
        where: { id },
        select: { id: true },
      });

      if (!existingProject) {
        throw new Error("PROJECT_NOT_FOUND");
      }

      if (data.technologyIds !== undefined) {
        const technologies = await tx.technology.findMany({
          where: { id: { in: data.technologyIds } },
          select: { id: true },
        });

        if (technologies.length !== data.technologyIds.length) {
          throw new Error("INVALID_TECHNOLOGY_IDS");
        }
      }

      if (data.categoryIds !== undefined) {
        const categories = await tx.category.findMany({
          where: { id: { in: data.categoryIds } },
          select: { id: true },
        });

        if (categories.length !== data.categoryIds.length) {
          throw new Error("INVALID_CATEGORY_IDS");
        }
      }

      // Update only scalar fields explicitly provided by the client.
      await tx.project.update({
        where: { id },
        data: {
          ...(data.title !== undefined && { title: data.title }),
          ...(data.slug !== undefined && { slug: data.slug }),
          ...(data.shortDescription !== undefined && {
            shortDescription: data.shortDescription,
          }),
          ...(data.description !== undefined && {
            description: data.description,
          }),
          ...(data.coverImage !== undefined && {
            coverImage: data.coverImage,
          }),
          ...(data.liveUrl !== undefined && { liveUrl: data.liveUrl }),
          ...(data.githubUrl !== undefined && {
            githubUrl: data.githubUrl,
          }),
          ...(data.caseStudyUrl !== undefined && {
            caseStudyUrl: data.caseStudyUrl,
          }),
          ...(data.featured !== undefined && {
            featured: data.featured,
          }),
          ...(data.published !== undefined && {
            published: data.published,
          }),
          ...(data.displayOrder !== undefined && {
            displayOrder: data.displayOrder,
          }),
          ...(data.completedAt !== undefined && {
            completedAt: data.completedAt
              ? new Date(data.completedAt)
              : null,
          }),
        },
      });

      // Replace technologies only when technologyIds was supplied.
      if (data.technologyIds !== undefined) {
        await tx.projectTechnology.deleteMany({
          where: { projectId: id },
        });

        if (data.technologyIds.length > 0) {
          await tx.projectTechnology.createMany({
            data: data.technologyIds.map((technologyId) => ({
              projectId: id,
              technologyId,
            })),
          });
        }
      }

      // Replace categories only when categoryIds was supplied.
      if (data.categoryIds !== undefined) {
        await tx.projectCategory.deleteMany({
          where: { projectId: id },
        });

        if (data.categoryIds.length > 0) {
          await tx.projectCategory.createMany({
            data: data.categoryIds.map((categoryId) => ({
              projectId: id,
              categoryId,
            })),
          });
        }
      }

      // Replace gallery images only when images was supplied.
      if (data.images !== undefined) {
        await tx.projectImage.deleteMany({
          where: { projectId: id },
        });

        if (data.images.length > 0) {
          await tx.projectImage.createMany({
            data: data.images.map((image) => ({
              projectId: id,
              url: image.url,
              alt: image.alt ?? null,
              caption: image.caption ?? null,
              displayOrder: image.displayOrder,
            })),
          });
        }
      }

      // Return the complete, updated project.
      return tx.project.findUniqueOrThrow({
        where: { id },
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

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "PROJECT_NOT_FOUND") {
        return NextResponse.json(
          { success: false, message: "Project not found" },
          { status: 404 },
        );
      }

      if (
        error.message === "INVALID_TECHNOLOGY_IDS" ||
        error.message === "INVALID_CATEGORY_IDS"
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              error.message === "INVALID_TECHNOLOGY_IDS"
                ? "One or more technologies do not exist"
                : "One or more categories do not exist",
          },
          { status: 400 },
        );
      }
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

    console.error("PATCH /api/projects/[id] failed:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update project" },
      { status: 500 },
    );
  }
}