import { Column, Flex, Heading, Text } from "@/once-ui/components";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/BlogContent/subcomponents/Posts";
import { getPosts } from "@/app/utils/utils";
import { baseURL } from "@/app/resources";
import { blog, person, newsletter } from "@/app/resources/content";

export async function generateMetadata() {
  const title = blog.title;
  const description = blog.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/blog`,
      images: [
        {
          url: ogImage,
          alt: title,
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

export default function Blog() {
  const documentationPosts = getPosts(["src", "content", "documentation", "posts"]);

  return (
    <Column maxWidth="s">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: blog.title,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1}>
        {documentationPosts.length > 0 ? (
          <>
            <Posts range={[1, 3]} thumbnail type="documentation" posts={documentationPosts} />
            <Posts range={[4]} columns="2" type="documentation" posts={documentationPosts} />
          </>
        ) : (
          <Text variant="body-default-m" onBackground="neutral-medium">
            No documentation posts available yet. Please check back later.
          </Text>
        )}
      </Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
