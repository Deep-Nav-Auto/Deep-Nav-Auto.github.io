import { getAllGalleryItems } from "@/lib/content";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";

export const metadata = {
  title: "Gallery",
  description:
    "Visual archive of field work, conferences, lab life, and research milestones at the Intelligent Navigation and Mapping Lab.",
};

export default function GalleryPage() {
  const items = getAllGalleryItems();

  return (
    <div className="nm-page-enter nm-page-shell">
      <div className="nm-label">Visual Archive</div>
      <h1 className="nm-page-title mb-8 sm:mb-10">Gallery</h1>
      <GalleryExperience items={items} mode="page" />
    </div>
  );
}
