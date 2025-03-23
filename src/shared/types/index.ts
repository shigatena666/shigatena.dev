// Theme types
export type Theme = 'light' | 'dark';

export interface ThemeOption {
  value: Theme;
  icon: string;
  label: string;
}

// Navigation types
export interface RouteConfig {
  path: string;
  icon: string;
  label?: string;
  content?: { label: string };
}

// Component Props types
export interface TimeDisplayProps {
  timeZone: string;
  locale?: string;
}

// Re-export other type modules
export * from '@/types/github-calendar'; 