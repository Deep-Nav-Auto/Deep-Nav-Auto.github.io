import { getPeopleByRole } from "@/lib/content";
import { RoleSection } from "@/components/team/RoleSection";

export const metadata = {
  title: "Team",
  description:
    "Faculty, students, and alumni of the Intelligent Navigation and Mapping Lab at the University of Calgary.",
};

export default function TeamPage() {
  const roles = getPeopleByRole().filter(({ people }) => people.length > 0);

  return (
    <div className="nm-page-enter nm-page-shell">
      <div className="nm-label">Research Group</div>
      <h1 className="nm-page-title mb-10 sm:mb-14">The Lab</h1>

      {roles.map(({ role, people }) => (
        <RoleSection key={role} role={role} people={people} />
      ))}
    </div>
  );
}
