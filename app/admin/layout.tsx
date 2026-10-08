import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8">
        <aside className="hidden w-72 shrink-0 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 lg:block">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.24em] text-sky-400">Portfolio admin</p>
            <h1 className="mt-3 text-2xl font-semibold text-white">Control Center</h1>
          </div>

          <nav className="space-y-2 text-sm text-slate-300">
            <Link
              href="/admin"
              className="flex items-center rounded-xl px-3 py-2 transition hover:bg-slate-800 hover:text-white"
            >
              Overview
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center rounded-xl px-3 py-2 transition hover:bg-slate-800 hover:text-white"
            >
              Projects
            </Link>
            <Link
              href="/admin/projects/new"
              className="flex items-center rounded-xl px-3 py-2 transition hover:bg-slate-800 hover:text-white"
            >
              New project
            </Link>
          </nav>
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
