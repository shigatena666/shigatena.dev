import { about, blog, work, gallery, documentation } from "@/app/resources/content";
import { RouteConfig, Theme, ThemeOption } from "../types";

// Cookie constants
export const COOKIE_KEYS = {
  THEME: 'preferred-theme',
} as const;

export const COOKIE_EXPIRES = {
  ONE_YEAR: 365,
} as const;

// Navigation constants
export const NAVIGATION_ROUTES: RouteConfig[] = [
  { path: "/", icon: "home" },
  { path: "/about", icon: "person", content: about },
  { path: "/work", icon: "grid", content: work },
  { path: "/blog", icon: "book", content: blog },
  { path: "/gallery", icon: "gallery", content: gallery },
  { path: "/documentation", icon: "infoCircle", content: documentation },
] as const;

// Theme constants
export const THEME_OPTIONS: ThemeOption[] = [
  { value: 'light' as Theme, icon: 'sun', label: 'Light' },
  { value: 'dark' as Theme, icon: 'moon', label: 'Dark' },
] as const; 