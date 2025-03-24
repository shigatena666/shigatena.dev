import { Column, Text, Heading, LetterFx, Flex, Button, IconButton, Line } from "@/once-ui/components";
import { about, person, social } from "@/app/resources/content";
import styles from "../styles/about.module.scss";

interface AboutIntroProps {
  className?: string;
}

export const AboutIntro = ({ className }: AboutIntroProps) => {
  if (!about.intro.display) return null;

  return (
    <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
      <Column id={about.intro.title}>
        <Heading className={styles.textAlign} variant="display-strong-xl">
          <LetterFx speed="slow" trigger="instant">
            {person.name}
          </LetterFx>
        </Heading>
          <Text
            className={styles.textAlign}
            variant="display-default-xs"
            onBackground="neutral-weak"
          >
            <LetterFx speed="slow" trigger="instant">
              {person.role}
            </LetterFx>
          </Text>
          {social.length > 0 && (
                <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" mobileDirection="row" fillWidth>
                  {social.map(
                    (item) =>
                      item.link && (
                        <>
                          <Button
                            className="s-flex-hide"
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            variant="secondary"
                          />
                          <IconButton
                            className="s-flex-show"
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </>
                      ),
                  )}
                </Flex>
              )}
      </Column>
      {about.intro.description}
    </Column>
  );
}; 