import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "shigatena",
  lastName: "",
  get name() {
    return `${this.firstName}`;
  },
  role: "Security expert",
  avatar: "/images/avatar.jpg",
  location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "French"], // optional: Leave the array empty if you don't want to display languages
};

const githubCalendar = {
  display: true,
  username: "shigatena666",
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/shigatena666",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/shigatena666/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:contact@shigatena.dev",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Hacker and developer</>
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        With over 3 years of experience in the field, I specialize in vulnerability management, threat intelligence, and security automation. My expertise lies in detecting, tracking, and remediating vulnerabilities and incidents for large organizations.
        <br /><br />
        I have a strong background in configuring and optimizing security tools, improving operational efficiency through automation, and reporting key performance indicators. My skills in ethical hacking and development complement my cybersecurity focus.
        <br /><br />
        Even when I'm not working, I'm always looking to expand my knowledge and skills in the rapidly evolving field of cybersecurity. I continue to develop my expertise through personal projects, participating in hacking challenges, and staying updated with the latest security trends.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "CNP Assurances",
        timeframe: "Sept 2024 - Present",
        role: "VOC, CTI & Automation expert",
        achievements: [
          "Detection, monitoring, and remediation of group vulnerabilities/incidents",
          "Configuration and improvement of security tools usage (YesWeHack, Hackuity, RecordedFuture, Ambionics, Bitsight, Hardenize...)",
          "Improvement of infrastructure and operational efficiency (Python automation, databases...)",
          "Reporting of key performance indicators (KPIs)",
        ],
        images: [
          {
            src: "/images/work/cnp_assurances/cnp_assurances.png",
            alt: "Work image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "CNP Assurances (apprenticeship)",
        timeframe: "Sept 2021 - Aug 2024",
        role: "VOC, CTI & Automation",
        achievements: [
          "Detection, monitoring, and remediation of group vulnerabilities/incidents",
          "Configuration and improvement of security tools usage (YesWeHack, Hackuity, RecordedFuture, Ambionics, Bitsight, Hardenize...)",
          "Improvement of infrastructure and operational efficiency (Python automation, databases...)",
          "Reporting of key performance indicators (KPIs)",
        ],
        images: [
          {
            src: "/images/work/cnp_assurances/cnp_assurances.png",
            alt: "Work image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "DaVinciCode",
        timeframe: "Sept 2022 - July 2024",
        role: "Member",
        achievements: [
        ],
        images: [
          {
            src: "/images/work/davincicode/davincicode.png",
            alt: "Work image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "CalculIP",
        timeframe: "Apr 2021 - June 2021",
        role: "Web Development Intern",
        achievements: [
          "Conducting in-depth case studies to meet project requirements",
          "Reorganizing code into an MVC architecture, increasing application reliability and maintainability",
          "Developing and improving exercises on network protocols (DHCP, DNS, IPv6), enhancing student users' understanding",
          "Resolving XSS and IDOR vulnerabilities",
        ],
        images: [
          {
            src: "/images/work/USPN/uspn.png",
            alt: "Work image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "ESILV",
        description: <>Engineering - Connected Objects and Cybersecurity - Apprenticeship.</>,
      },
      {
        name: "IUT de Villetaneuse",
        description: <>DUT in Computer Science - Full-time program.</>,
      },
      {
        name: "Scientific Baccalaureate",
        description: <>Saint-Exupery Highschool.</>,
      },
    ],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Blog posts",
  description: `Read what ${person.name} has been up to recently`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "Projects",
  description: `Cybersecurity and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "Image gallery",
  description: `An image collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.png",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.png",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-06.png",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.png",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

const documentation = {
  label: "Documentation",
  title: "Documentation",
  description: `A documentation collection by ${person.name}`,
};

const availability = {
  isAvailable: false,
  availableText: "Available for work",
  notAvailableText: "Not available",
}; 

export { person, githubCalendar, social, home, about, blog, work, gallery, documentation, availability};
