import { getProjects } from "@/lib/content";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata = {
  title: "Projects",
  description:
    "Research projects at the Intelligent Navigation and Mapping Lab. Add or edit markdown files in content/projects/.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-bold">Projects</h1>
      <p className="mb-8 text-[var(--text-muted)]">
        Research project portfolio. To add or update a project, edit a file in{" "}
        <code className="rounded bg-[var(--code-bg)] px-1.5 py-0.5 text-xs">
          content/projects/
        </code>
        .
      </p>
      <ProjectGrid projects={projects} />
    </div>
  );
}
