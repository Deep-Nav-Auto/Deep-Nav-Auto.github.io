import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { MarkdownContent } from "@/components/markdown/MarkdownContent";
import { Badge } from "@/components/ui/badge";
import { normalizeAssetPath } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const image = normalizeAssetPath(project.img);

  return {
    title: project.title,
    description: project.description,
    openGraph: image ? { images: [{ url: image }] } : undefined,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const imageSrc = normalizeAssetPath(project.img);

  return (
    <article>
      {imageSrc && (
        <div className="relative mb-8 h-56 w-full overflow-hidden rounded-lg">
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <header className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <Badge>{project.category}</Badge>
        </div>
        <h1 className="font-serif text-3xl font-bold">{project.title}</h1>
        <p className="mt-2 text-[var(--text-muted)]">{project.description}</p>
      </header>
      <MarkdownContent
        content={project.content}
        className="prose prose-neutral max-w-none dark:prose-invert"
      />
    </article>
  );
}
