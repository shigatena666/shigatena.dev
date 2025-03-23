import { usePathname } from "next/navigation";
import { Flex, Line, ToggleButton } from "@/once-ui/components";
import { routes } from "@/app/resources";
import styles from "@/components/Header.module.scss";
import { RouteConfig } from "@/shared/types";
import { NAVIGATION_ROUTES } from "@/shared/constants";

const RouteButton = ({ path, icon, label, content }: RouteConfig) => {
  const pathname = usePathname() ?? "";
  const isSelected = path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <>
      <ToggleButton
        className="s-flex-hide"
        prefixIcon={icon}
        href={path}
        label={content?.label ?? label}
        selected={isSelected}
      />
      <ToggleButton
        className="s-flex-show"
        prefixIcon={icon}
        href={path}
        selected={isSelected}
      />
    </>
  );
};

export const NavigationButtons = () => {
  return (
    <Flex className={styles.navigationContainer} horizontal="center" radius="m-4">
      {NAVIGATION_ROUTES.map((route, index) => (
        routes[route.path] && (
          <div key={route.path}>
            {index === 1 && <Line vert maxHeight="24" />}
            <RouteButton {...route} />
          </div>
        )
      ))}
    </Flex>
  );
}; 