import type { SiteConfig } from "@/lib/types";

export const siteConfig: SiteConfig = {
  title: "Intelligent Navigation and Mapping Lab",
  firstName: "Intelligent Navigation and Mapping Lab",
  middleName: "",
  lastName: "",
  email: "honyang@ucalgary.ca",
  description:
    "Intelligent Navigation and Mapping Lab website — advanced navigation and mapping for autonomous systems.",
  footerText:
    "Intelligent Navigation and Mapping Lab · University of Calgary. Photos © Hongzhou Yang.",
  keywords: [
    "Navigation",
    "Mapping",
    "Intelligent",
    "Autonomous Driving",
    "Machine Learning",
  ],
  lang: "en",
  url: "https://deep-nav-auto.github.io",
  icon: "⚛️",
  maxWidth: 930,
  announcements: {
    enabled: true,
    scrollable: true,
    limit: 5,
  },
  teamRoleOrder: [
    "Lab Director",
    "Postdocs",
    "PhD Students",
    "MSc Students",
    "Research Assistants",
    "Undergraduates",
    "High School Students",
    "Alumni",
  ],
  navItems: [
    { label: "Publications", href: "/publications", order: 2 },
    { label: "Projects", href: "/projects", order: 2.5 },
    { label: "Team", href: "/team", order: 3 },
    { label: "Contact", href: "/contact", order: 4 },
  ],
  social: {
    email: "honyang@ucalgary.ca",
    linkedin: "https://www.linkedin.com/in/hongzhouyang/",
    scholarUserId: "K95QotgAAAAJ",
    orcidId: "0000-0002-7579-7582",
    ieeeId: "96641873",
    researchGateProfile: "Hongzhou-Yang",
    workUrl: "https://profiles.ucalgary.ca/hongzhou-yang",
  },
  scholar: {
    style: "apa",
    maxAuthorLimit: 3,
  },
  publications: {
    enableThumbnails: true,
    enableBadges: false,
  },
};

export const siteName =
  siteConfig.title !== "blank"
    ? siteConfig.title
    : [siteConfig.firstName, siteConfig.middleName, siteConfig.lastName]
        .filter(Boolean)
        .join(" ");
