"use client";

import Image from "next/image";
import type { GalleryItem } from "@/lib/types";

interface GalleryCardProps {
  item: GalleryItem;
  onOpen: (slug: string) => void;
  sizes?: string;
}

export function GalleryCard({ item, onOpen, sizes }: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item.slug)}
      className="nm-gallery-card group relative mb-4 w-full cursor-pointer break-inside-avoid overflow-hidden border border-[rgba(255,255,255,0.06)] text-left transition-[border-color] duration-300 hover:border-[rgba(255,255,255,0.18)]"
    >
      <div className="relative w-full">
        <Image
          src={item.cover}
          alt={item.title}
          width={800}
          height={600}
          className="h-auto w-full object-cover"
          sizes={sizes ?? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        />
        <div className="nm-gallery-card-overlay absolute inset-0 flex translate-y-2 flex-col justify-end bg-[rgba(0,0,0,0.55)] p-5 opacity-0 transition-[opacity,transform] duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="nm-tag mb-2 w-fit">{item.category}</span>
          <h3 className="font-syne text-[16px] font-semibold leading-snug text-white">
            {item.title}
          </h3>
          <p className="mt-1 truncate font-sans text-[13px] font-light text-white/70">
            {item.excerpt}
          </p>
          {item.location && (
            <p className="mt-2 font-mono text-[9px] text-white/60">{item.location}</p>
          )}
        </div>
      </div>
    </button>
  );
}
