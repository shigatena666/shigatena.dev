"use client";

import { Badge, Card, Column, Icon, LetterFx, Line, Row, Scroller, SmartImage, SmartLink, Text } from "@/once-ui/components";
import { formatDate } from "@/app/utils/formatDate";
import { type PostProps } from '../types';
import styles from './Post.module.scss';

export function Post({ post, thumbnail }: PostProps) {
  const tags = post.metadata.tag ? (post.metadata.tag.includes(",") ? post.metadata.tag.split(",") : [post.metadata.tag]) : [];
  
  // Determine the correct URL based on the post path
  const getPostUrl = () => {
    if (post.metadata.path?.includes("documentation")) {
      return `/documentation/${post.slug}`;
    }
    return `/blog/${post.slug}`;
  };

  return (
    <SmartLink
      fillWidth
      className={styles.hover}
      unstyled
      key={post.slug}
      href={getPostUrl()}
    >
      <Card
        radius="l-4"
        direction="column"
        fillWidth
      >
        {post.metadata.image && thumbnail && (
          <SmartImage
            sizes="640px"
            fillWidth
            height={160}
            aspectRatio="4 / 3"
            radius="l"
            src={post.metadata.image}
            alt={"Thumbnail of " + post.metadata.title}
          />
        )}
        <Column
          fillWidth
          paddingX="20"
          paddingY="24"
          gap="8"
        >
          <Text variant="body-default-xl">
            {post.metadata.title}
          </Text>
          <Text
            onBackground="neutral-weak"
            variant="body-default-s"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
          >
            {post.metadata.summary || "No description available"}
          </Text>
        </Column>
        <Line background="neutral-alpha-medium" />
        <Row
          paddingX="20"
          paddingY="12"
          gap="8"
          vertical="center"
          textVariant="label-default-s"
          onBackground="neutral-medium"
          fillWidth
        >
          {post.metadata.publishedAt && (
            <Badge
              arrow={false}
              effect={false}
              border="success-alpha-strong"
              background="success-alpha-weak"
            >
              <Text onBackground="neutral-strong">
                {formatDate(post.metadata.publishedAt, false)}
              </Text>
            </Badge>
          )}
          {tags.length > 0 && (
            <Badge
              arrow={false}
              effect={false}
              border="success-alpha-strong"
              background="success-alpha-weak"
            >
              {tags.slice(0, 3).map((tag: string, index: number) => (
                <Text key={index} onBackground="neutral-strong">
                  {tag.trim()}
                </Text>
              ))}
            </Badge>
          )}
        </Row>
      </Card>
    </SmartLink>
  );
} 