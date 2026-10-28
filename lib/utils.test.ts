import assert from "node:assert/strict";
import test from "node:test";

import { createProjectSchema } from "./validations/project";
import { updateProjectSchema } from "./validations/project-update";
import { generateProjectSlug } from "./utils";

test("generateProjectSlug creates a valid slug from a title", () => {
  assert.equal(generateProjectSlug("My Portfolio v2"), "my-portfolio-v2");
  assert.equal(generateProjectSlug("  Launch & Scale 2026!  "), "launch-scale-2026");
  assert.equal(generateProjectSlug("Café / Dashboard"), "cafe-dashboard");
});

test("project schemas accept date-only completedAt values from the form", () => {
  const payload = {
    title: "Launch app",
    slug: "launch-app",
    description: "This is a real project description.",
    coverImage: "https://example.com/cover.jpg",
    completedAt: "2026-10-28",
    technologyIds: [],
    categoryIds: [],
    images: [],
  };

  const createResult = createProjectSchema.safeParse(payload);
  assert.equal(createResult.success, true, createResult.error?.format()._errors?.join(", ") ?? "");

  const updateResult = updateProjectSchema.safeParse({ completedAt: "2026-10-28" });
  assert.equal(updateResult.success, true, updateResult.error?.format()._errors?.join(", ") ?? "");
});
