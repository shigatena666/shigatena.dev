export interface BlogHeading {
  id: string;
  text: string;
  level: number;
}

export interface AboutStructure {
  title: string;
  display: boolean;
  items: string[];
}

export interface TableOfContentsProps {
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