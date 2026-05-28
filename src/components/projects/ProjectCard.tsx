import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { normalizeAssetPath } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  const imageSrc = normalizeAssetPath(project.img);

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
        {imageSrc && (
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold leading-snug group-hover:text-[var(--theme-color)]">
              {project.title}
            </h3>
            <Badge>{project.category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--text-muted)] line-clamp-3">
            {project.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
