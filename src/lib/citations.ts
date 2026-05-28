import type { Publication } from "@/lib/types";

export function formatApaCitation(pub: Publication): string {
  const authors =
    pub.authors.length > 0
      ? `${pub.authors.join(", ")} (${pub.year}).`
      : `(${pub.year}).`;
  return `${authors} ${pub.title}. ${pub.venue ? `*${pub.venue}*.` : ""}`;
}
