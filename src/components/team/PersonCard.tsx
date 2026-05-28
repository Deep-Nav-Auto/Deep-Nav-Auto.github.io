"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Person } from "@/lib/types";
import { cn, normalizeAssetPath } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LinkedInIcon } from "@/components/team/LinkedInIcon";

interface PersonCardProps {
  person: Person;
  role: string;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function PersonCard({ person, role }: PersonCardProps) {
  const [open, setOpen] = useState(false);
  const imageSrc = normalizeAssetPath(person.image);

  return (
    <>
      <article
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-[var(--divider)] bg-[var(--card-bg)] shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-[var(--theme-color)]"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View profile for ${person.name}`}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--divider)]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={person.name}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--theme-color)]/20 to-[var(--theme-color)]/5">
              <span className="font-serif text-4xl font-bold text-[var(--theme-color)]">
                {getInitials(person.name)}
              </span>
            </div>
          )}

          {/* Hover overlay — LinkedIn icon or view hint */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {person.linkedin ? (
              <Link
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-lg transition-transform hover:scale-110"
                aria-label={`${person.name} on LinkedIn`}
                onClick={(e) => e.stopPropagation()}
              >
                <LinkedInIcon className="h-6 w-6" />
              </Link>
            ) : (
              <span className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                View profile
              </span>
            )}
          </div>

          {/* Name strip */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-12">
            <h3 className="truncate text-center text-sm font-semibold text-white sm:text-base">
              {person.name}
            </h3>
          </div>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-xl border border-[var(--divider)]">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={person.name}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[var(--theme-color)]/10">
                    <span className="text-2xl font-bold text-[var(--theme-color)]">
                      {getInitials(person.name)}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left">
                <DialogTitle className="text-xl">
                  {person.url ? (
                    <Link
                      href={person.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--theme-color)] hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {person.name}
                      <ExternalLink className="h-4 w-4 shrink-0" />
                    </Link>
                  ) : (
                    person.name
                  )}
                </DialogTitle>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{role}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 text-sm leading-relaxed">
            {person.researchInterests && (
              <div>
                <h4 className="mb-1 font-semibold text-[var(--text)]">
                  Research interests
                </h4>
                <p className="text-[var(--text-muted)]">
                  {person.researchInterests}
                </p>
              </div>
            )}
            {person.about && (
              <div>
                <h4 className="mb-1 font-semibold text-[var(--text)]">About</h4>
                <p className="text-[var(--text-muted)]">{person.about}</p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 border-t border-[var(--divider)] pt-4">
            {person.linkedin && (
              <Link
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#0A66C2] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#004182]"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </Link>
            )}
            {person.github && (
              <Link
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--divider)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--card-bg)]"
              >
                GitHub
              </Link>
            )}
            {person.website && (
              <Link
                href={person.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--divider)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--card-bg)]"
              >
                Website
              </Link>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
