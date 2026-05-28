export interface SiteConfig {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  description: string;
  footerText: string;
  keywords: string[];
  lang: string;
  url: string;
  icon: string;
  maxWidth: number;
  announcements: {
    enabled: boolean;
    scrollable: boolean;
    limit: number;
  };
  teamRoleOrder: string[];
  navItems: NavItem[];
  social: SocialLinks;
  scholar: {
    style: "apa" | "ieee";
    maxAuthorLimit: number;
  };
  publications: {
    enableThumbnails: boolean;
    enableBadges: boolean;
  };
}

export interface NavItem {
  label: string;
  href: string;
  order: number;
}

export interface SocialLinks {
  email: string;
  linkedin?: string;
  scholarUserId?: string;
  orcidId?: string;
  ieeeId?: string;
  researchGateProfile?: string;
  workUrl?: string;
}

export type PublicationType =
  | "article"
  | "inproceedings"
  | "book"
  | "misc"
  | "phdthesis"
  | "mastersthesis"
  | "incollection"
  | "techreport"
  | string;

export interface Publication {
  key: string;
  type: PublicationType;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  url?: string;
  doi?: string;
  abstract?: string;
  tags?: string[];
  pdf?: string;
  code?: string;
  html?: string;
  arxiv?: string;
  slides?: string;
  poster?: string;
  website?: string;
  video?: string;
  selected?: boolean;
  abbr?: string;
  award?: string;
  awardName?: string;
  bibtex: string;
  bibtexShow: boolean;
  preview?: string;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  img?: string;
  importance: number;
  category: string;
  relatedPublications?: boolean;
}

export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
}

export interface Person {
  slug: string;
  name: string;
  url?: string;
  image?: string;
  researchInterests?: string;
  about?: string;
  category: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  website?: string;
}

export interface NewsItem {
  slug: string;
  date: string;
  title?: string;
  inline: boolean;
  content: string;
}

export interface PageContent {
  slug: string;
  title: string;
  content: string;
  profile?: {
    align: "left" | "right";
    image?: string;
    imageCircular?: boolean;
  };
  news?: boolean;
  selectedPapers?: boolean;
  social?: boolean;
}

export interface ContactProfile {
  name: string;
  image: string;
  position: string;
  institution: string;
  researchInterests: string;
  profileUrl: string;
  email: string;
  applyUrl: string;
}

export interface ContactPageContent {
  slug: string;
  title: string;
  intro: string;
  profile: ContactProfile;
  address: {
    lab: string;
    building: string;
    university: string;
    street: string;
    city: string;
    country: string;
  };
}

export interface MarkdownDocument<T> {
  slug: string;
  frontmatter: T;
  content: string;
}
