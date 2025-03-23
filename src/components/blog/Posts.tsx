import { Grid } from "@/once-ui/components";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  type?: "blog" | "documentation";
  searchQuery?: string;
  selectedTag?: string;
  posts: any[];
}

export function Posts({ 
  range, 
  columns = "1", 
  thumbnail = false, 
  type = "blog", 
  searchQuery = "", 
  selectedTag = "",
  posts = []
}: PostsProps) {
  const sortedBlogs = Array.isArray(posts) ? [...posts].sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  }) : [];

  const filteredBlogs = sortedBlogs.filter((post) => {
    const matchesSearch = !searchQuery || 
      post.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.metadata.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.metadata.tag?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = !selectedTag || post.metadata.tag === selectedTag;
    
    return matchesSearch && matchesTag;
  });

  const displayedBlogs = range
    ? filteredBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : filteredBlogs.length)
    : filteredBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid 
          columns="2" 
          mobileColumns="1" 
          fillWidth 
          marginBottom="40" 
          gap="m"
        >
          {displayedBlogs.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} />
          ))}
        </Grid>
      )}
    </>
  );
}
