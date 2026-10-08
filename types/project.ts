export type Technology = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  color: string | null;
};

export type ProjectImage = {
  id: string;
  url: string;
  alt: string | null;
  caption: string | null;
  displayOrder: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Project = {
  id: string;

  title: string;
  slug: string;

  shortDescription: string | null;
  description: string;

  coverImage: string | null;

  liveUrl: string | null;
  githubUrl: string | null;
  caseStudyUrl: string | null;

  featured: boolean;
  published: boolean;

  displayOrder: number;

  completedAt: string | null;

  createdAt: string;
  updatedAt: string;

  images: ProjectImage[];

  technologies: {
    projectId: string;
    technologyId: string;
    technology: Technology;
  }[];

  categories: {
    projectId: string;
    categoryId: string;
    category: Category;
  }[];
};