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
    <PublicationsList
      publications={publications}
      groupedByYear={groupedArray}
    />
  );
}
