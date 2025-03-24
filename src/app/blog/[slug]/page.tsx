import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import { AvatarGroup, Badge, Button, Column, Heading, Row, SmartImage, Text } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import { ScrollToHash } from "@/components/ScrollToHash";
import { TableOfContents } from "@/components/TableOfContents";
import { useMemo } from "react";
import Link from "next/link";

interface BlogParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "content", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params: { slug } }: BlogParams) {
  let post = getPosts(["src", "content", "blog", "posts"]).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    team,
  } = post.metadata;
  let ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const extractHeadings = (content: string) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const matches = [...content.matchAll(headingRegex)];
  return matches.map((match) => ({
    level: match[1].length,
    text: match[2],
    id: match[2].toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));
};

export default function Blog({ params }: BlogParams) {
  let post = getPosts(["src", "content", "blog", "posts"]).find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  const headings = useMemo(() => extractHeadings(post.content), [post.content]);

  return (
    <Column maxWidth="m" gap="xl">
      <Link href="/blog" style={{ textDecoration: 'none' }}>
        <Button 
          variant="secondary" 
          size="s"
          data-surface="translucent"
        >
          ← Back to Blog Posts
        </Button>
      </Link>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            author: post.metadata.team?.map((person) => ({
              "@type": "Person",
              name: person.name,
            })) || [{ "@type": "Person", name: person.name }],
          }),
        }}
      />
      <Column gap="xl">
        {post.metadata.image && (
          <SmartImage
            priority
            aspectRatio="16 / 9"
            radius="m"
            alt="image"
            src={post.metadata.image}
          />
        )}
        <Column gap="l">
          <Column gap="m">
            <Badge
              arrow={false}
              effect={false}
              border="success-alpha-strong"
              background="success-alpha-weak"
              >
              <Text variant="body-default-s" color="neutral-faded">
                {formatDate(post.metadata.publishedAt)}
              </Text>
            </Badge>
            <Heading as="h1" variant="display-strong-l">
              {post.metadata.title}
            </Heading>
            {post.metadata.summary && (
              <Text variant="body-default-l" color="neutral-faded">
                {post.metadata.summary}
              </Text>
            )}
          </Column>
          {avatars.length > 0 && (
            <Row gap="s" vertical="center">
              <AvatarGroup avatars={avatars} size="s" />
              <Text variant="body-default-s" color="neutral">
                {post.metadata.team?.map((person) => person.name).join(", ")}
              </Text>
            </Row>
          )}
        </Column>
        <Column maxWidth="m">
          <ScrollToHash />
          <CustomMDX source={post.content} />
        </Column>
      </Column>
      {headings.length > 0 && (
        <TableOfContents headings={headings} listenToToggle={true} />
      )}
    </Column>
  );
}
