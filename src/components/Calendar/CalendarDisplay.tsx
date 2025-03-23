import { type FunctionComponent } from 'react'
import Calendar from 'react-activity-calendar'
import { Flex } from '@/once-ui/components'
import { Activity } from '@/types/github-calendar'
import { githubCalendarTheme, selectLastNDays } from '@/lib/utils'

interface CalendarDisplayProps {
  contributions: Activity[]
  daysToShow: number
  isMobile?: boolean
}

const CalendarDisplay: FunctionComponent<CalendarDisplayProps> = ({
  contributions,
  daysToShow,
  isMobile = false,
}) => {
  const commonProps = {
    data: selectLastNDays(contributions, daysToShow),
    theme: githubCalendarTheme,
    colorScheme: 'dark',
    blockSize: 20,
    blockMargin: 6,
    blockRadius: 7,
    maxLevel: 4,
    hideTotalCount: true,
    hideColorLegend: true,
  } as const

  return (
    <Flex
      margin="16"
      style={isMobile ? { transform: 'scale(1.1)' } : undefined}
    >
      <Calendar {...commonProps} />
    </Flex>
  )
}

export default CalendarDisplay 