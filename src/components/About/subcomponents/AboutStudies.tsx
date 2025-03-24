import { Column, Heading, Text } from "@/once-ui/components";
import { about } from "@/app/resources/content";
import styles from "../styles/about.module.scss";

interface AboutStudiesProps {
  className?: string;
}

export const AboutStudies = ({ className }: AboutStudiesProps) => {
  if (!about.studies.display) return null;

  return (
    <>
      <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
        {about.studies.title}
      </Heading>
      <Column fillWidth gap="l" marginBottom="40">
        {about.studies.institutions.map((institution, index) => (
          <Column key={`${institution.name}-${index}`} fillWidth gap="4">
            <Text id={institution.name} variant="heading-strong-l">
              {institution.name}
            </Text>
            <Text variant="heading-default-xs" onBackground="neutral-weak">
              {institution.description}
            </Text>
          </Column>
        ))}
      </Column>
    </>
  );
}; 