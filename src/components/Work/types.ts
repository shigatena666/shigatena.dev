export interface ProjectsProps {
  range?: [number, number?];
}

export interface ProjectMetadata {
  publishedAt: string;
  title: string;
  summary: string;
  images: string[];
  team?: Array<{
    avatar: string;
  }>;
  link?: string;
}

export interface Project {
  slug: string;
  metadata: ProjectMetadata;
  content: string;
} 