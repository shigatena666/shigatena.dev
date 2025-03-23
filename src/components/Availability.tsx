import React from "react";
import { Badge, LetterFx } from "@/once-ui/components";

interface AvailabilityProps {
  isAvailable: boolean;
  availableText?: string;
  notAvailableText?: string;
}

export const Availability: React.FC<AvailabilityProps> = ({
  isAvailable,
  availableText = "Available",
  notAvailableText = "Not available"
}) => {
  if (isAvailable) {
    return (
      <Badge
        icon="checkCircle"
        arrow={false}
        effect={false}
        border="success-alpha-strong"
        background="success-alpha-weak"
      >
        {availableText}
      </Badge>
    );
  }

  return (
    <Badge
      icon="close"
      arrow={false}
      effect={false}
      border="danger-alpha-strong"
      background="danger-alpha-weak"
    >
      <LetterFx speed="slow" trigger="instant">
        {notAvailableText}
      </LetterFx>
    </Badge>
  );
}; 