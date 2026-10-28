"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { uploadProjectImage } from "@/lib/api/uploads";
import { generateProjectSlug } from "@/lib/utils";
import type { Category, Project, Technology } from "@/types/project";

type GalleryImage = {
  id?: string;
  url: string;
  alt: string;
  caption: string;
  displayOrder: number;
};

type ProjectFormValues = {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  liveUrl: string;
  githubUrl: string;
  caseStudyUrl: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  completedAt: string;
  technologyIds: string[];
  categoryIds: string[];
  images: GalleryImage[];
};

type ProjectFormProps = {
  categories: Category[];
  technologies: Technology[];
  project?: Project;
};

const emptyProjectState: ProjectFormValues = {
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
  technologyIds: [],
  categoryIds: [],
  images: [],
};

export function ProjectForm({ categories, technologies, project }: ProjectFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [hasManuallyEditedSlug, setHasManuallyEditedSlug] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialValues = useMemo<ProjectFormValues>(() => {
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
      images: project.images.map((image) => ({
        id: image.id,
        url: image.url,
        alt: image.alt ?? "",
        caption: image.caption ?? "",
        displayOrder: image.displayOrder,
      })),
    };
  }, [project]);

  const [formValues, setFormValues] = useState<ProjectFormValues>(() => initialValues);

  const updateField = <K extends keyof ProjectFormValues>(field: K, value: ProjectFormValues[K]) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const handleTitleChange = (value: string) => {
    updateField("title", value);

    if (!project && !hasManuallyEditedSlug) {
      updateField("slug", generateProjectSlug(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setHasManuallyEditedSlug(true);
    updateField("slug", generateProjectSlug(value));
  };

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setCoverUploading(true);
      setError(null);
      const uploadedImage = await uploadProjectImage(file);
      updateField("coverImage", uploadedImage.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload cover image");
    } finally {
      setCoverUploading(false);
      event.target.value = "";
    }
  };

  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      return;
    }

    try {
      setGalleryUploading(true);
      setError(null);

      const uploadedImages = await Promise.all(
        files.map(async (file) => {
          const uploadedImage = await uploadProjectImage(file);
          return {
            url: uploadedImage.url,
            alt: "",
            caption: "",
            displayOrder: formValues.images.length,
          } satisfies GalleryImage;
        }),
      );

      setFormValues((current) => ({
        ...current,
        images: [
          ...current.images,
          ...uploadedImages.map((image, index) => ({
            ...image,
            displayOrder: current.images.length + index,
          })),
        ],
      }));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload gallery images");
    } finally {
      setGalleryUploading(false);
      event.target.value = "";
    }
  };

  const updateGalleryImage = (index: number, field: keyof Omit<GalleryImage, "id" | "displayOrder">, value: string) => {
    setFormValues((current) => ({
      ...current,
      images: current.images.map((image, imageIndex) =>
        imageIndex === index ? { ...image, [field]: value } : image,
      ),
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormValues((current) => ({
      ...current,
      images: current.images.filter((_, imageIndex) => imageIndex !== index).map((image, imageIndex) => ({
        ...image,
        displayOrder: imageIndex,
      })),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        ...formValues,
        coverImage: formValues.coverImage.trim() || "",
        liveUrl: formValues.liveUrl.trim() || "",
        githubUrl: formValues.githubUrl.trim() || "",
        caseStudyUrl: formValues.caseStudyUrl.trim() || "",
        completedAt: formValues.completedAt || undefined,
        images: formValues.images.map(({ url, alt, caption, displayOrder }) => ({
          url,
          alt: alt || undefined,
          caption: caption || undefined,
          displayOrder,
        })),
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
            onChange={(event) => handleTitleChange(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-slate-50 outline-none ring-0 placeholder:text-slate-400 focus:border-sky-400"
            placeholder="Project title"
            required
          />
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span>Slug</span>
          <input
            value={formValues.slug}
            onChange={(event) => handleSlugChange(event.target.value)}
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

      <div className="space-y-2 text-sm text-slate-200">
        <span>Upload cover image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverUpload}
          disabled={coverUploading}
          className="block w-full cursor-pointer rounded-xl border border-dashed border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-500 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-950"
        />
        <span className="text-xs text-slate-400">{coverUploading ? "Uploading..." : "PNG, JPG, WebP, AVIF up to 5MB"}</span>
      </div>

      {formValues.coverImage ? (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
          <img src={formValues.coverImage} alt="Project cover preview" className="h-48 w-full object-cover" />
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
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

      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-medium text-white">Gallery images</h3>
            <p className="text-sm text-slate-400">Optional screenshots for the project.</p>
          </div>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-sky-500/60 bg-sky-500/10 px-3 py-2 text-sm font-medium text-sky-200">
            <span>{galleryUploading ? "Uploading..." : "Add images"}</span>
            <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} disabled={galleryUploading} className="hidden" />
          </label>
        </div>

        {formValues.images.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {formValues.images.map((image, index) => (
              <div key={`${image.url}-${index}`} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80">
                <img src={image.url} alt={image.alt || `Project gallery ${index + 1}`} className="h-40 w-full object-cover" />
                <div className="space-y-3 p-3">
                  <div className="space-y-2 text-sm text-slate-200">
                    <label className="block">
                      <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Alt text</span>
                      <input
                        value={image.alt}
                        onChange={(event) => updateGalleryImage(index, "alt", event.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-slate-50 outline-none focus:border-sky-400"
                        placeholder="Describe the image"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Caption</span>
                      <input
                        value={image.caption}
                        onChange={(event) => updateGalleryImage(index, "caption", event.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-slate-50 outline-none focus:border-sky-400"
                        placeholder="Optional caption"
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="w-full rounded-lg border border-red-500/60 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200"
                  >
                    Remove image
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-400">
            No additional images yet.
          </div>
        )}
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
