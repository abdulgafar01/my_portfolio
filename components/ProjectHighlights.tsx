"use client";

import { m, type Variants } from "framer-motion";
import { Cobe } from "./cobe-globe";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/[0.08] text-[11px] text-white/70">
      {children}
    </div>
  );
}

/* ---------------- LIGHTHOUSE ---------------- */

function LighthouseCard() {
  return (
    <m.div
      variants={fadeUp}
      className="col-span-12 overflow-hidden rounded-xl border border-white/[0.05] bg-[#181818] p-4 md:col-span-8"
    >
      <div className="mb-3 flex items-center gap-2">
        <IconBox>ϟ</IconBox>

        <h3 className="text-sm font-semibold text-white">
          Lighthouse Performance
        </h3>
      </div>

      <div className="grid gap-2 lg:grid-cols-[1.45fr_.9fr]">
        {/* Website preview */}
        <div className="relative min-h-[285px] overflow-hidden rounded-md border border-white/[0.12] bg-black">
          {/* browser top */}
          <div className="absolute left-0 right-0 top-0 z-10 flex h-6 items-center gap-1 border-b border-white/[0.08] bg-black/80 px-3">
            <span className="h-1 w-1 rounded-full bg-white/70" />
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span className="h-1 w-1 rounded-full bg-white/20" />

            <span className="ml-2 text-[5px] text-white/50">StartUp</span>

            <div className="ml-auto flex gap-3 text-[4px] text-white/40">
              <span>Features</span>
              <span>Contact</span>
              <span>Pricing</span>
            </div>

            <span className="ml-3 rounded bg-white px-2 py-[2px] text-[4px] text-black">
              Book a...
            </span>
          </div>

          {/* hero */}
          <div className="relative h-full overflow-hidden pt-8">
            <div className="absolute -right-20 top-0 h-48 w-72 rotate-[25deg] border-l border-white/10 bg-white/[0.015]" />

            <div className="relative z-10 px-7 pt-5">
              <p className="max-w-[230px] text-[24px] font-bold leading-[.95] tracking-tight text-white">
                Deploy your website
                <br />
                in seconds, not hours.
              </p>

              <p className="mt-3 max-w-[250px] text-[6px] leading-relaxed text-white/40">
                Build, test and deploy your applications with confidence.
              </p>

              <div className="mt-4 flex gap-2">
                <div className="rounded bg-white px-3 py-1 text-[5px] font-medium text-black">
                  Get Started
                </div>
                <div className="rounded border border-white/20 px-3 py-1 text-[5px] text-white/60">
                  Learn More
                </div>
              </div>
            </div>

            {/*  dashboard */}
            <div className="absolute bottom-[-28px] left-8 right-[-20px] h-[145px] rotate-[-2deg] rounded-lg border border-white/10 bg-[#101010] shadow-2xl">
              <div className="flex h-6 items-center border-b border-white/10 px-3">
                <div className="h-1.5 w-14 rounded bg-white/10" />
                <div className="ml-auto flex gap-2">
                  <div className="h-2 w-8 rounded bg-white/10" />
                  <div className="h-2 w-8 rounded bg-white/10" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 p-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 rounded border border-white/[0.06] bg-white/[0.025]"
                  >
                    <div className="m-2 h-1 w-8 rounded bg-white/10" />
                    <div className="mx-2 h-1 w-12 rounded bg-white/[0.05]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lighthouse metrics */}
        <div className="rounded-md border border-white/[0.07] bg-[#141414] p-3">
          <div className="flex gap-3 border-b border-white/[0.06] pb-3 text-[8px] text-white/50">
            <span className="text-white">Performance</span>
            <span>Accessibility</span>
            <span>Best Practices</span>
            <span>SEO</span>
          </div>

          <div className="grid grid-cols-4 gap-2 py-4">
            {[
              ["99", "Performance"],
              ["100", "Accessibility"],
              ["100", "Best Practices"],
              ["100", "SEO"],
            ].map(([score, label]) => (
              <div key={label} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-emerald-400 text-[11px] font-bold text-white">
                  {score}
                </div>

                <p className="mt-1 text-[6px] leading-tight text-white/50">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-md bg-white/[0.025] p-2">
            <p className="mb-2 text-[8px] font-semibold text-white">
              PERFORMANCE METRICS
            </p>

            {[
              ["First Contentful Paint", "0.8s", "Fast"],
              ["Largest Contentful Paint", "1.2s", "Fast"],
              ["Total Blocking Time", "0ms", "Fast"],
              ["Cumulative Layout Shift", "0", "Good"],
              ["Speed Index", "1.4s", "Fast"],
            ].map(([name, value, status]) => (
              <div
                key={name}
                className="flex items-center gap-1 border-b border-white/[0.04] py-1.5 last:border-0"
              >
                <span className="h-1 w-1 rounded-full bg-white/30" />

                <span className="flex-1 text-[6px] text-white/55">
                  {name}
                </span>

                <span className="text-[6px] text-white/60">{value}</span>

                <span className="text-[6px] text-white/40">{status}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-between text-[6px] text-white/30">
            <span>Analysis Complete</span>
            <span>8/17/2026</span>
          </div>
        </div>
      </div>
    </m.div>
  );
}

/* ---------------- DEPLOYMENT ---------------- */

function DeploymentCard() {
  return (
    <m.div
      variants={fadeUp}
      className="col-span-12 rounded-xl border border-white/[0.05] bg-[#181818] p-4 md:col-span-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <IconBox>▷</IconBox>

        <h3 className="text-sm font-semibold text-white">
          Deployment Pipeline
        </h3>
      </div>

      {/* terminal */}
      <div className="h-[116px] overflow-hidden rounded-md border border-white/10 bg-[#111]">
        <div className="flex h-6 items-center gap-1 border-b border-white/10 bg-[#20252b] px-2">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-white/30" />

          <span className="ml-2 text-[7px] text-white/50">terminal</span>
        </div>

        <div className="p-3 font-mono text-[8px] text-white/50">
          <span className="text-white/40">&gt;</span>{" "}
          <span className="text-white">aws</span>
          <span className="animate-pulse">▋</span>
        </div>
      </div>

      {/* pipeline */}
      <div className="mt-4 rounded-lg border border-white/[0.08] bg-[#151515] px-3 py-5">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-3 right-3 top-3 h-px bg-white/30" />

          {[
            ["✓", "Prepare"],
            ["✓", "Build"],
            ["3", "Deploy"],
            ["4", "Live"],
          ].map(([number, label], index) => (
            <div key={label} className="relative z-10 text-center">
              <div
                className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[9px] ${
                  index < 2
                    ? "bg-white text-black"
                    : "bg-[#292929] text-white/40"
                }`}
              >
                {number}
              </div>

              <p className="mt-2 text-[6px] text-white/40">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between text-[7px] text-white/30">
        <span>CI/CD Pipeline</span>
        <span>Automated Deployment</span>
      </div>
    </m.div>
  );
}

/* ---------------- PROJECT STRUCTURE ---------------- */

function ProjectStructureCard() {
  return (
    <m.div
      variants={fadeUp}
      className="col-span-12 rounded-xl border border-white/[0.05] bg-[#181818] p-4 md:col-span-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <IconBox>▤</IconBox>

        <h3 className="text-sm font-semibold text-white">
          Ideal Project Structure
        </h3>
      </div>

      <div className="overflow-hidden rounded-md border border-white/[0.08] bg-[#111]">
        {/* explorer header */}
        <div className="flex h-6 items-center gap-1 border-b border-white/10 px-2">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />

          <span className="ml-4 text-[7px] text-white/30">Explorer</span>

          <span className="ml-auto text-[7px] text-white/20">
            PROJECT_01
          </span>
        </div>

        <div className="h-[194px] overflow-hidden p-3 font-mono text-[7px] leading-[1.9] text-white/50">
          <div>▾ src</div>
          <div className="pl-3">▾ components</div>
          <div className="pl-6">▢ common</div>
          <div className="pl-6">▢ layout</div>
          <div className="pl-6">▢ pages</div>

          <div className="pl-3">▢ lib</div>
          <div className="pl-3">▢ app</div>

          <div className="pl-6">+ layout.tsx</div>
          <div className="pl-6">+ page.tsx</div>
          <div className="pl-6">▢ about</div>
          <div className="pl-6">▢ contact</div>
          <div className="pl-6">▢ projects</div>
        </div>
      </div>

      <div className="mt-2 flex justify-between text-[7px] text-white/30">
        <span>Next.js App</span>
        <span>Optimized for Performance</span>
      </div>
    </m.div>
  );
}

/* ---------------- RESOURCE SCALING ---------------- */

function ResourceScalingCard() {
  return (
    <m.div
      variants={fadeUp}
      className="col-span-12 rounded-xl border border-white/[0.05] bg-[#181818] p-4 md:col-span-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <IconBox>▥</IconBox>

        <h3 className="text-sm font-semibold text-white">
          Resource Scaling
        </h3>
      </div>

      <div className="rounded-md border border-white/[0.08] bg-[#141414] p-3">
        <p className="text-[8px] text-white/50">Resource Usage (24h)</p>

        <div className="relative mt-2 h-[78px] overflow-hidden">
          {/* graph grid */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-px w-full bg-white/[0.05]" />
            ))}
          </div>

          {/* graph */}
          <svg
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="resourceGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity=".35" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0 70 C40 65 50 62 75 50 C100 40 120 55 145 35 C170 15 190 22 215 10 C240 0 270 20 300 45 L300 100 L0 100 Z"
              fill="url(#resourceGradient)"
            />

            <path
              d="M0 70 C40 65 50 62 75 50 C100 40 120 55 145 35 C170 15 190 22 215 10 C240 0 270 20 300 45"
              fill="none"
              stroke="white"
              strokeOpacity=".35"
              strokeWidth="1.5"
            />
          </svg>

          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[6px] text-white/20">
            <span>04:00</span>
            <span>12:00</span>
            <span>16:00</span>
            <span>24:00</span>
          </div>
        </div>
      </div>

      <div className="mt-2 rounded-md border border-white/[0.08] bg-[#141414] p-3">
        <div className="flex justify-between">
          <span className="text-[8px] text-white/50">Active Servers</span>
          <span className="text-[9px] font-semibold text-white">5</span>
        </div>

        <div className="mt-3 grid grid-cols-5 gap-1">
          {[1, 2, 3, 4, 5].map((server) => (
            <div
              key={server}
              className="h-7 rounded-sm border border-white/[0.05] bg-white/[0.04]"
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-between text-[7px] text-white/30">
        <span>Auto-scaling Platform</span>
        <span>Handles Any Load</span>
      </div>
    </m.div>
  );
}

/* ---------------- GLOBAL DEPLOYMENTS ---------------- */

function GlobalDeploymentsCard() {
  const dots = Array.from({ length: 240 });

  return (
    <m.div
      variants={fadeUp}
      className="col-span-12 overflow-hidden rounded-xl border border-white/[0.05] bg-[#181818] p-4 md:col-span-8"
    >
      <div className="mb-3 flex items-center gap-2">
        <IconBox>◎</IconBox>

        <h3 className="text-2xl font-semibold text-white">
          Global Developmet and Deployments 
        </h3>

        <div className="ml-auto flex items-center gap-1 rounded-full border border-white/[0.06] px-2 py-1 text-[6px] text-white/40">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          Live Status
        </div>
      </div>

      <div className="relative h-[245px] overflow-hidden rounded-lg">
        {/* <Globe /> */}
        <Cobe variant="draggable" />

        {/* stats */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {[
            ["1094", "Deployments"],
            ["99.8%", "Uptime"],
            ["8", "Regions"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-md border border-white/[0.06] bg-[#202020] px-2 py-2"
            >
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-[10px] text-white/30">{label}</p>
            </div>
          ))}
        </div>

        <div className="absolute bottom-2 right-2 text-[7px] text-white/30">
          Global Coverage
        </div>
      </div>

      <div className="mt-2 text-[7px] text-white/30">Edge Network</div>
    </m.div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function ProjectHighlights() {
  return (
    <section className="relative overflow-hidden  py-24 text-black-100 dark:text-white">
      {/* outer diagonal pattern */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[11%] lg:block bg-[repeating-linear-gradient(135deg,transparent_0px,transparent_4px,rgba(0,0,0,0.08)_4px,rgba(0,0,0,0.08)_5px)] opacity-70 dark:bg-[repeating-linear-gradient(135deg,transparent_0px,transparent_4px,rgba(255,255,255,0.12)_4px,rgba(255,255,255,0.12)_5px)]"
      />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[11%] opacity-50 lg:block bg-[repeating-linear-gradient(135deg,transparent_0px,transparent_4px,rgba(0,0,0,0.08)_4px,rgba(0,0,0,0.08)_5px)] dark:bg-[repeating-linear-gradient(135deg,transparent_0px,transparent_4px,rgba(255,255,255,0.12)_4px,rgba(255,255,255,0.12)_5px)]"
      />

      {/* main grid */}
      <div className="relative mx-auto max-w-[1100px] px-5">
        <div
          className="absolute inset-0 -z-0 opacity-70 bg-[linear-gradient(rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)]"
        />

        {/* heading */}
        <m.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto mb-10 max-w-2xl text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Projects Highlights
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed dark:text-white/55">
            Explore my designed components, each
            crafted to enhance user experience and functionality.
          </p>
        </m.div>

        {/* bento */}
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 grid grid-cols-12 gap-6"
        >
          <LighthouseCard />
          <DeploymentCard />

          <ProjectStructureCard />
          <GlobalDeploymentsCard />
          {/* <ResourceScalingCard /> */}
        </m.div>
      </div>
    </section>
  );
}