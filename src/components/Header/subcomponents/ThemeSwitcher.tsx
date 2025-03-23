import { Flex, ToggleButton, DropdownWrapper } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";
import { THEME_OPTIONS } from "@/shared/constants";
import { useTheme } from "@/shared/hooks";

export const ThemeSwitcher = () => {
  const { theme, handleThemeChange } = useTheme();
  const currentThemeOption = THEME_OPTIONS.find(option => option.value === theme) ?? THEME_OPTIONS[1];

  return (
    <Flex horizontal="center">
      <Flex className={styles.navigationContainer} horizontal="center" radius="m-4">
        <DropdownWrapper
          floatingPlacement="top"
          trigger={
            <ToggleButton
              prefixIcon={currentThemeOption.icon}
              selected={false}
            />
          }
          dropdown={
            <Flex className={styles.navigationContainer} direction="column" gap="2" padding="4">
              {THEME_OPTIONS.map(option => (
                <ToggleButton
                  key={option.value}
                  prefixIcon={option.icon}
                  label={option.label}
                  selected={theme === option.value}
                  onClick={() => handleThemeChange(option.value)}
                />
              ))}
            </Flex>
          }
        />
      </Flex>
    </Flex>
  );
}; 