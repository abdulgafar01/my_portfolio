
import { z } from "zod";

const completedAtSchema = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  if (trimmed === "") {
    return undefined;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return new Date(`${trimmed}T00:00:00.000Z`).toISOString();
  }

  return trimmed;
}, z.string().datetime().nullable().optional());

export const updateProjectSchema = z
  .object({
    title: z.string().trim().min(1).max(120).optional(),

    slug: z
      .string()
      .trim()
      .min(1)
      .max(150)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),

    shortDescription: z.string().trim().max(300).nullable().optional(),

    description: z.string().trim().min(1).optional(),

    coverImage: z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
      z.string().trim().max(2048).nullable().optional(),
    ),

    liveUrl: z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
      z.string().url().nullable().optional(),
    ),
    githubUrl: z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
      z.string().url().nullable().optional(),
    ),
    caseStudyUrl: z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
      z.string().url().nullable().optional(),
    ),

    featured: z.boolean().optional(),
    published: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    completedAt: completedAtSchema,

    technologyIds: z.array(z.cuid()).max(30).optional(),
    categoryIds: z.array(z.cuid()).max(10).optional(),

    images: z
      .array(
        z.object({
          url: z.string().url(),
          alt: z.string().trim().max(300).nullable().optional(),
          caption: z.string().trim().max(500).nullable().optional(),
          displayOrder: z.number().int().min(0).optional().default(0),
        }),
      )
      .max(20)
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;