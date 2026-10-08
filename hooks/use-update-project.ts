
"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type { UpdateProjectInput } from "@/lib/validations/project-update";

type UpdateProjectVariables = {
  id: string;
  data: UpdateProjectInput;
};

async function updateProject({
  id,
  data,
}: UpdateProjectVariables) {
  const response = await fetch(`/api/projects/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? "Failed to update project");
  }

  return result.data;
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,

    onSuccess: async (updatedProject) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["project", updatedProject.id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["project", updatedProject.slug],
        }),
      ]);
    },
  });
}