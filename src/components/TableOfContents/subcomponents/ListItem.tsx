import { Flex, Text } from "@/once-ui/components";
import styles from "../TableOfContents.module.scss";

interface ListItemProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
  indentLevel?: number;
}

export const ListItem = ({ 
  text, 
  isActive, 
  onClick, 
  indentLevel = 0 
}: ListItemProps) => (
  <Flex
    cursor="interactive"
    className={styles.hover}
    gap="12"
    style={{ paddingLeft: `${indentLevel * 16}px` }}
    vertical="center"
    onClick={onClick}
  >
    <Flex height="1" minWidth="8" background={isActive ? "success-strong" : "neutral-strong"} />
    <Text 
      variant="body-default-s"
      style={{ 
        color: isActive ? 'var(--scheme-green-600)' : undefined,
        fontWeight: isActive ? 600 : undefined
      }}
    >
      {text}
    </Text>
  </Flex>
); 