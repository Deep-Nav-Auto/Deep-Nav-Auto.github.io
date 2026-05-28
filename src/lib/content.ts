import path from "node:path";
import {
  listMarkdownFiles,
  readMarkdownFile,
  slugFromFilename,
} from "@/lib/markdown";
import { getPublications, groupPublicationsByYear } from "@/lib/bibtex";
import { siteConfig } from "@/lib/site-config";
import type {
  ContactPageContent,
  NewsItem,
  PageContent,
  Person,
  Project,
  ProjectFrontmatter,
  Publication,
} from "@/lib/types";

interface AboutFrontmatter {
  title?: string;
  profile?: PageContent["profile"];
  news?: boolean;
  selected_papers?: boolean;
  social?: boolean;
}

interface PersonFrontmatter {
  name: string;
  url?: string;
  image?: string;
  research_interests?: string;
  about?: string;
  category: string;
  linkedin?: string;
  github?: string;
  scholar?: string;
  website?: string;
}

interface NewsFrontmatter {
  date: string;
  title?: string;
  inline?: boolean;
}

export function getAboutPage(): PageContent {
  const filePath = path.join(process.cwd(), "content", "pages", "about.md");
  const { frontmatter, content } = readMarkdownFile<AboutFrontmatter>(filePath);

  return {
    slug: "about",
    title: frontmatter.title ?? "About",
    content,
    profile: frontmatter.profile
      ? {
          align: frontmatter.profile.align ?? "right",
          image: frontmatter.profile.image,
          imageCircular: frontmatter.profile.imageCircular,
        }
      : undefined,
    news: frontmatter.news,
    selectedPapers: frontmatter.selected_papers,
    social: frontmatter.social,
  };
}

interface ContactFrontmatter {
  title?: string;
  profile?: {
    name: string;
    image: string;
    position: string;
    institution: string;
    research_interests: string;
    profile_url: string;
    email: string;
    apply_url: string;
  };
}

export function getContactPage(): ContactPageContent {
  const filePath = path.join(process.cwd(), "content", "pages", "contact.md");
  const { frontmatter, content } = readMarkdownFile<ContactFrontmatter>(filePath);
  const profile = frontmatter.profile;

  if (!profile) {
    throw new Error(
      "contact.md must include a profile block in frontmatter. See CONTRIBUTING.md.",
    );
  }

  return {
    slug: "contact",
    title: frontmatter.title ?? "Contact",
    intro: content.trim(),
    profile: {
      name: profile.name,
      image: profile.image,
      position: profile.position,
      institution: profile.institution,
      researchInterests: profile.research_interests,
      profileUrl: profile.profile_url,
      email: profile.email,
      applyUrl: profile.apply_url,
    },
    address: {
      lab: "Intelligent Navigation and Mapping Lab, ENE 222",
      building: "University of Calgary",
      university: "2500 University Dr NW",
      street: "Calgary, AB T2N 1N4",
      city: "",
      country: "Canada",
    },
  };
}

export function getProjects(): Project[] {
  return listMarkdownFiles("projects")
    .map((filePath) => {
      const { frontmatter, content } =
        readMarkdownFile<Record<string, unknown>>(filePath);
      const fm = frontmatter as unknown as ProjectFrontmatter & {
        related_publications?: boolean;
      };

      return {
        slug: slugFromFilename(filePath),
        title: String(fm.title ?? slugFromFilename(filePath)),
        description: String(fm.description ?? ""),
        img: fm.img ? String(fm.img) : undefined,
        importance: Number(fm.importance ?? 0),
        category: String(fm.category ?? "work"),
        relatedPublications: Boolean(fm.related_publications),
        content,
      };
    })
    .sort((a, b) => b.importance - a.importance);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return getProjects().map((p) => p.slug);
}

export function getPeople(): Person[] {
  return listMarkdownFiles("people")
    .map((filePath) => {
      const { frontmatter } = readMarkdownFile<PersonFrontmatter>(filePath);
      return {
        slug: slugFromFilename(filePath),
        name: frontmatter.name,
        url: frontmatter.url,
        image: frontmatter.image,
        researchInterests: frontmatter.research_interests,
        about: frontmatter.about,
        category: frontmatter.category,
        linkedin: frontmatter.linkedin,
        github: frontmatter.github,
        scholar: frontmatter.scholar,
        website: frontmatter.website,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPeopleByRole(): Array<{ role: string; people: Person[] }> {
  const people = getPeople();
  return siteConfig.teamRoleOrder.map((role) => ({
    role,
    people: people.filter((p) => p.category === role),
  }));
}

export function getNews(): NewsItem[] {
  return listMarkdownFiles("news")
    .map((filePath) => {
      const { frontmatter, content } = readMarkdownFile<NewsFrontmatter>(filePath);
      const slug = slugFromFilename(filePath);
      return {
        slug,
        date: frontmatter.date,
        title: frontmatter.title ?? slug.replace(/_/g, " "),
        inline: Boolean(frontmatter.inline),
        content: content.trim(),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestNews(limit = siteConfig.announcements.limit): NewsItem[] {
  return getNews().slice(0, limit);
}

export {
  getPublications,
  groupPublicationsByYear,
  type Publication,
};

export function getSelectedPublications(): Publication[] {
  return getPublications().filter((p) => p.selected);
}
