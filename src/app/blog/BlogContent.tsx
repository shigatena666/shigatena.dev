"use client";

import { Column, Flex, Heading, LetterFx, Input, Icon, Select } from "@/once-ui/components";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { blog, newsletter } from "@/app/resources/content";
import { useState, useMemo } from "react";

interface BlogContentProps {
  posts: any[];
}

export function BlogContent({ posts }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  // Extract unique tags from posts
  const tags = useMemo(() => {
    const uniqueTags = new Set<string>();
    posts.forEach((post) => {
      if (post.metadata.tag) {
        uniqueTags.add(post.metadata.tag);
      }
    });
    return [
      { label: "None", value: "" },
      ...Array.from(uniqueTags).map((tag) => ({
        label: tag,
        value: tag,
      }))
    ];
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = !searchQuery || 
        post.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.metadata.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.metadata.tag?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = !selectedTag || post.metadata.tag === selectedTag;
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <>
      <Heading marginBottom="l" variant="display-strong-s">
        <LetterFx speed="slow" trigger="instant">
          {blog.title}
        </LetterFx>
      </Heading>
      <Flex horizontal="center" marginBottom="l" gap="m">
        <Column fillWidth>
          <Input
            id="search"
            label="Search articles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            hasPrefix={<Icon name="search" size="xs" />}
          />
        </Column>
        <Column width={20}>
          <Select
            id="tag"
            label="Filter by tag"
            options={tags}
            value={selectedTag}
            onSelect={setSelectedTag}
            emptyState="No tags available"
          />
        </Column>
      </Flex>
      <Flex horizontal="center">
        <Column fillWidth>
          <Posts 
            thumbnail 
            type="blog" 
            searchQuery={searchQuery}
            posts={filteredPosts}
            columns="2"
          />
        </Column>
      </Flex>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </>
  );
} 