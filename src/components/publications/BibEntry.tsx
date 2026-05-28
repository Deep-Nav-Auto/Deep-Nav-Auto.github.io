"use client";

import { useState } from "react";
import type { Publication } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { formatApaCitation } from "@/lib/citations";
import { CitationModal } from "@/components/publications/CitationModal";
import { Button } from "@/components/ui/button";
import { normalizeAssetPath } from "@/lib/utils";

export function BibEntry({ publication }: { publication: Publication }) {
  const [showAbstract, setShowAbstract] = useState(false);
  const limit = siteConfig.scholar.maxAuthorLimit;
  const authors =
    publication.authors.length > limit
      ? [
          ...publication.authors.slice(0, limit),
          `+${publication.authors.length - limit} more`,
        ]
      : publication.authors;

  const pdfHref = normalizeAssetPath(
    publication.pdf?.includes("://")
      ? publication.pdf
      : publication.pdf
        ? `pdf/${publication.pdf}`
        : undefined,
  );

  return (
    <article className="border-b border-[var(--divider)] py-5 last:border-0">
      <div className="text-sm text-[var(--text-muted)]">{authors.join(", ")}</div>
      <h3 className="mt-1 font-semibold leading-snug">
        {publication.url ? (
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--theme-color)] hover:underline"
          >
            {publication.title}
          </a>
        ) : (
          publication.title
        )}
      </h3>
      <p className="mt-1 text-sm italic text-[var(--text-muted)]">
        {publication.venue}
        {publication.year ? `, ${publication.year}` : ""}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {pdfHref && (
          <Button variant="outline" size="sm" asChild>
            <a href={pdfHref} target="_blank" rel="noopener noreferrer">
              PDF
            </a>
          </Button>
        )}
        {publication.code && (
          <Button variant="outline" size="sm" asChild>
            <a href={publication.code} target="_blank" rel="noopener noreferrer">
              Code
            </a>
          </Button>
        )}
        {publication.doi && (
          <Button variant="outline" size="sm" asChild>
            <a
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              DOI
            </a>
          </Button>
        )}
        {publication.abstract && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAbstract((v) => !v)}
          >
            {showAbstract ? "Hide abstract" : "Abstract"}
          </Button>
        )}
        {publication.bibtexShow && (
          <CitationModal bibtex={publication.bibtex} title={publication.title} />
        )}
      </div>

      {showAbstract && publication.abstract && (
        <div className="prose prose-sm mt-3 max-w-none dark:prose-invert">
          <p className="text-sm leading-relaxed">{publication.abstract}</p>
        </div>
      )}

      <p className="mt-2 hidden text-xs text-[var(--text-muted)] sm:block">
        {formatApaCitation(publication)}
      </p>
    </article>
  );
}
