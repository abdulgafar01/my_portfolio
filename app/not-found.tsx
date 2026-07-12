'use client';

import Link from 'next/link';
import { ArrowLeft, Home, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_28%),linear-gradient(135deg,#06070b_0%,#0f172a_45%,#111827_100%)] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[48px_48px] mask-[linear-gradient(180deg,rgba(0,0,0,0.9),rgba(0,0,0,0.2))]" />

      <div className="absolute left-[-8%] top-[-10%] h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-6%] h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <section className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-[0_20px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-medium text-white/80">
                <SearchX className="h-4 w-4" />
                <span>404 • Page not found</span>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300/90">
                  Lost in the interface
                </p>
                <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                  Something slipped away.
                </h1>
                <p className="max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                  The page you were looking for doesn&apos;t exist, was moved, or is temporarily unavailable. Let&apos;s get you back to something useful.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Home className="h-4 w-4" />
                  Back to home
                </Link>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/15"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go back
                </button>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">Design-led experience</span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">Built with care</span>
            </div>
          </div>

          <div className="relative flex items-center justify-center border-t border-white/10  p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_55%)]" />
            <div className="relative w-full max-w-md  p-6 ">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>System status</span>
                <span>ERR 404</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="text-8xl font-black flex items-center justify-center leading-none text-white sm:text-9xl">404</div>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span>Requested route</span>
                    <span className="font-medium text-slate-100">Missing</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span>Suggested action</span>
                    <span className="font-medium text-slate-100">Redirect home</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
