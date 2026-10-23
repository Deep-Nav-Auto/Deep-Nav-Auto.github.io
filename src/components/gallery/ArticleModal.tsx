"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { GalleryItem } from "@/lib/types";
import { MarkdownContent } from "@/components/markdown/MarkdownContent";

interface ArticleModalProps {
  items: GalleryItem[];
  activeSlug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  shareUrl: (slug: string) => string;
}

function formatMembers(members: string[]): string {
  if (members.length === 1 && members[0].toLowerCase() === "all") {
    return "the full lab team";
  }
  return members.join(", ");
}

export function ArticleModal({
  items,
  activeSlug,
  onClose,
  onNavigate,
  shareUrl,
}: ArticleModalProps) {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeIndex = items.findIndex((i) => i.slug === activeSlug);
  const item = activeIndex >= 0 ? items[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (activeIndex <= 0) return;
    onNavigate(items[activeIndex - 1].slug);
  }, [activeIndex, items, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex < 0 || activeIndex >= items.length - 1) return;
    onNavigate(items[activeIndex + 1].slug);
  }, [activeIndex, items, onNavigate]);

  const isOpen = Boolean(activeSlug && item);

  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      setVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!activeSlug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeSlug, onClose, goPrev, goNext]);

  const handleClose = () => {
    setVisible(false);
    window.setTimeout(onClose, 250);
  };

  const handleShare = async () => {
    if (!item) return;
    const url = shareUrl(item.slug);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (!activeSlug || !item) return null;

  return (
    <div
      className={`nm-gallery-modal-overlay fixed inset-0 z-[500] flex items-center justify-center bg-[rgba(0,0,0,0.82)] backdrop-blur-[8px] transition-opacity duration-[250ms] ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {activeIndex > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="nm-gallery-nav-btn absolute left-2 top-1/2 z-[510] -translate-y-1/2 sm:left-[max(12px,calc(50%-580px))]"
          aria-label="Previous item"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {activeIndex < items.length - 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          className="nm-gallery-nav-btn absolute right-2 top-1/2 z-[510] -translate-y-1/2 sm:right-[max(12px,calc(50%-580px))]"
          aria-label="Next item"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <div
        ref={panelRef}
        className={`nm-gallery-modal-panel absolute left-1/2 top-1/2 max-h-[92vh] w-[calc(100vw-1rem)] max-w-[1100px] -translate-x-1/2 overflow-y-auto border border-[rgba(255,255,255,0.1)] bg-[#0A0A0A] transition-[opacity,transform] duration-[350ms] ease-out sm:max-h-[85vh] sm:w-[85vw] ${
          visible
            ? "-translate-y-1/2 opacity-100"
            : "-translate-y-[calc(50%-40px)] opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-6 top-5 z-10 font-syne text-[13px] text-white/40 transition-colors hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div
          key={item.slug}
          className="animate-[nm-gallery-content-in_0.2s_ease-in-out_forwards]"
        >
          <div className="relative h-[36vh] min-h-[200px] w-full sm:h-[45vh] sm:min-h-[240px]">
            <Image
              src={item.cover}
              alt={item.title}
              fill
              className="object-cover"
              sizes="85vw"
              priority
            />
          </div>

          <div className="px-5 py-6 sm:px-12 sm:py-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="nm-tag">{item.category}</span>
              {item.location && (
                <span className="font-mono text-[9px] text-white/50">
                  {item.location}
                </span>
              )}
              <span className="font-mono text-[9px] text-white/30">
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h2
              id="gallery-modal-title"
              className="font-syne font-extrabold text-white"
              style={{
                fontSize: "clamp(28px, 3.5vw, 48px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              {item.title}
            </h2>

            {item.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="nm-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {item.members.length > 0 && (
              <p className="mt-5 font-sans text-[13px] font-light text-white/40">
                <span className="text-white/55">Featuring:</span>{" "}
                {formatMembers(item.members)}
              </p>
            )}

            <hr className="my-10 border-0 border-t border-[rgba(255,255,255,0.08)]" />

            <MarkdownContent
              content={item.content}
              className="nm-gallery-article mx-auto max-w-[680px]"
            />

            <hr className="my-10 border-0 border-t border-[rgba(255,255,255,0.08)]" />

            <div className="flex flex-wrap items-center gap-4">
              <button type="button" onClick={handleClose} className="nm-btn-ghost">
                ← Back to Gallery
              </button>
              <button type="button" onClick={handleShare} className="nm-btn-xs">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
