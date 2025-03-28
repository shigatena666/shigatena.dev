import { type FunctionComponent } from 'react'
import Calendar from 'react-activity-calendar'
import { Flex } from '@/once-ui/components'
import { Activity } from '../types'
import { githubCalendarTheme, selectLastNDays } from '@/lib/utils'

interface CalendarDisplayProps {
  contributions: Activity[]
  daysToShow: number
  isMobile?: boolean
}

export const CalendarDisplay: FunctionComponent<CalendarDisplayProps> = ({
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
    hideTotalCount: false,
    hideColorLegend: false,
  } as const

  return (
    <Calendar {...commonProps} />
  )
} 