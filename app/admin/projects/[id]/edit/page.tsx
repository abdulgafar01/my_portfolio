import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/project-form";
import { getCategories, getProjectById, getTechnologies } from "@/lib/queries/projects";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project, categories, technologies] = await Promise.all([
    getProjectById(id),
    getCategories(),
    getTechnologies(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
        <p className="text-sm uppercase tracking-[0.2em] text-sky-400">Update</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Edit project</h2>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
        <ProjectForm project={project} categories={categories} technologies={technologies} />
      </div>
    </div>
  );
}
