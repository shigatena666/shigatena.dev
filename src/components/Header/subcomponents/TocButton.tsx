import { Flex, ToggleButton } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";
import { useTocVisibility, useTocState } from "@/shared/hooks";

export const TocButton = () => {
  const showToc = useTocVisibility();
  const { isOpen, toggle } = useTocState();

  if (!showToc) return null;

  return (
    <Flex horizontal="center">
      <Flex 
        className={styles.navigationContainer}
        horizontal="center"
        radius="m-4"
      >
        <ToggleButton
          className="s-flex-hide"
          prefixIcon="eye"
          selected={isOpen}
          onClick={toggle}
        />
        <ToggleButton
          className="s-flex-show"
          prefixIcon="eye"
          selected={isOpen}
          onClick={toggle}
        />
      </Flex>
    </Flex>
  );
}; 