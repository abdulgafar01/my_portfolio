"use client";

import { useProjects } from "@/hooks/use-projects";

export function Projects() {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useProjects();

  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  if (isError) {
    return (
      <p>
        {error instanceof Error
          ? error.message
          : "Something went wrong"}
      </p>
    );
  }

  if (!projects?.length) {
    return <p>No projects found.</p>;
  }

  return (
    <section>
      {projects.map((project) => (
        <article key={project.id}>
          <h2>{project.title}</h2>

          <p>
            {project.shortDescription}
          </p>

          <div>
            {project.technologies.map(
              ({ technology }) => (
                <span key={technology.id}>
                  {technology.name}
                </span>
              )
            )}
          </div>
        </article>
      ))}
    </section>
  );
}