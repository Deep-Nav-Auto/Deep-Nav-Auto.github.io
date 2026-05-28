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

  return (
    <section className="mb-14">
      <h2 className="mb-6 font-serif text-2xl font-semibold tracking-tight">
        {role}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {people.map((person) => (
          <PersonCard key={person.slug} person={person} role={role} />
        ))}
      </div>
    </section>
  );
}
