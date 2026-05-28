import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function readMarkdownFile<T extends object>(
  filePath: string,
): { frontmatter: T; content: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as T, content };
}

export function listMarkdownFiles(directory: string): string[] {
  const dir = path.join(CONTENT_ROOT, directory);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(dir, file));
}

export function slugFromFilename(filename: string): string {
  return path.basename(filename, path.extname(filename));
}
