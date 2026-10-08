import type { Project } from "@/types/project";
import type { CreateProjectInput } from "@/lib/validations/project";

export async function getProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}


export async function createProject(input: CreateProjectInput) {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const result: {
    success: boolean;
    message: string;
    data?: unknown;
  } = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to create project");
  }

  return result;
}