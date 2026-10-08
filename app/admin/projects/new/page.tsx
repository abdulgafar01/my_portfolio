import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/project-form";
import { getCategories, getTechnologies } from "@/lib/queries/projects";

export default async function NewProjectPage() {
  const [categories, technologies] = await Promise.all([getCategories(), getTechnologies()]);

  if (!categories || !technologies) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
        <p className="text-sm uppercase tracking-[0.2em] text-sky-400">Create</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">New project</h2>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
        <ProjectForm categories={categories} technologies={technologies} />
      </div>
    </div>
  );
}
