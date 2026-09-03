"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { GalleryItem } from "@/lib/types";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryCard } from "@/components/gallery/GalleryCard";
import { ArticleModal } from "@/components/gallery/ArticleModal";

interface GalleryExperienceProps {
  items: GalleryItem[];
  mode: "page" | "preview";
  previewItems?: GalleryItem[];
}

function GalleryExperienceInner({
  items,
  mode,
  previewItems,
}: GalleryExperienceProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const itemParam = searchParams.get("item");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const modalItems = useMemo(() => items, [items]);

  const shareUrl = useCallback(
    (slug: string) => {
      if (typeof window === "undefined") return "";
      const path =
        mode === "page" ? `/gallery?item=${slug}` : `${pathname}?item=${slug}`;
      return `${window.location.origin}${path}`;
    },
    [mode, pathname],
  );

  const openItem = useCallback(
    (slug: string) => {
      setActiveSlug(slug);
      const params = new URLSearchParams(searchParams.toString());
      params.set("item", slug);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const closeModal = useCallback(() => {
    setActiveSlug(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("item");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const navigateItem = useCallback(
    (slug: string) => {
      setActiveSlug(slug);
      const params = new URLSearchParams(searchParams.toString());
      params.set("item", slug);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (itemParam && modalItems.some((i) => i.slug === itemParam)) {
      setActiveSlug(itemParam);
    } else if (!itemParam) {
      setActiveSlug(null);
    }
  }, [itemParam, modalItems]);

  const displayPreview = previewItems ?? items.filter((i) => i.featured).slice(0, 6);

  if (mode === "preview") {
    return (
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayPreview.map((item) => (
            <GalleryCard
              key={item.slug}
              item={item}
              onOpen={openItem}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ))}
        </div>
        <div className="mt-10">
          <Link href="/gallery" className="nm-btn-xs">
            View Full Gallery →
          </Link>
        </div>
        <ArticleModal
          items={modalItems}
          activeSlug={activeSlug}
          onClose={closeModal}
          onNavigate={navigateItem}
          shareUrl={shareUrl}
        />
      </>
    );
  }

  return (
    <>
      <GalleryGrid items={items} onOpen={openItem} />
      <ArticleModal
        items={modalItems}
        activeSlug={activeSlug}
        onClose={closeModal}
        onNavigate={navigateItem}
        shareUrl={shareUrl}
      />
    </>
  );
}

export function GalleryExperience(props: GalleryExperienceProps) {
  return (
    <Suspense fallback={null}>
      <GalleryExperienceInner {...props} />
    </Suspense>
  );
}
