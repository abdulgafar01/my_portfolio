import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectTableActions } from "@/components/admin/project-table-actions";
import { getAdminProjects, getCategories, getTechnologies } from "@/lib/queries/projects";

function toString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const query = toString(params.search) ?? "";
  const status = (toString(params.status) as "all" | "published" | "draft") ?? "all";
  const featured = (toString(params.featured) as "all" | "featured" | "non-featured") ?? "all";
  const categoryId = toString(params.categoryId) ?? "";
  const technologyId = toString(params.technologyId) ?? "";
  const sort = (toString(params.sort) as "updated-desc" | "updated-asc" | "created-desc" | "created-asc" | "title-asc" | "display-order") ?? "updated-desc";

  const [result, categories, technologies] = await Promise.all([
    getAdminProjects({
      search: query,
      status,
      featured,
      categoryId,
      technologyId,
      sort,
      page: 1,
      pageSize: 10,
    }),
    getCategories(),
    getTechnologies(),
  ]);

  if (!result) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-sky-400">Projects</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Manage portfolio projects</h2>
        </div>
        <Link
          href="/admin/projects/new"
          className="rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-sky-400"
        >
          Create project
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
        <form className="grid gap-3 md:grid-cols-5">
          <input
            name="search"
            defaultValue={query}
            placeholder="Search title or slug"
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 outline-none placeholder:text-slate-400"
          />
          <select
            name="status"
            defaultValue={status}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 outline-none"
          >
            <option value="all">All status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            name="featured"
            defaultValue={featured}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 outline-none"
          >
            <option value="all">All features</option>
            <option value="featured">Featured only</option>
            <option value="non-featured">Non-featured</option>
          </select>
          <select
            name="categoryId"
            defaultValue={categoryId}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 outline-none"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="technologyId"
            defaultValue={technologyId}
            className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 outline-none"
          >
            <option value="">All technologies</option>
            {technologies.map((technology) => (
              <option key={technology.id} value={technology.id}>
                {technology.name}
              </option>
            ))}
          </select>
          <div className="md:col-span-5 flex justify-end gap-3">
            <button
              type="reset"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400"
            >
              Apply filters
            </button>
          </div>
        </form>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-200">
            <thead className="bg-slate-950/80 text-xs uppercase tracking-[0.1em] text-slate-400">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {result.items.map((project) => (
                <tr key={project.id} className="hover:bg-slate-950/40">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-white">{project.title}</p>
                      <p className="text-xs text-slate-400">{project.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-200">
                      {project.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {project.featured ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <ProjectTableActions projectId={project.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {result.items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center text-slate-300">
          No projects match the current filters.
        </div>
      ) : null}
    </div>
  );
}
