import React from "react";

import { Heading, Flex, Text, Button, Avatar, Arrow, Column, LetterFx } from "@/once-ui/components";
import { Projects } from "@/components/Work/Projects";
import { Availability } from "@/components/Availability/Availability";
import { getPosts } from "@/app/utils/utils";

import { baseURL, routes } from "@/app/resources";
import { home, person, githubCalendar } from "@/app/resources/content";
import { availability } from "@/app/resources/content";
import { Posts } from "@/components/Blog/Posts";
import { GithubCalendar } from "@/components/GithubUserCard";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
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

export default function Home() {
  const blogPosts = getPosts(["src", "content", "blog", "posts"]);

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}/`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
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
      <Column fillWidth paddingY="l" gap="m">
        <Column maxWidth="s">
          <Heading wrap="balance" variant="display-strong-l">
            <LetterFx speed="slow" trigger="instant">
              {home.headline}
            </LetterFx>
          </Heading>

        </Column>
        <Availability 
            isAvailable={availability.isAvailable}
            availableText={availability.availableText}
            notAvailableText={availability.notAvailableText}
          />
      </Column>

      <Flex fillWidth direction="column" gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              <LetterFx speed="slow" trigger="instant">
                Latest work
              </LetterFx>
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Projects range={[1, 1]} />
          </Flex>
        </Flex>

      {routes["/blog"] && (
        <Flex fillWidth direction="column" gap="24" mobileDirection="column">
          <Flex flex={1} paddingLeft="l">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              <LetterFx speed="slow" trigger="instant">
                Latest from the blog
              </LetterFx>
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" posts={blogPosts} />
          </Flex>
        </Flex>
      )}
      {githubCalendar.display && (
        <Flex fillWidth direction="column" gap="24" mobileDirection="column">
        <Flex flex={1} paddingLeft="l">
          <Heading as="h2" variant="display-strong-xs" wrap="balance">
            <LetterFx speed="slow" trigger="instant">
              Github contributions
            </LetterFx>
          </Heading>
        </Flex>
        <Flex horizontal="center">
          <GithubCalendar username={githubCalendar.username} />
        </Flex>
      </Flex>
      )}
    </Column>
  );
}
