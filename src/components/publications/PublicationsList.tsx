"use client";

import { useMemo, useState } from "react";
import type { Publication } from "@/lib/types";
import { normalizeAssetPath } from "@/lib/utils";
import { CitationModal } from "@/components/publications/CitationModal";

interface PublicationsListProps {
  publications: Publication[];
  groupedByYear: Array<[number, Publication[]]>;
}

export function PublicationsList({
  publications,
  groupedByYear,
}: PublicationsListProps) {
  const [filter, setFilter] = useState<"All" | "Journal" | "Conference">("All");

  const filteredGroups = useMemo(() => {
    return groupedByYear
      .map(([year, pubs]) => {
        const filtered = pubs.filter((p) => {
          if (filter === "All") return true;
          const displayType =
            p.type === "article"
              ? "Journal"
              : p.type === "inproceedings"
                ? "Conference"
                : p.type;
          return displayType.toLowerCase() === filter.toLowerCase();
        });
        return [year, filtered] as [number, Publication[]];
      })
      .filter(([, pubs]) => pubs.length > 0);
  }, [groupedByYear, filter]);

  return (
    <div className="nm-page-enter nm-page-shell">
      <div className="nm-label">Research Output</div>
      <h1 className="nm-page-title mb-8 sm:mb-10">Publications</h1>

      {/* Filter Chips */}
      <div className="mb-10 flex flex-wrap gap-2 sm:mb-14">
        {(["All", "Journal", "Conference"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`nm-chip ${filter === f ? "active" : ""}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grouped by year */}
      {filteredGroups.map(([year, pubs]) => (
        <div key={year} className="mb-12">
          <div className="font-mono text-[10px] text-white/28 uppercase tracking-widest pb-4 border-b border-[rgba(255,255,255,0.08)] mb-1">
            {year}
          </div>
          {pubs.map((pub) => {
            const displayType =
              pub.type === "article"
                ? "Journal"
                : pub.type === "inproceedings"
                  ? "Conference"
                  : pub.type;

            const pdfHref = normalizeAssetPath(
              pub.pdf?.includes("://")
                ? pub.pdf
                : pub.pdf
                  ? `pdf/${pub.pdf}`
                  : undefined,
            );

            return (
              <div key={pub.key} className="nm-pub-row">
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <span className="nm-tag">{displayType}</span>
                    {pub.tags && pub.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="nm-tag">{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-syne font-semibold text-[16px] text-white leading-snug mb-2">
                    {pub.title}
                  </h3>
                  <div className="font-sans font-light text-[13px] text-white/45 mb-1">
                    {pub.authors.join(", ")}
                  </div>
                  <div className="font-sans font-light text-[13px] text-white/30 italic">
                    {pub.venue}
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0 items-end pt-1">
                  {pdfHref && (
                    <a
                      href={pdfHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nm-btn-xs text-center min-w-[70px]"
                    >
                      PDF
                    </a>
                  )}
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nm-btn-xs text-center min-w-[70px]"
                    >
                      DOI
                    </a>
                  )}
                  {pub.bibtexShow && (
                    <CitationModal bibtex={pub.bibtex} title={pub.title} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {filteredGroups.length === 0 && (
        <p className="font-sans font-light text-white/45">
          No publications found matching the filter.
        </p>
      )}
    </div>
  );
}
