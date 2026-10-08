
"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createProject } from "@/lib/api/projects";
import type { CreateProjectInput } from "@/lib/validations/project";

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateProjectInput) =>
      createProject(input),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}