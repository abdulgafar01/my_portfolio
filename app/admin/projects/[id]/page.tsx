import Link from "next/link";
import { notFound } from "next/navigation";

import { getProjectById } from "@/lib/queries/projects";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-sky-400">Preview</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{project.title}</h2>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/admin/projects/${project.id}/edit`}
              className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-100 hover:border-sky-400"
            >
              Edit
            </Link>
            <Link href="/admin/projects" className="rounded-xl bg-sky-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400">
              Back to list
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
          <p className="text-slate-400">{project.shortDescription || "No short description provided."}</p>
          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-200">{project.description}</p>
          </div>
        </article>

        <aside className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 text-sm text-slate-200">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</p>
            <p className="mt-2">{project.published ? "Published" : "Draft"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Featured</p>
            <p className="mt-2">{project.featured ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Slug</p>
            <p className="mt-2">{project.slug}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Links</p>
            <div className="mt-2 space-y-1 text-sky-300">
              {project.liveUrl ? <a href={project.liveUrl}>{project.liveUrl}</a> : <span className="text-slate-500">No live URL</span>}
              {project.githubUrl ? <a href={project.githubUrl}>{project.githubUrl}</a> : null}
              {project.caseStudyUrl ? <a href={project.caseStudyUrl}>{project.caseStudyUrl}</a> : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
