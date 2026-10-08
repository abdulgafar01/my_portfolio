"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createProjectSchema } from "@/lib/validations/project";

export async function createProjectAction(formData: FormData) {
  const payload = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    description: String(formData.get("description") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    liveUrl: String(formData.get("liveUrl") ?? ""),
    githubUrl: String(formData.get("githubUrl") ?? ""),
    caseStudyUrl: String(formData.get("caseStudyUrl") ?? ""),
    featured: String(formData.get("featured") ?? "false") === "true",
    published: String(formData.get("published") ?? "false") === "true",
    displayOrder: Number(formData.get("displayOrder") ?? 0),
    completedAt: String(formData.get("completedAt") ?? "") || null,
    technologyIds: formData.getAll("technologyIds").map(String),
    categoryIds: formData.getAll("categoryIds").map(String),
    images: [],
  };

  const parsed = createProjectSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((issue) => issue.message).join("; "));
  }

  const data = parsed.data;

  const project = await prisma.$transaction(async (tx) => {
    const technologyIds = [...new Set(data.technologyIds)];
    const categoryIds = [...new Set(data.categoryIds)];

    const foundTechnologies = await tx.technology.findMany({
      where: { id: { in: technologyIds } },
      select: { id: true },
    });

    if (foundTechnologies.length !== technologyIds.length) {
      throw new Error("One or more technologies do not exist");
    }

    const foundCategories = await tx.category.findMany({
      where: { id: { in: categoryIds } },
      select: { id: true },
    });

    if (foundCategories.length !== categoryIds.length) {
      throw new Error("One or more categories do not exist");
    }

    return tx.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        shortDescription: data.shortDescription || null,
        description: data.description,
        coverImage: data.coverImage || null,
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        caseStudyUrl: data.caseStudyUrl || null,
        featured: data.featured,
        published: data.published,
        displayOrder: data.displayOrder,
        completedAt: data.completedAt ? new Date(data.completedAt) : null,
        technologies: {
          create: technologyIds.map((technologyId) => ({
            technology: { connect: { id: technologyId } },
          })),
        },
        categories: {
          create: categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
      include: {
        technologies: { include: { technology: true } },
        categories: { include: { category: true } },
      },
    });
  });

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${project.id}/edit`);
}

export async function updateProjectAction(formData: FormData) {
  const projectId = String(formData.get("projectId") ?? "");

  if (!projectId) {
    throw new Error("Project ID is required");
  }

  const payload = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    description: String(formData.get("description") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    liveUrl: String(formData.get("liveUrl") ?? ""),
    githubUrl: String(formData.get("githubUrl") ?? ""),
    caseStudyUrl: String(formData.get("caseStudyUrl") ?? ""),
    featured: String(formData.get("featured") ?? "false") === "true",
    published: String(formData.get("published") ?? "false") === "true",
    displayOrder: Number(formData.get("displayOrder") ?? 0),
    completedAt: String(formData.get("completedAt") ?? "") || null,
    technologyIds: formData.getAll("technologyIds").map(String),
    categoryIds: formData.getAll("categoryIds").map(String),
  };

  const parsed = createProjectSchema.partial().safeParse(payload);

  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((issue) => issue.message).join("; "));
  }

  const data = parsed.data;

  await prisma.$transaction(async (tx) => {
    await tx.project.update({
      where: { id: projectId },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.shortDescription !== undefined && { shortDescription: data.shortDescription || null }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.coverImage !== undefined && { coverImage: data.coverImage || null }),
        ...(data.liveUrl !== undefined && { liveUrl: data.liveUrl || null }),
        ...(data.githubUrl !== undefined && { githubUrl: data.githubUrl || null }),
        ...(data.caseStudyUrl !== undefined && { caseStudyUrl: data.caseStudyUrl || null }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.published !== undefined && { published: data.published }),
        ...(data.displayOrder !== undefined && { displayOrder: data.displayOrder }),
        ...(data.completedAt !== undefined && { completedAt: data.completedAt ? new Date(data.completedAt) : null }),
      },
    });

    if (data.technologyIds !== undefined) {
      await tx.projectTechnology.deleteMany({ where: { projectId } });
      if (data.technologyIds.length > 0) {
        await tx.projectTechnology.createMany({
          data: data.technologyIds.map((technologyId) => ({ projectId, technologyId })),
        });
      }
    }

    if (data.categoryIds !== undefined) {
      await tx.projectCategory.deleteMany({ where: { projectId } });
      if (data.categoryIds.length > 0) {
        await tx.projectCategory.createMany({
          data: data.categoryIds.map((categoryId) => ({ projectId, categoryId })),
        });
      }
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${projectId}`);
  redirect(`/admin/projects/${projectId}/edit`);
}

export async function deleteProjectAction(projectId: string) {
  await prisma.project.delete({ where: { id: projectId } });
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
}

export async function toggleProjectPublishedAction(projectId: string, published: boolean) {
  await prisma.project.update({
    where: { id: projectId },
    data: { published },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
}

export async function toggleProjectFeaturedAction(projectId: string, featured: boolean) {
  await prisma.project.update({
    where: { id: projectId },
    data: { featured },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/projects");
}
