export interface DiscordPresenceProps {
  userId?: string
  size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}

export interface DiscordActivity {
  type: number // 0: Playing, 1: Streaming, 2: Listening, 3: Watching, 5: Competing
  name: string
  details?: string
} 