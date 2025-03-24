import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ApiResponse, ApiErrorResponse, Activity } from '@/types/github-calendar'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getElapsedTime(timestamp: number): string {
  const now = Date.now();
  const elapsed = now - timestamp;
  
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  } else {
    return `${seconds} second${seconds === 1 ? '' : 's'}`;
  }
}

// GitHub Calendar Utils
export async function fetchGithubContributions(username: string): Promise<ApiResponse> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
  )
  const data: ApiResponse | ApiErrorResponse = await response.json()

  if (!response.ok) {
    throw Error(
      `Fetching GitHub contribution data for "${username}" failed: ${
        (data as ApiErrorResponse).error
      }`,
    )
  }

  return data as ApiResponse
}

export function selectLastNDays(contributions: Activity[], days: number) {
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - days)

  return contributions.filter((activity) => {
    const activityDate = new Date(activity.date)
    return activityDate >= startDate && activityDate <= today
  })
}

export const githubCalendarTheme = {
  dark: [
    'var(--neutral-background-medium)',
    'var(--success-background-strong)',
    'var(--success-solid-weak)',
    'var(--success-solid-medium)',
    'var(--success-solid-strong)', 
  ],
}