import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .url("Enter a valid URL.")
  .optional()
  .or(z.literal(""));

export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must contain at least 2 characters.")
    .max(120, "Title cannot exceed 120 characters."),

  slug: z
    .string()
    .trim()
    .min(2, "Slug must contain at least 2 characters.")
    .max(150)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers, and hyphens only."
    ),

  shortDescription: z
    .string()
    .trim()
    .max(250)
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters.")
    .max(10000),

  coverImage: optionalUrl,

  liveUrl: optionalUrl,
  githubUrl: optionalUrl,
  caseStudyUrl: optionalUrl,

  featured: z.boolean().default(false),
  published: z.boolean().default(false),

  displayOrder: z.number().int().min(0).default(0),

  completedAt: z.iso.datetime().optional().nullable(),

  // Technology names, e.g. ["Next.js", "TypeScript"]
//   technologies: z
//     .array(z.string().trim().min(1).max(60))
//     .max(30)
//     .default([]),
 technologyIds: z.array(z.cuid()).max(30).optional().default([]),

 
 // Category names, e.g. ["Full Stack", "SaaS"]
 categoryIds: z.array(z.cuid()).max(10).optional().default([]),
//   categories: z
//     .array(z.string().trim().min(1).max(60))
//     .max(10)
//     .default([]),

  // Additional screenshots and gallery images
  images: z
    .array(
      z.object({
        url: z.string().trim().url(),
        alt: z.string().trim().max(200).optional(),
        caption: z.string().trim().max(250).optional(),
        displayOrder: z.number().int().min(0).default(0),
      })
    )
    .max(20)
    .default([]),
});

export type CreateProjectInput = z.infer<
  typeof createProjectSchema
>;