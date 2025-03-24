import { Avatar, Button, Column, Flex, Heading, Icon, IconButton, Text, GlitchFx, LetterFx } from "@/once-ui/components";
import { person, about, social } from "@/app/resources/content";
import ClientDiscordPresence from "@/components/DiscordUserCard/subcomponents/ClientDiscordPresence";
import styles from "../styles/about.module.scss";

interface AboutHeaderProps {
  className?: string;
}

export const AboutHeader = ({ className }: AboutHeaderProps) => {
  return (
    <Column>
      {about.avatar.display && (
        <Column
          className={styles.avatar}
          fillWidth
          gap="m"
          horizontal="center"
        >
          <GlitchFx>
            <ClientDiscordPresence />
          </GlitchFx>
        </Column>
      )}
    </Column>
  );
}; 