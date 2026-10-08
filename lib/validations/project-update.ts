
import { z } from "zod";

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

    coverImage: z.string().trim().max(2048).nullable().optional(),

    liveUrl: z.string().url().nullable().optional(),
    githubUrl: z.string().url().nullable().optional(),
    caseStudyUrl: z.string().url().nullable().optional(),

    featured: z.boolean().optional(),
    published: z.boolean().optional(),

    displayOrder: z.number().int().min(0).optional(),

    completedAt: z.string().datetime().nullable().optional(),

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