import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

function serializeProject<T extends {
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}>(project: T) {
  return {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    completedAt: project.completedAt ? project.completedAt.toISOString() : null,
  };
}

export type ProjectListParams = {
  search?: string;
  status?: "all" | "published" | "draft";
  featured?: "all" | "featured" | "non-featured";
  categoryId?: string;
  technologyId?: string;
  sort?: "updated-desc" | "updated-asc" | "created-desc" | "created-asc" | "title-asc" | "display-order";
  page?: number;
  pageSize?: number;
};

export async function getAdminProjects(params: ProjectListParams = {}) {
  const page = Math.max(1, Number(params.page ?? 1));
  const pageSize = Math.min(50, Math.max(1, Number(params.pageSize ?? 10)));
  const search = params.search?.trim();

  const where: Prisma.ProjectWhereInput = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { slug: { contains: search, mode: "insensitive" } },
    ];
  }

  if (params.status && params.status !== "all") {
    where.published = params.status === "published";
  }

  if (params.featured && params.featured !== "all") {
    where.featured = params.featured === "featured";
  }

  if (params.categoryId) {
    where.categories = { some: { categoryId: params.categoryId } };
  }

  if (params.technologyId) {
    where.technologies = { some: { technologyId: params.technologyId } };
  }

  const sortMap: Record<NonNullable<ProjectListParams["sort"]>, Prisma.ProjectOrderByWithRelationInput[]> = {
    "updated-desc": [{ updatedAt: "desc" }],
    "updated-asc": [{ updatedAt: "asc" }],
    "created-desc": [{ createdAt: "desc" }],
    "created-asc": [{ createdAt: "asc" }],
    "title-asc": [{ title: "asc" }],
    "display-order": [{ displayOrder: "asc" }, { createdAt: "desc" }],
  };

  const orderBy = sortMap[params.sort ?? "updated-desc"];

  const [totalCount, rawItems] = await Promise.all([
    prisma.project.count({ where }),
    prisma.project.findMany({
      where,
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        technologies: { include: { technology: true } },
        categories: { include: { category: true } },
      },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  const items = rawItems.map(serializeProject);

  return {
    items,
    totalCount,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
  };
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      technologies: { include: { technology: true } },
      categories: { include: { category: true } },
    },
  });

  return project ? serializeProject(project) : null;
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getTechnologies() {
  return prisma.technology.findMany({
    orderBy: { name: "asc" },
  });
}
