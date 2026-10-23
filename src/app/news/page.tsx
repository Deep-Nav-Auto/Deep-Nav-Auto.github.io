import { getNews } from "@/lib/content";

function formatNewsDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function NewsPage() {
  const news = getNews();

  return (
    <div className="nm-page-enter nm-page-shell">
      <div className="nm-label">Lab Updates</div>
      <h1 className="nm-page-title mb-10 sm:mb-16">News &amp; Announcements</h1>

      {news.length === 0 ? (
        <p className="font-sans text-[14px] font-light text-white/45">
          No news so far...
        </p>
      ) : (
        <div className="flex flex-col">
          {news.map((item) => (
            <article
              key={item.slug}
              id={item.slug}
              className="grid scroll-mt-24 grid-cols-1 gap-4 border-b border-[rgba(255,255,255,0.05)] py-6 last:border-0 md:grid-cols-[120px_1fr] md:gap-12 md:py-8"
            >
              <div className="flex flex-col items-start">
                <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-white/30">
                  {formatNewsDate(item.date)}
                </div>
                <div className="border-b border-[rgba(255,255,255,0.18)] pb-1 font-mono text-[9px] uppercase tracking-widest text-white/45">
                  {item.inline ? "Update" : "Announcement"}
                </div>
              </div>

              <div>
                <h2 className="mb-3 font-syne text-[18px] font-semibold leading-snug text-white">
                  {item.title}
                </h2>
                <p className="font-sans text-[14px] font-light leading-[1.75] text-white/45">
                  {item.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
