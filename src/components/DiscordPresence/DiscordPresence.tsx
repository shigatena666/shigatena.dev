'use client'

import { useLanyard } from 'react-use-lanyard'
import { Avatar, Column, Flex, Text } from '@/once-ui/components'
import { useToast } from '@/once-ui/components/ToastProvider'

interface DiscordPresenceProps {
  userId?: string
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

export const DiscordPresence = ({ userId = '565228654854930455', size = 'l' }: DiscordPresenceProps) => {
  const { data: lanyard, isLoading } = useLanyard({ userId })
  const { addToast } = useToast()

  const handleCopyUserInfo = () => {
    if (!lanyard?.data?.discord_user) return

    const { discord_user: user } = lanyard.data
    const userInfo = `${user.username}`
    
    navigator.clipboard.writeText(userInfo).then(() => {
      addToast({
        variant: 'success',
        message: 'Discord user info copied to clipboard',
      })
    }).catch(() => {
      addToast({
        variant: 'danger',
        message: 'Failed to copy to clipboard',
      })
    })
  }

  if (isLoading || !lanyard?.data) {
    return (
      <Flex gap="12" vertical="center">
        <Avatar size={size} />
        <Column gap="4">
          <Text variant="body-default-m" onBackground="neutral-weak">
            Loading...
          </Text>
        </Column>
      </Flex>
    )
  }

  const { discord_user: user, discord_status: status, activities } = lanyard.data
  const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${
    user.avatar.startsWith('a_') ? 'gif' : 'png'
  }`

  const currentActivity = activities?.[0]
  const activityText = currentActivity ? (
    currentActivity.type === 2 ? // Spotify
      `Listening to ${currentActivity.details}` :
    currentActivity.type === 0 ? // Playing a game
      `Playing ${currentActivity.name}` :
    currentActivity.type === 1 ? // Streaming
      `Streaming ${currentActivity.details}` :
    currentActivity.type === 3 ? // Watching
      `Watching ${currentActivity.name}` :
    currentActivity.type === 5 ? // Competing
      `Competing in ${currentActivity.name}` :
    null
  ) : null

  return (
    <Flex 
      gap="12" 
      vertical="center" 
      onClick={handleCopyUserInfo}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCopyUserInfo()
        }
      }}
    >
      <Column gap="4">
        <Avatar
          src={avatarUrl}
          size={size}
          statusIndicator={{
            color: status === 'online' ? 'green' : status === 'idle' ? 'yellow' : status === 'dnd' ? 'red' : 'gray'
          }}
        />
        <Text variant="body-default-m" onBackground="neutral-strong">
          {user.global_name || user.username}
        </Text>
        <Text variant="label-default-s" onBackground="neutral-weak">
          @{user.username}
        </Text>
        {activityText && (
          <Text variant="label-default-s" onBackground="brand-weak">
            {activityText}
          </Text>
        )}
      </Column>
    </Flex>
  )
} 