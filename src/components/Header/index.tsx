import { Fade, Flex } from "@/once-ui/components";
import { display } from "@/app/resources";
import { person } from "@/app/resources/content";
import styles from "./styles/Header.module.scss";

import { TimeDisplay } from "./subcomponents/TimeDisplay";
import { NavigationButtons } from "./subcomponents/NavigationButtons";
import { ThemeSwitcher } from "./subcomponents/ThemeSwitcher";
import { TocButton } from "./subcomponents/TocButton";

export const Header = () => {
  return (
    <>
      <Fade hide="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Flex
        fitHeight
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
      >
        <Flex className={styles.locationContainer} vertical="center" textVariant="body-default-s">
          {display.location && <Flex hide="s">{person.location}</Flex>}
        </Flex>

        <Flex horizontal="center">
          <NavigationButtons />
        </Flex>

        <Flex
          className={styles.rightContainer}
          horizontal="end"
          vertical="center"
          textVariant="body-default-s"
          gap="8"
        >
          {display.time && <TimeDisplay timeZone={person.location} />}
          <ThemeSwitcher />
          <TocButton />
        </Flex>
      </Flex>
    </>
  );
}; 