import Link from "next/link";
import {
  ArrowUpRight,
  FolderKanban,
  Layers3,
  Plus,
  Sparkles,
  Star,
} from "lucide-react";

import { getAdminProjects } from "@/lib/queries/projects";

export default async function AdminDashboardPage() {
  const { items, totalCount } = await getAdminProjects({ page: 1, pageSize: 5 });

  const publishedProjects = items.filter((project) => project.published).length;
  const draftProjects = items.filter((project) => !project.published).length;
  const featuredProjects = items.filter((project) => project.featured).length;

  const stats = [
    {
      label: "Total projects",
      value: totalCount,
      change: "+12% this month",
      icon: Layers3,
      accent: "from-sky-500/20 via-sky-500/5 to-transparent",
    },
    {
      label: "Published",
      value: publishedProjects,
      change: "+4 live launches",
      icon: FolderKanban,
      accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    },
    {
      label: "Drafts",
      value: draftProjects,
      change: "2 in review",
      icon: Sparkles,
      accent: "from-violet-500/20 via-violet-500/5 to-transparent",
    },
    {
      label: "Featured",
      value: featuredProjects,
      change: "Top picks",
      icon: Star,
      accent: "from-amber-500/20 via-amber-500/5 to-transparent",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/80 p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.5)] backdrop-blur-sm sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-sky-400">Overview</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Admin dashboard</h2>
          </div>

          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
          >
            <Plus size={16} />
            Add new project
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, change, icon: Icon, accent }) => (
            <div
              key={label}
              className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{value}</p>
                </div>
                <div className="flex size-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-sky-300">
                  <Icon size={18} />
                </div>
              </div>
              <div className="relative mt-4 flex items-center gap-2 text-xs text-slate-300">
                <ArrowUpRight size={14} className="text-emerald-400" />
                {change}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/80 p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.5)] sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Portfolio</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Recent projects</h3>
            </div>
            <Link href="/admin/projects" className="text-sm font-medium text-sky-400 hover:text-sky-300">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {items.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 p-4 text-sm text-slate-400">
                No projects yet.
              </p>
            ) : (
              items.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{project.title}</p>
                    <p className="mt-1 text-sm text-slate-400">/{project.slug}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-200">
                      {project.published ? "Published" : "Draft"}
                    </span>
                    {project.featured ? (
                      <span className="rounded-full border border-amber-500/50 bg-amber-500/10 px-2.5 py-1 text-amber-200">
                        Featured
                      </span>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/80 p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.5)] sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">Health</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Workflow status</h3>
          </div>

          <div className="space-y-5">
            {[
              { label: "Publishing pipeline", value: 82, color: "bg-sky-500" },
              { label: "SEO & metadata", value: 68, color: "bg-violet-500" },
              { label: "Gallery assets", value: 91, color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="font-medium text-white">{item.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
            <p className="text-sm text-slate-400">Quick actions</p>
            <div className="mt-3 space-y-2 text-sm text-slate-200">
              <Link href="/admin/projects/new" className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 hover:border-sky-500/50 hover:text-white">
                New project
                <ArrowUpRight size={14} className="text-sky-400" />
              </Link>
              <Link href="/admin/projects" className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 hover:border-sky-500/50 hover:text-white">
                Review projects
                <ArrowUpRight size={14} className="text-sky-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
