import { Text } from '@/once-ui/components'
import { DiscordActivity } from '../types'

interface ActivityDisplayProps {
  activity: DiscordActivity
}

export const ActivityDisplay = ({ activity }: ActivityDisplayProps) => {
  const activityText = activity.type === 2 ? // Spotify
    `Listening to ${activity.details}` :
    activity.type === 0 ? // Playing a game
    `Playing ${activity.name}` :
    activity.type === 1 ? // Streaming
    `Streaming ${activity.details}` :
    activity.type === 3 ? // Watching
    `Watching ${activity.name}` :
    activity.type === 5 ? // Competing
    `Competing in ${activity.name}` :
    null

  if (!activityText) return null

  return (
    <Text variant="label-default-s" onBackground="brand-weak">
      {activityText}
    </Text>
  )
} 