import { Column } from "@/once-ui/components";
import { BlogHeading, AboutStructure, TableOfContentsProps } from "../types";
import { ListItem } from "./ListItem";

interface TableOfContentsListProps {
  headings?: BlogHeading[];
  structure?: AboutStructure[];
  about?: TableOfContentsProps['about'];
  activeId: string;
  scrollTo: (id: string) => void;
}

export const TableOfContentsList = ({ 
  headings, 
  structure,
  about,
  activeId, 
  scrollTo 
}: TableOfContentsListProps) => {
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