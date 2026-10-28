"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProjectTableActions({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this project? This action cannot be undone.");

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete project");
      }

      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to delete project");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Link
        href={`/admin/projects/${projectId}`}
        className="rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-200 hover:border-sky-400 hover:text-white"
      >
        View
      </Link>
      <Link
        href={`/admin/projects/${projectId}/edit`}
        className="rounded-lg border border-slate-700 px-2.5 py-1.5 text-xs text-slate-200 hover:border-sky-400 hover:text-white"
      >
        Edit
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-lg border border-red-500/40 bg-red-500/10 px-2.5 py-1.5 text-xs text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
