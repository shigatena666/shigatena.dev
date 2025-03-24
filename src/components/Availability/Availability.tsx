import React from "react";
import { StatusBadge } from "./subcomponents/StatusBadge";

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
  return (
    <StatusBadge
      variant={isAvailable ? "success" : "danger"}
      text={isAvailable ? availableText : notAvailableText}
      showAnimation={!isAvailable}
    />
  );
}; 