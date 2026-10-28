"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, Gauge, Plus } from "lucide-react";

function isNavItemActive(href: string, pathname: string) {
  if (pathname === href) return true;

  if (href === "/admin") {
    return false;
  }

  if (href === "/admin/projects") {
    return pathname.startsWith("/admin/projects/") && pathname !== "/admin/projects/new";
  }

  if (href === "/admin/projects/new") {
    return pathname === "/admin/projects/new" || pathname.startsWith("/admin/projects/new/");
  }

  return false;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navItems = [
    { href: "/admin", label: "Overview", icon: Gauge },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/projects/new", label: "New project", icon: Plus },
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-slate-50">
      <div className="mx-auto max-w-[1500px] px-4 py-6 lg:px-8">
        <div className="flex gap-6">
          <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 flex-col rounded-[28px] border border-slate-800/80 bg-slate-900/80 p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.5)] backdrop-blur-sm lg:flex">
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-sky-500/15 text-sm font-semibold text-sky-300 ring-1 ring-inset ring-sky-400/30">
                  P
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-sky-400">Portfolio</p>
                  <p className="mt-1 text-sm text-slate-300">Control Center</p>
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = isNavItemActive(href, pathname ?? "");

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-sky-500/10 text-white ring-1 ring-inset ring-sky-400/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Icon size={16} className={active ? "text-sky-300" : "text-slate-400"} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Workspace</p>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-200">
                <span>Active projects</span>
                <span className="font-semibold text-white">12</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" />
              </div>
              <p className="mt-3 text-xs text-slate-400">Updated 2 hours ago</p>
            </div>
          </aside>

          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
