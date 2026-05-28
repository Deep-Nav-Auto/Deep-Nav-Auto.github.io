import fs from "node:fs";
import path from "node:path";
import { parse, type Creator, type Entry } from "@retorquere/bibtex-parser";
import type { Publication, PublicationType } from "@/lib/types";

const BIB_PATH = path.join(process.cwd(), "content", "bibliography", "papers.bib");

function fieldValue(fields: Entry["fields"], name: string): string | undefined {
  const key = Object.keys(fields).find(
    (k) => k.toLowerCase() === name.toLowerCase(),
  );
  if (!key) return undefined;
  const value = fields[key];
  if (typeof value === "string") return value.trim();
  return undefined;
}

function formatCreator(creator: Creator): string {
  if (creator.name) return creator.name;
  const parts = [creator.firstName, creator.lastName].filter(Boolean);
  return parts.join(" ");
}

function parseAuthors(fields: Entry["fields"]): string[] {
  const authors = fields.author;
  if (!authors || !Array.isArray(authors)) return [];
  return authors.map(formatCreator).filter(Boolean);
}

function getVenue(type: string, fields: Entry["fields"]): string {
  if (type === "article") return fieldValue(fields, "journal") ?? "";
  if (type === "inproceedings" || type === "incollection") {
    return fieldValue(fields, "booktitle") ?? "";
  }
  if (type === "phdthesis" || type === "mastersthesis") {
    return fieldValue(fields, "school") ?? "";
  }
  return fieldValue(fields, "journal") ?? fieldValue(fields, "booktitle") ?? "";
}

function parseBoolean(value: string | undefined): boolean {
  if (!value) return false;
  return value.toLowerCase() === "true" || value === "1";
}

export function getPublications(): Publication[] {
  const raw = fs.readFileSync(BIB_PATH, "utf8");
  const { entries } = parse(raw);

  return entries.map((entry) => {
    const type = (entry.type?.toLowerCase() ?? "misc") as PublicationType;
    const fields = entry.fields;
    const year = Number(fieldValue(fields, "year") ?? 0);
    const tags = fields.keywords?.map(String);

    return {
      key: entry.key,
      type,
      title: fieldValue(fields, "title") ?? "Untitled",
      authors: parseAuthors(fields),
      year,
      venue: getVenue(type, fields),
      url: fieldValue(fields, "url"),
      doi: fieldValue(fields, "doi"),
      abstract: fieldValue(fields, "abstract"),
      tags,
      pdf: fieldValue(fields, "pdf"),
      code: fieldValue(fields, "code"),
      html: fieldValue(fields, "html"),
      arxiv: fieldValue(fields, "arxiv") ?? fieldValue(fields, "eprint"),
      slides: fieldValue(fields, "slides"),
      poster: fieldValue(fields, "poster"),
      website: fieldValue(fields, "website"),
      video: fieldValue(fields, "video"),
      selected: parseBoolean(fieldValue(fields, "selected")),
      abbr: fieldValue(fields, "abbr"),
      award: fieldValue(fields, "award"),
      awardName: fieldValue(fields, "award_name"),
      bibtex: entry.input.trim(),
      bibtexShow: parseBoolean(fieldValue(fields, "bibtex_show")),
      preview: fieldValue(fields, "preview"),
    };
  });
}

export function groupPublicationsByYear(
  publications: Publication[],
): Map<number, Publication[]> {
  const grouped = new Map<number, Publication[]>();
  const sorted = [...publications].sort((a, b) => b.year - a.year);

  for (const pub of sorted) {
    const list = grouped.get(pub.year) ?? [];
    list.push(pub);
    grouped.set(pub.year, list);
  }

  return grouped;
}
