import Link from "next/link";
import { HeroEarthScene } from "@/components/home/HeroEarthSceneDynamic";
import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import {
  getAllGalleryItems,
  getFeaturedGalleryItems,
  getLatestNews,
  getPublications,
} from "@/lib/content";
import { normalizeAssetPath } from "@/lib/utils";

export default function HomePage() {
  const news = getLatestNews(4);
  const publications = getPublications().slice(0, 3);
  const galleryItems = getAllGalleryItems();
  const featuredGallery = getFeaturedGalleryItems(6);

  return (
    <article className="nm-page-enter">
      {/* HERO — full-viewport WebGL + copy in safe zones */}
      <section className="nm-hero nm-dot-grid relative h-[calc(100vh-var(--navbar-height))] overflow-x-hidden bg-black">
        <HeroEarthScene />

        <div className="nm-crosshair tl" />
        <div className="nm-crosshair tr" />
        <div className="nm-crosshair bl" />
        <div className="nm-crosshair br" />

        <div className="nm-hero-overlay pointer-events-none relative z-10 grid h-full grid-rows-[auto_1fr_auto]">
          <div className="nm-hero-copy nm-fade-up nm-delay-0 px-4 pt-6 text-center sm:px-6 sm:pt-8 md:pt-10">
            <div className="nm-label nm-label-centered mx-auto mb-4 w-fit">
              University of Calgary
            </div>
            <h1 className="font-syne text-[clamp(22px,4vw,36px)] font-extrabold tracking-tight text-white">
              Intelligent Navigation &amp; Mapping Lab
            </h1>
          </div>

          <div aria-hidden="true" />

          <p className="nm-hero-copy nm-fade-up nm-delay-2 mx-auto max-w-[440px] px-4 pb-6 pt-2 text-center font-sans text-[14px] font-light leading-relaxed text-white/40 sm:px-6 sm:pb-10 sm:pt-4 md:pb-12 md:text-[15px]">
            Fusing GNSS, IMU, LiDAR, radar, and vision to navigate the world
            with precision.
          </p>
        </div>
      </section>

      {/* CTA + stats — revealed on scroll */}
      <section className="border-b border-[rgba(255,255,255,0.06)] bg-black pt-14 pb-[75px] sm:pt-20 md:pt-28 md:pb-[102px]">
        <div className="nm-section mx-auto flex max-w-[800px] justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/gallery" className="nm-btn-primary">
              Explore Gallery
            </Link>
            <Link href="/publications" className="nm-btn-ghost">
              View Publications
            </Link>
          </div>
        </div>

        <div className="nm-stats-bar-wrap">
          <div className="nm-stats-bar">
            <div className="nm-stat-cell">
              <div className="nm-stat-value font-syne font-extrabold">
                30+
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-white/25">
                Publications
              </div>
            </div>
            <div className="nm-stat-cell">
              <div className="nm-stat-value font-syne font-extrabold">
                {featuredGallery.length}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-white/25">
                Gallery Stories
              </div>
            </div>
            <div className="nm-stat-cell">
              <div className="nm-stat-value font-syne font-extrabold">
                8
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-white/25">
                Lab Members
              </div>
            </div>
            <div className="nm-stat-cell">
              <div className="nm-stat-value font-syne font-extrabold">
                2023
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-white/25">
                Founded
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH PILLARS */}
      <section className="nm-section bg-black py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="nm-label">Research Focus</div>
          <div className="nm-hairline-grid grid-cols-1 md:grid-cols-3">
            <div className="nm-card p-6 sm:p-10">
              <div className="font-mono text-[22px] text-white/20 mb-5">◎</div>
              <h3 className="font-syne font-bold text-[19px] text-white mb-3">
                Sensor Integration
              </h3>
              <p className="font-sans font-light text-[14px] leading-[1.75] text-white/45">
                Tightly-coupled fusion of GNSS, IMU, LiDAR, radar, camera, and
                odometer data for robust, redundant positioning across all
                environments.
              </p>
            </div>
            <div className="nm-card p-6 sm:p-10">
              <div className="font-mono text-[22px] text-white/20 mb-5">⬡</div>
              <h3 className="font-syne font-bold text-[19px] text-white mb-3">
                Machine Learning
              </h3>
              <p className="font-sans font-light text-[14px] leading-[1.75] text-white/45">
                Deep learning models for navigation: learned sensor calibration,
                uncertainty estimation, spoofing detection, and adaptive Kalman
                filtering.
              </p>
            </div>
            <div className="nm-card p-6 sm:p-10">
              <div className="font-mono text-[22px] text-white/20 mb-5">⊕</div>
              <h3 className="font-syne font-bold text-[19px] text-white mb-3">
                Autonomous Navigation
              </h3>
              <p className="font-sans font-light text-[14px] leading-[1.75] text-white/45">
                End-to-end navigation stacks for autonomous ground vehicles,
                UAVs, and mobile robots — from real-time SLAM to HD map
                construction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="nm-section bg-black pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
            <div className="nm-label mb-0">From the Field</div>
          </div>
          <GalleryExperience
            items={galleryItems}
            previewItems={featuredGallery}
            mode="preview"
          />
        </div>
      </section>

      {/* RECENT PUBLICATIONS */}
      <section className="nm-section bg-black pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,255,255,0.06)] pb-4">
            <div className="nm-label mb-0">Recent Publications</div>
            <Link href="/publications" className="nm-btn-xs">
              View All &rarr;
            </Link>
          </div>

          <div className="flex flex-col">
            {publications.map((pub) => {
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
                    <div className="flex gap-2 mb-2 flex-wrap items-center">
                      <span className="nm-tag">{displayType}</span>
                      <span className="font-mono text-[9px] text-white/28">
                        {pub.year}
                      </span>
                    </div>
                    <h3 className="font-syne font-semibold text-[15px] text-white leading-snug mb-1.5">
                      {pub.title}
                    </h3>
                    <div className="font-sans font-light text-[13px] text-white/45 mb-1">
                      {pub.authors.join(", ")}
                    </div>
                    <div className="font-sans font-light text-[13px] text-white/30 italic">
                      {pub.venue}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 items-start pt-1">
                    {pdfHref && (
                      <a
                        href={pdfHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nm-btn-xs"
                      >
                        PDF
                      </a>
                    )}
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nm-btn-xs"
                      >
                        DOI
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEWS + JOIN THE LAB */}
      <section className="nm-section bg-black pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Latest News */}
          <div>
            <div className="nm-label mb-6">Latest News</div>
            <div className="flex flex-col gap-6">
              {news.map((item) => (
                <div
                  key={item.slug}
                  className="border-b border-[rgba(255,255,255,0.05)] pb-6 last:border-0"
                >
                  <div className="flex gap-3 items-baseline mb-2">
                    <span className="font-mono text-[9px] text-white/30">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="nm-tag">Update</span>
                  </div>
                  <h4 className="font-syne font-semibold text-[14px] text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="font-sans font-light text-[13px] leading-relaxed text-white/45 line-clamp-2">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Join the Lab CTA Card */}
          <div className="nm-card relative flex flex-col justify-center overflow-hidden p-6 sm:p-12">
            {/* Concentric Circles Decor */}
            <div className="pointer-events-none absolute right-[-110px] top-1/2 h-[220px] w-[220px] -translate-y-1/2 rounded-full border border-white/[0.03]" />
            <div
              className="absolute right-[-80px] top-1/2 -translate-y-1/2 width-[160px] height-[160px] rounded-full border border-white/[0.03] pointer-events-none"
              style={{ width: 160, height: 160 }}
            />
            <div className="pointer-events-none absolute right-[-50px] top-1/2 h-[100px] w-[100px] -translate-y-1/2 rounded-full border border-white/[0.03]" />

            <div className="relative z-10">
              <div className="nm-label">Join the Lab</div>
              <h2 className="font-syne font-extrabold text-[24px] text-white mb-4 leading-tight">
                We&apos;re Looking for
                <br />
                Curious Minds
              </h2>
              <p className="font-sans font-light text-[14px] leading-relaxed text-white/45 mb-8">
                We welcome motivated graduate students and researchers
                passionate about autonomous navigation, sensor fusion, and
                intelligent systems.
              </p>
              <Link href="/contact" className="nm-btn-primary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
