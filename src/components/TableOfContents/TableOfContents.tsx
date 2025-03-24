"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Column, Flex, Text, Dialog, IconButton, Background } from "@/once-ui/components";
import styles from "./styles/TableOfContents.module.scss";

interface BlogHeading {
  id: string;
  text: string;
  level: number;
}

interface AboutStructure {
  title: string;
  display: boolean;
  items: string[];
}

interface TableOfContentsProps {
  /** Blog headings array */
  headings?: BlogHeading[];
  /** About page structure */
  structure?: AboutStructure[];
  /** About page configuration */
  about?: {
    tableOfContent: {
      display?: boolean;
      subItems: boolean;
    };
  };
  /** Whether to show the dialog by default (for About page) */
  defaultOpen?: boolean;
  /** Whether to listen to global toggle events (for Blog page) */
  listenToToggle?: boolean;
}

const ListItem = ({ 
  text, 
  isActive, 
  onClick, 
  indentLevel = 0 
}: { 
  text: string;
  isActive: boolean;
  onClick: () => void;
  indentLevel?: number;
}) => (
  <Flex
    cursor="interactive"
    className={styles.hover}
    gap="12"
    style={{ paddingLeft: `${indentLevel * 16}px` }}
    vertical="center"
    onClick={onClick}
  >
    <Flex height="1" minWidth="8" background={isActive ? "success-strong" : "neutral-strong"} />
    <Text 
      variant="body-default-s"
      style={{ 
        color: isActive ? 'var(--scheme-green-600)' : 'var(--scheme-black-700)',
        fontWeight: isActive ? 600 : undefined
      }}
    >
      {text}
    </Text>
  </Flex>
);

const TableOfContentsList = ({ 
  headings, 
  structure,
  about,
  activeId, 
  scrollTo 
}: { 
  headings?: BlogHeading[];
  structure?: AboutStructure[];
  about?: TableOfContentsProps['about'];
  activeId: string; 
  scrollTo: (id: string) => void;
}) => {
  if (headings?.length) {
    return (
      <Column gap="12">
        {headings.map((heading, index) => (
          <ListItem
            key={index}
            text={heading.text}
            isActive={activeId === heading.id}
            onClick={() => scrollTo(heading.id)}
          />
        ))}
      </Column>
    );
  }

  if (structure?.length) {
    return (
      <Column gap="12">
        {structure.map((section, index) => (
          <Column key={index} gap="8">
            <ListItem
              text={section.title}
              isActive={activeId === section.title}
              onClick={() => scrollTo(section.title)}
              indentLevel={0}
            />
            {about?.tableOfContent.subItems && section.items.map((item, itemIndex) => (
              <ListItem
                key={itemIndex}
                text={item}
                isActive={activeId === item}
                onClick={() => scrollTo(item)}
                indentLevel={1}
              />
            ))}
          </Column>
        ))}
      </Column>
    );
  }

  return null;
};

export const TableOfContents = ({ 
  headings = [], 
  structure = [],
  about,
  defaultOpen = false,
  listenToToggle = false 
}: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  let scrollTimeout: NodeJS.Timeout;

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (isScrolling) return;

    const visibleHeading = entries.find(
      (entry) => entry.isIntersecting && entry.boundingClientRect.top > 0
    );

    if (visibleHeading) {
      setActiveId(visibleHeading.target.id);
    }
  }, [isScrolling]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "0px 0px -90% 0px",
      threshold: 0.1
    });

    // Observe headings for blog pages
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Observe sections and items for about page
    structure.forEach((section) => {
      const element = document.getElementById(section.title);
      if (element) observer.observe(element);

      if (about?.tableOfContent.subItems) {
        section.items.forEach((item) => {
          const itemElement = document.getElementById(item);
          if (itemElement) observer.observe(itemElement);
        });
      }
    });

    return () => observer.disconnect();
  }, [headings, structure, about, handleIntersection]);

  useEffect(() => {
    if (!listenToToggle) return;
    
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggleToc', handleToggle);
    return () => window.removeEventListener('toggleToc', handleToggle);
  }, [listenToToggle]);

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(""); // Clear previous active ID during scroll
      
      // Wait for scroll to finish
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        setActiveId(id);
      }, 500);

      setIsOpen(false); // Close mobile dialog after clicking
    }
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearTimeout(scrollTimeout);
  }, []);

  if (!headings?.length && !structure?.length) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Table of Contents"
      background="surface"
      border="neutral-medium"
      radius="m-4"
      shadow="l"
    >
      <Column fillWidth>
        <TableOfContentsList 
          headings={headings} 
          structure={structure}
          about={about}
          activeId={activeId} 
          scrollTo={scrollTo} 
        />
      </Column>
    </Dialog>
  );
};

export default TableOfContents; 