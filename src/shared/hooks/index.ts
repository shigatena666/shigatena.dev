import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Cookies from 'js-cookie';
import { style as configStyle } from "@/app/resources";
import { Theme } from "../types";
import { COOKIE_KEYS, COOKIE_EXPIRES } from "../constants";

// Theme hooks
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(configStyle.theme as Theme);

  useEffect(() => {
    const savedTheme = Cookies.get(COOKIE_KEYS.THEME) as Theme | undefined;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    Cookies.set(COOKIE_KEYS.THEME, newTheme, { expires: COOKIE_EXPIRES.ONE_YEAR });
  };

  return { theme, handleThemeChange };
};

// Time hooks
export const useTime = (timeZone: string, locale: string = "en-GB") => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(locale, {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timeZone, locale]);

  return time;
};

// TOC hooks
export const useTocVisibility = () => {
  const pathname = usePathname() ?? "";
  const isBlogPost = pathname.startsWith("/blog/") && pathname !== "/blog";
  const isAboutPage = pathname === "/about";
  
  return isBlogPost || isAboutPage;
};

export const useTocState = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggleToc', handleToggle);
    return () => window.removeEventListener('toggleToc', handleToggle);
  }, []);

  const toggle = () => {
    window.dispatchEvent(new CustomEvent('toggleToc'));
    setIsOpen(prev => !prev);
  };

  return { isOpen, toggle };
}; 