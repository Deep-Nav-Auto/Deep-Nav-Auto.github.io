import { PersonCard } from "@/components/team/PersonCard";
import type { Person } from "@/lib/types";

export function RoleSection({
  role,
  people,
}: {
  role: string;
  people: Person[];
}) {
  if (people.length === 0) return null;

  const isAlumni = role === "Alumni";

  return (
    <section className="mb-16">
      <div className="nm-label">{role}</div>

      {isAlumni ? (
        <div className="flex flex-col">
          {people.map((person) => (
            <PersonCard
              key={person.slug}
              person={person}
              role={role}
              variant="alumni-row"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {people.map((person) => (
            <PersonCard key={person.slug} person={person} role={role} />
          ))}
        </div>
      )}
    </section>
  );
}
