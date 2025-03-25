"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import { Fade, Flex, Line, ToggleButton, IconButton, DropdownWrapper } from "@/once-ui/components";
import styles from "./styles/Header.module.scss";

import { routes, display, style as configStyle } from "@/app/resources";
import { person, home, about, blog, work, gallery, documentation } from "@/app/resources/content";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay = ({ timeZone, locale = "en-GB" }: TimeDisplayProps) => {
  const [time, setTime] = useState("");

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

  return <>{time}</>;
};

const THEME_COOKIE_KEY = 'preferred-theme';
const THEME_COOKIE_EXPIRES = 365; // 1 year

export const Header = () => {
  const pathname = usePathname() ?? "";
  const isBlogPost = pathname.startsWith("/blog/") && pathname !== "/blog";
  const isAboutPage = pathname === "/about";
  const showToc = isBlogPost || isAboutPage;
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(configStyle.theme as 'light' | 'dark');

  // Load theme from cookie on mount
  useEffect(() => {
    const savedTheme = Cookies.get(THEME_COOKIE_KEY) as 'light' | 'dark' | undefined;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  useEffect(() => {
    const handleToggle = () => setIsTocOpen(prev => !prev);
    window.addEventListener('toggleToc', handleToggle);
    return () => window.removeEventListener('toggleToc', handleToggle);
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    // Save theme preference to cookie
    Cookies.set(THEME_COOKIE_KEY, newTheme, { expires: THEME_COOKIE_EXPIRES });
  };

  return (
    <>
      <Fade hide="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Fade show="s" fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Flex
        fitHeight
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        gap="16"
      >
        <Flex className={styles.locationContainer} vertical="center" textVariant="body-default-s">
          {display.location && <Flex hide="s">{person.location}</Flex>}
        </Flex>
        {showToc && (
            <Flex horizontal="center">
              <Flex 
                className={styles.navigationContainer}
                horizontal="center"
                radius="m-4"
              >
                <ToggleButton
                  className="s-flex-hide"
                  prefixIcon="eye"
                  selected={isTocOpen}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('toggleToc'));
                    setIsTocOpen(prev => !prev);
                  }}
                />
                <ToggleButton
                  className="s-flex-show"
                  prefixIcon="eye"
                  selected={isTocOpen}
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('toggleToc'));
                    setIsTocOpen(prev => !prev);
                  }}
                />
              </Flex>
            </Flex>
          )}
        <Flex horizontal="center">
          <Flex className={styles.navigationContainer} horizontal="center" radius="m-4">
            {routes["/"] && (
              <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
            )}
            <Flex vertical="center">
              <Line vert maxHeight="24"/>
            </Flex>
            {routes["/about"] && (
              <>
                <ToggleButton
                  className="s-flex-hide"
                  prefixIcon="person"
                  href="/about"
                  label={about.label}
                  selected={pathname === "/about"}
                />
                <ToggleButton
                  className="s-flex-show"
                  prefixIcon="person"
                  href="/about"
                  selected={pathname === "/about"}
                />
              </>
            )}
            {routes["/work"] && (
              <>
                <ToggleButton
                  className="s-flex-hide"
                  prefixIcon="grid"
                  href="/work"
                  label={work.label}
                  selected={pathname.startsWith("/work")}
                />
                <ToggleButton
                  className="s-flex-show"
                  prefixIcon="grid"
                  href="/work"
                  selected={pathname.startsWith("/work")}
                />
              </>
            )}
            {routes["/blog"] && (
              <>
                <ToggleButton
                  className="s-flex-hide"
                  prefixIcon="book"
                  href="/blog"
                  label={blog.label}
                  selected={pathname.startsWith("/blog")}
                />
                <ToggleButton
                  className="s-flex-show"
                  prefixIcon="book"
                  href="/blog"
                  selected={pathname.startsWith("/blog")}
                />
              </>
            )}
            {routes["/gallery"] && (
              <>
                <ToggleButton
                  className="s-flex-hide"
                  prefixIcon="gallery"
                  href="/gallery"
                  label={gallery.label}
                  selected={pathname.startsWith("/gallery")}
                />
                <ToggleButton
                  className="s-flex-show"
                  prefixIcon="gallery"
                  href="/gallery"
                  selected={pathname.startsWith("/gallery")}
                />
              </>
            )}
            {routes["/documentation"] && (
              <>
                <ToggleButton
                  className="s-flex-hide"
                  prefixIcon="infoCircle"
                  href="/documentation"
                  label={documentation.label}
                  selected={pathname.startsWith("/documentation")}
                />
                <ToggleButton
                  className="s-flex-show"
                  prefixIcon="infoCircle"
                  href="/documentation"
                  selected={pathname.startsWith("/documentation")}
                />
              </>
            )}
          </Flex>
        </Flex>
        <Flex horizontal="center">
            <Flex className={styles.navigationContainer} horizontal="center" radius="m-4">
              <DropdownWrapper
                floatingPlacement="top"
                trigger={
                  <ToggleButton
                    prefixIcon={theme === 'dark' ? 'moon' : 'sun'}
                    selected={false}
                  />
                }
                dropdown={
                  <Flex className={styles.navigationContainer} direction="column" gap="2" padding="4">
                    <ToggleButton
                      prefixIcon="sun"
                      label="Light"
                      selected={theme === 'light'}
                      onClick={() => handleThemeChange('light')}
                    />
                    <ToggleButton
                      prefixIcon="moon"
                      label="Dark"
                      selected={theme === 'dark'}
                      onClick={() => handleThemeChange('dark')}
                    />
                  </Flex>
                }
              />
            </Flex>
          </Flex>
        <Flex
          className={styles.rightContainer}
          horizontal="end"
          vertical="center"
          textVariant="body-default-s"
          gap="8"
        >
          <Flex hide="s">{display.time && <TimeDisplay timeZone={person.location} />}</Flex>
        </Flex>
      </Flex>
    </>
  );
};
