import { Column, Flex, Heading, SmartImage, Text } from "@/once-ui/components";
import { about } from "@/app/resources/content";
import styles from "../styles/about.module.scss";

interface AboutWorkProps {
  className?: string;
}

export const AboutWork = ({ className }: AboutWorkProps) => {
  if (!about.work.display) return null;

  return (
    <>
      <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
        {about.work.title}
      </Heading>
      <Column fillWidth gap="l" marginBottom="40">
        {about.work.experiences.map((experience, index) => (
          <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
            <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
              <Text id={experience.company} variant="heading-strong-l">
                {experience.company}
              </Text>
              <Text variant="heading-default-xs" onBackground="neutral-weak">
                {experience.timeframe}
              </Text>
            </Flex>
            <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
              {experience.role}
            </Text>
            <Column as="ul" gap="16">
              {experience.achievements.map((achievement: string, index: number) => (
                <Text
                  as="li"
                  variant="body-default-m"
                  key={`${experience.company}-${index}`}
                >
                  {achievement}
                </Text>
              ))}
            </Column>
            {experience.images.length > 0 && (
              <Flex fillWidth paddingTop="m" paddingLeft="40" wrap className={styles.blockAlign}>
                {experience.images.map((image, index) => (
                  <Flex
                    key={index}
                    border="neutral-medium"
                    radius="m"
                    //@ts-ignore
                    minWidth={image.width}
                    //@ts-ignore
                    height={image.height}
                  >
                    <SmartImage
                      enlarge
                      radius="m"
                      //@ts-ignore
                      sizes={image.width.toString()}
                      //@ts-ignore
                      alt={image.alt}
                      //@ts-ignore
                      src={image.src}
                    />
                  </Flex>
                ))}
              </Flex>
            )}
          </Column>
        ))}
      </Column>
    </>
  );
}; 