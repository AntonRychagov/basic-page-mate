import { siteContent } from '@/data/siteContent';
import type { Project } from '@/types';

export const projects: Project[] = siteContent.projects as Project[];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter((project) => project.category === category);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.slice(0, 4);
};

export const getProjectYears = (): string[] => {
  return Array.from(new Set(projects.map((project) => project.year))).sort((left, right) => Number(right) - Number(left));
};

export const getProjectsByYear = (year: string): Project[] => {
  if (year === 'all') return projects;
  return projects.filter((project) => project.year === year);
};

export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  };
};

export const getCategoryLabel = (category: string): string => {
  return siteContent.categoryLabels[category as keyof typeof siteContent.categoryLabels] || category;
};
