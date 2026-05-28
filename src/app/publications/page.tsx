import {
  getPublications,
  groupPublicationsByYear,
} from "@/lib/content";
import { PublicationsList } from "@/components/publications/PublicationsList";

export const metadata = {
  title: "Publications",
  description: "Publications by the Intelligent Navigation and Mapping Lab.",
};

export default function PublicationsPage() {
  const publications = getPublications();
  const grouped = groupPublicationsByYear(publications);
  const groupedArray = Array.from(grouped.entries());

  return (
    <div>
      <h1 className="mb-2 font-serif text-3xl font-bold">Publications</h1>
      <p className="mb-8 text-[var(--text-muted)]">
        Publications in reversed chronological order.
      </p>
      <PublicationsList
        publications={publications}
        groupedByYear={groupedArray}
      />
    </div>
  );
}
