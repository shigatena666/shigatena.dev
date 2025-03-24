import { Column, Flex } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { TableOfContents } from "@/components/TableOfContents/TableOfContents";
import { person, about, social } from "@/app/resources/content";
import { useMemo } from "react";
import { AboutHeader, AboutIntro, AboutWork, AboutStudies, AboutTechnical } from "@/components/About";
import styles from "./styles/about.module.scss";

export default function About() {
  const structure = useMemo(() => [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ].filter(section => section.display), []);

  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about.intro.description,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:"))
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: about.work.experiences[0].company || "",
            },
          }),
        }}
      />
      {about.tableOfContent.display && (
        <TableOfContents 
          structure={structure} 
          about={{
            tableOfContent: {
              subItems: about.tableOfContent.subItems
            }
          }}
          listenToToggle={true}
        />
      )}
      <Flex className={styles.container}>
        <Column className={styles.header}>
          <AboutHeader />
        </Column>
        <Column className={styles.content}>
          <AboutIntro />
          <AboutWork />
          <AboutStudies />
          <AboutTechnical />
        </Column>
      </Flex>
    </Column>
  );
}