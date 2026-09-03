"use client";

import { useMemo, useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/lib/types";
import { GalleryCard } from "@/components/gallery/GalleryCard";

const CATEGORIES: Array<GalleryCategory | "All"> = [
  "All",
  "Field Work",
  "Conference",
  "Lab",
  "Equipment",
  "Team",
];

interface GalleryGridProps {
  items: GalleryItem[];
  onOpen: (slug: string) => void;
}

export function GalleryGrid({ items, onOpen }: GalleryGridProps) {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");

  const filtered = useMemo(() => {
    if (filter === "All") return items;
    return items.filter((item) => item.category === filter);
  }, [items, filter]);

  return (
    <div>
      <div className="mb-14 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`nm-chip ${filter === c ? "active" : ""}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="nm-gallery-masonry">
        {filtered.map((item) => (
          <GalleryCard key={item.slug} item={item} onOpen={onOpen} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="font-sans text-[14px] font-light text-white/45">
          No gallery items in this category yet.
        </p>
      )}
    </div>
  );
}
