"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, ToggleButton, IconButton } from "@/once-ui/components";
import styles from "@/components/Header.module.scss";

import { routes, display } from "@/app/resources";
import { person, home, about, blog, work, gallery, documentation } from "@/app/resources/content";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
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

  return <>{time}</>;
};

export const Header = () => {
  const pathname = usePathname() ?? "";
  const isBlogPost = pathname.startsWith("/blog/") && pathname !== "/blog";
  const isAboutPage = pathname === "/about";
  const showToc = isBlogPost || isAboutPage;
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsTocOpen(prev => !prev);
    window.addEventListener('toggleToc', handleToggle);
    return () => window.removeEventListener('toggleToc', handleToggle);
  }, []);

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
      >
        <Flex className={styles.locationContainer} vertical="center" textVariant="body-default-s">
          {display.location && <Flex hide="s">{person.location}</Flex>}
        </Flex>
        <Flex horizontal="center">
          <Flex className={styles.navigationContainer} horizontal="center" radius="m-4">
            {routes["/"] && (
              <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
            )}
            <Line vert maxHeight="24" />
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
        <Flex
          className={styles.rightContainer}
          horizontal="end"
          vertical="center"
          textVariant="body-default-s"
        >
          <Flex hide="s">{display.time && <TimeDisplay timeZone={person.location} />}</Flex>
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
        </Flex>
      </Flex>
    </>
  );
};
