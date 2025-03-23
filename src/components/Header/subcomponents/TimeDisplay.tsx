import { Flex } from "@/once-ui/components";
import { TimeDisplayProps } from "@/shared/types";
import { useTime } from "@/shared/hooks";

export const TimeDisplay = ({ timeZone, locale = "en-GB" }: TimeDisplayProps) => {
  const time = useTime(timeZone, locale);
  return <Flex hide="s">{time}</Flex>;
}; 