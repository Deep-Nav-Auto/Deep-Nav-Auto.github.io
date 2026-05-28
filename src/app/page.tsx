import Image from "next/image";
import Link from "next/link";
import {
  getAboutPage,
  getLatestNews,
  getSelectedPublications,
} from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { MarkdownContent } from "@/components/markdown/MarkdownContent";
import { NewsFeed } from "@/components/news/NewsFeed";
import { BibEntry } from "@/components/publications/BibEntry";
import { normalizeAssetPath } from "@/lib/utils";

export default function HomePage() {
  const about = getAboutPage();
  const news = getLatestNews();
  const selected = getSelectedPublications();
  const profileImage = normalizeAssetPath(
    about.profile?.image ? `img/${about.profile.image}` : undefined,
  );

  return (
    <article>
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-bold tracking-tight">
          {about.title}
        </h1>
      </header>

      <div className="relative clearfix">
        {profileImage && (
          <div
            className={`mb-6 ${about.profile?.align === "left" ? "float-left mr-6" : "float-right ml-6"} max-w-xs`}
          >
            <Image
              src={profileImage}
              alt="Lab profile"
              width={400}
              height={300}
              className={`h-auto w-full shadow-md ${about.profile?.imageCircular ? "rounded-full" : "rounded-lg"}`}
              priority
            />
          </div>
        )}
        <MarkdownContent
          content={about.content}
          className="prose prose-neutral max-w-none dark:prose-invert"
        />
      </div>

      {about.news && siteConfig.announcements.enabled && (
        <section className="mt-10 clear-both">
          <h2 className="mb-4 font-serif text-2xl font-semibold">
            <Link href="/news" className="hover:text-[var(--theme-color)]">
              news
            </Link>
          </h2>
          <NewsFeed
            items={news}
            scrollable={siteConfig.announcements.scrollable}
          />
        </section>
      )}

      {about.selectedPapers && selected.length > 0 && (
        <section className="mt-10 clear-both">
          <h2 className="mb-4 font-serif text-2xl font-semibold">
            <Link
              href="/publications"
              className="hover:text-[var(--theme-color)]"
            >
              selected publications
            </Link>
          </h2>
          <div>
            {selected.map((pub) => (
              <BibEntry key={pub.key} publication={pub} />
            ))}
          </div>
        </section>
      )}

      {about.social && (
        <section className="mt-10 clear-both text-sm">
          <p>
            <a
              href={`mailto:${siteConfig.social.email}`}
              className="text-[var(--theme-color)] hover:underline"
            >
              {siteConfig.social.email}
            </a>
            {siteConfig.social.linkedin && (
              <>
                {" · "}
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--theme-color)] hover:underline"
                >
                  LinkedIn
                </a>
              </>
            )}
            {siteConfig.social.workUrl && (
              <>
                {" · "}
                <a
                  href={siteConfig.social.workUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--theme-color)] hover:underline"
                >
                  UCalgary profile
                </a>
              </>
            )}
          </p>
        </section>
      )}
    </article>
  );
}
