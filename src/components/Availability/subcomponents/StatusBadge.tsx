import React from "react";
import { Badge, LetterFx } from "@/once-ui/components";

interface StatusBadgeProps {
  variant: "success" | "danger";
  text: string;
  showAnimation?: boolean;
}

type ThemeColor = "success-alpha-strong" | "success-alpha-weak" | "danger-alpha-strong" | "danger-alpha-weak";

interface BadgeConfig {
  icon: "checkCircle" | "close";
  border: ThemeColor;
  background: ThemeColor;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant,
  text,
  showAnimation = false
}) => {
  const config: Record<StatusBadgeProps["variant"], BadgeConfig> = {
    success: {
      icon: "checkCircle",
      border: "success-alpha-strong",
      background: "success-alpha-weak"
    },
    danger: {
      icon: "close",
      border: "danger-alpha-strong",
      background: "danger-alpha-weak"
    }
  };

  const { icon, border, background } = config[variant];

  const Content = () => {
    if (showAnimation) {
      return (
        <LetterFx speed="slow" trigger="instant">
          {text}
        </LetterFx>
      );
    }
    return <>{text}</>;
  };

  return (
    <Badge
      icon={icon}
      arrow={false}
      effect={false}
      border={border}
      background={background}
    >
      <Content />
    </Badge>
  );
}; 