export interface PostMetadata {
  title: string;
  summary?: string;
  publishedAt: string;
  tag?: string;
  image?: string;
  path?: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

export interface PostProps {
  post: Post;
  thumbnail: boolean;
}

export interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  type?: "blog" | "documentation";
  searchQuery?: string;
  selectedTag?: string;
  posts: Post[];
} 