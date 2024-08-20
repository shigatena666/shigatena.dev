import type { DocsConfig } from "@/types";

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Welcome",
      href: "/docs/welcome",
    },
  ],
  sidebarNav: [
    {
      title: "Welcome",
      items: [
        {
          title: "Introduction",
          href: "/docs/welcome/",
        },
      ],
    },
    {
      title: "Useful commands",
      items: [
        {
          title: "HackTheBox",
          href: "/docs/useful-commands/hackthebox/",
        },
        {
          title: "NixOS",
          href: "/docs/useful-commands/nixos/",
        },
      ],
    },
  ],
};
