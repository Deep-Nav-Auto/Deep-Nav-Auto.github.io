import { getPeopleByRole } from "@/lib/content";
import { RoleSection } from "@/components/team/RoleSection";

export const metadata = {
  title: "Team",
  description: "Team members of the Intelligent Navigation and Mapping Lab.",
};

export default function TeamPage() {
  const roles = getPeopleByRole();

  return (
    <div>
      <header className="mb-10">
        <h1 className="font-serif text-3xl font-bold">Team</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Click a photo for full details. Hover for LinkedIn.
        </p>
      </header>
      {roles.map(({ role, people }) => (
        <RoleSection key={role} role={role} people={people} />
      ))}
    </div>
  );
}
