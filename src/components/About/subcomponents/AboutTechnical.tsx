import { Column, Flex, Heading, SmartImage, Text } from "@/once-ui/components";
import { about } from "@/app/resources/content";
import styles from "../styles/about.module.scss";

interface AboutTechnicalProps {
  className?: string;
}

export const AboutTechnical = ({ className }: AboutTechnicalProps) => {
  if (!about.technical.display) return null;

  return (
    <>
      <Heading
        as="h2"
        id={about.technical.title}
        variant="display-strong-s"
        marginBottom="40"
      >
        {about.technical.title}
      </Heading>
      <Column fillWidth gap="l">
        {about.technical.skills.map((skill, index) => (
          <Column key={`${skill}-${index}`} fillWidth gap="4">
            <Text variant="heading-strong-l">{skill.title}</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {skill.description}
            </Text>
            {skill.images && skill.images.length > 0 && (
              <Flex fillWidth paddingTop="m" gap="12" wrap className={styles.blockAlign}>
                {skill.images.map((image, index) => (
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