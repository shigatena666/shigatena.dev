'use client'

import { Skeleton } from '@/components/UI/skeleton'
import { type FunctionComponent, useCallback, useEffect, useState } from 'react'
import { Column, Flex, Text } from '@/once-ui/components'
import { type ApiResponse } from '@/types/github-calendar'
import { fetchGithubContributions } from '@/lib/utils'
import { CalendarDisplay } from './subcomponents/CalendarDisplay'
import type { GithubCalendarProps } from '@/types/github-calendar'

export const GithubCalendar: FunctionComponent<GithubCalendarProps> = ({ username, ...props }) => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchGithubContributions(username)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [username])

  useEffect(fetchData, [fetchData])

  const handleClick = () => {
    window.open(`https://github.com/${username}`, '_blank')
  }

  if (error) {
    return (
      <Column horizontal="center" vertical="center" gap="16">
        <Text variant="label-default-s" onBackground="neutral-weak">
          This component is down. Please email me!
        </Text>
      </Column>
    )
  }

  if (loading || !data) {
    return <Skeleton className="h-[70%] w-[85%] rounded-3xl" />
  }

  return (
    <Flex direction="column" gap="16" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Flex hide="s">
        <CalendarDisplay
          contributions={data.contributions}
          daysToShow={133}
          {...props}
        />
      </Flex>
      <Flex show="s">
        <CalendarDisplay
          contributions={data.contributions}
          daysToShow={60}
          isMobile
          {...props}
        />
      </Flex>
    </Flex>
  )
} 