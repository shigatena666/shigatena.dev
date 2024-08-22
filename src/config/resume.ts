import type { ResumeConfig } from "@/types";

export const resumeConfig: ResumeConfig = {
  mainNav: [
    {
      title: "Welcome",
      href: "/resume/welcome",
    },
  ],
  sidebarNav: [
    {
      title: "Resume",
      items: [
        {
          title: "Work",
          href: "/resume/work/",
        },
        {
          title: "School",
          href: "/resume/school/",
        },
        {
          title: "Skills",
          href: " ",
        },
        {
          title: "Hobbies",
          href: " ",
        },
      ],
    },
  ],
};
