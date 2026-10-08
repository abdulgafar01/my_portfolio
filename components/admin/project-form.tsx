"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { Category, Project, Technology } from "@/types/project";

type ProjectFormProps = {
  categories: Category[];
  technologies: Technology[];
  project?: Project;
};

const emptyProjectState = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  coverImage: "",
  liveUrl: "",
  githubUrl: "",
  caseStudyUrl: "",
  featured: false,
  published: true,
  displayOrder: 0,
  completedAt: "",
  technologyIds: [] as string[],
  categoryIds: [] as string[],
};

export function ProjectForm({ categories, technologies, project }: ProjectFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialValues = useMemo(() => {
    if (!project) {
      return emptyProjectState;
    }

    return {
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription ?? "",
      description: project.description,
      coverImage: project.coverImage ?? "",
      liveUrl: project.liveUrl ?? "",
      githubUrl: project.githubUrl ?? "",
      caseStudyUrl: project.caseStudyUrl ?? "",
      featured: project.featured,
      published: project.published,
      displayOrder: project.displayOrder,
      completedAt: project.completedAt ? project.completedAt.slice(0, 10) : "",
      technologyIds: project.technologies.map(({ technology }) => technology.id),
      categoryIds: project.categories.map(({ category }) => category.id),
    };
  }, [project]);

  const [formValues, setFormValues] = useState(initialValues);

  const updateField = (field: keyof typeof emptyProjectState, value: string | boolean | number | string[]) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formValues,
        technologyIds: formValues.technologyIds,
        categoryIds: formValues.categoryIds,
      };

      const response = await fetch(project ? `/api/projects/${project.id}` : "/api/projects", {
        method: project ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to save project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          <span>Title</span>
          <input
            value={formValues.title}
            onChange={(event) => updateField("title", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none ring-0 placeholder:text-slate-400 focus:border-sky-400"
            placeholder="Project title"
            required
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span>Slug</span>
          <input
            value={formValues.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none placeholder:text-slate-400 focus:border-sky-400"
            placeholder="project-slug"
            required
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-200">
        <span>Short description</span>
        <textarea
          value={formValues.shortDescription}
          onChange={(event) => updateField("shortDescription", event.target.value)}
          className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none placeholder:text-slate-400 focus:border-sky-400"
          placeholder="A concise summary..."
        />
      </label>

      <label className="space-y-2 text-sm text-slate-200">
        <span>Description</span>
        <textarea
          value={formValues.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="min-h-40 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none placeholder:text-slate-400 focus:border-sky-400"
          placeholder="Write the full project overview..."
          required
        />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          <span>Cover image URL</span>
          <input
            value={formValues.coverImage}
            onChange={(event) => updateField("coverImage", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none placeholder:text-slate-400 focus:border-sky-400"
            placeholder="https://..."
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span>Completion date</span>
          <input
            type="date"
            value={formValues.completedAt}
            onChange={(event) => updateField("completedAt", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none focus:border-sky-400"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-200">
          <span>Live URL</span>
          <input
            value={formValues.liveUrl}
            onChange={(event) => updateField("liveUrl", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none placeholder:text-slate-400 focus:border-sky-400"
            placeholder="https://"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span>GitHub URL</span>
          <input
            value={formValues.githubUrl}
            onChange={(event) => updateField("githubUrl", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none placeholder:text-slate-400 focus:border-sky-400"
            placeholder="https://"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span>Case study URL</span>
          <input
            value={formValues.caseStudyUrl}
            onChange={(event) => updateField("caseStudyUrl", event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none placeholder:text-slate-400 focus:border-sky-400"
            placeholder="https://"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-200">
          <span>Display order</span>
          <input
            type="number"
            min={0}
            value={formValues.displayOrder}
            onChange={(event) => updateField("displayOrder", Number(event.target.value || 0))}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none focus:border-sky-400"
          />
        </label>

        <label className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-200">
          <span>Featured</span>
          <input
            type="checkbox"
            checked={formValues.featured}
            onChange={(event) => updateField("featured", event.target.checked)}
            className="h-4 w-4"
          />
        </label>

        <label className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm text-slate-200">
          <span>Published</span>
          <input
            type="checkbox"
            checked={formValues.published}
            onChange={(event) => updateField("published", event.target.checked)}
            className="h-4 w-4"
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          <span>Technologies</span>
          <select
            multiple
            value={formValues.technologyIds}
            onChange={(event) => {
              const next = Array.from(event.target.selectedOptions, (option) => option.value);
              updateField("technologyIds", next);
            }}
            className="min-h-36 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none focus:border-sky-400"
          >
            {technologies.map((technology) => (
              <option key={technology.id} value={technology.id}>
                {technology.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span>Categories</span>
          <select
            multiple
            value={formValues.categoryIds}
            onChange={(event) => {
              const next = Array.from(event.target.selectedOptions, (option) => option.value);
              updateField("categoryIds", next);
            }}
            className="min-h-36 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none focus:border-sky-400"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : project ? "Update project" : "Create project"}
        </button>
      </div>
    </form>
  );
}
