export interface Activity {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ApiResponse {
  total: {
    [year: number]: number
    [year: string]: number
  }
  contributions: Array<Activity>
}

export interface ApiErrorResponse {
  error: string
}

export interface GithubCalendarProps extends Omit<React.ComponentProps<typeof import('react-activity-calendar').default>, 'data' | 'theme'> {
  username: string
} 