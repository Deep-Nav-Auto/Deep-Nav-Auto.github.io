"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/lib/types";
import { BibEntry } from "@/components/publications/BibEntry";

interface PublicationsListProps {
  publications: Publication[];
  groupedByYear: Array<[number, Publication[]]>;
}

export function PublicationsList({
  publications,
  groupedByYear,
}: PublicationsListProps) {
  const types = useMemo(
    () => [...new Set(publications.map((p) => p.type))].sort(),
    [publications],
  );
  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a),
    [publications],
  );

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  const filteredGroups = useMemo(() => {
    return groupedByYear
      .map(([year, pubs]) => {
        const filtered = pubs.filter((p) => {
          if (typeFilter !== "all" && p.type !== typeFilter) return false;
          if (yearFilter !== "all" && p.year !== Number(yearFilter)) return false;
          if (!query.trim()) return true;
          const q = query.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.authors.some((a) => a.toLowerCase().includes(q)) ||
            p.venue.toLowerCase().includes(q) ||
            (p.tags?.some((t) => t.toLowerCase().includes(q)) ?? false)
          );
        });
        return [year, filtered] as [number, Publication[]];
      })
      .filter(([, pubs]) => pubs.length > 0);
  }, [groupedByYear, query, typeFilter, yearFilter]);

  return (
    <div>
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <input
          type="search"
          placeholder="Search title, author, venue..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-md border border-[var(--divider)] bg-[var(--card-bg)] px-3 py-2 text-sm"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-md border border-[var(--divider)] bg-[var(--card-bg)] px-3 py-2 text-sm"
        >
          <option value="all">All types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="rounded-md border border-[var(--divider)] bg-[var(--card-bg)] px-3 py-2 text-sm"
        >
          <option value="all">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {filteredGroups.map(([year, pubs]) => (
        <section key={year} className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{year}</h2>
          {pubs.map((pub) => (
            <BibEntry key={pub.key} publication={pub} />
          ))}
        </section>
      ))}

      {filteredGroups.length === 0 && (
        <p className="text-[var(--text-muted)]">No publications match your filters.</p>
      )}
    </div>
  );
}
