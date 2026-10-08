import Link from "next/link";

import { getAdminProjects } from "@/lib/queries/projects";

export default async function AdminDashboardPage() {
  const { items, totalCount } = await getAdminProjects({ page: 1, pageSize: 5 });

  const publishedProjects = items.filter((project) => project.published).length;
  const draftProjects = items.filter((project) => !project.published).length;
  const featuredProjects = items.filter((project) => project.featured).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-400">Overview</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Admin dashboard</h2>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
        >
          Add new project
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total projects", value: totalCount },
          { label: "Published", value: publishedProjects },
          { label: "Draft", value: draftProjects },
          { label: "Featured", value: featuredProjects },
        ].map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
            <p className="text-sm text-slate-400">{metric.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-lg font-medium text-white">Recent projects</h3>
          <Link href="/admin/projects" className="text-sm text-sky-400 hover:text-sky-300">
            View all
          </Link>
        </div>

        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-slate-400">No projects yet.</p>
          ) : (
            items.map((project) => (
              <div
                key={project.id}
                className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-white">{project.title}</p>
                  <p className="text-sm text-slate-400">{project.slug}</p>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="rounded-full border border-slate-700 px-2 py-1 text-slate-200">
                    {project.published ? "Published" : "Draft"}
                  </span>
                  {project.featured ? (
                    <span className="rounded-full border border-amber-500/50 bg-amber-500/10 px-2 py-1 text-amber-200">
                      Featured
                    </span>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
