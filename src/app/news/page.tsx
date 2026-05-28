import { getNews } from "@/lib/content";
import { NewsFeed } from "@/components/news/NewsFeed";

export const metadata = {
  title: "News",
  description: "News and announcements from the lab.",
};

export default function NewsPage() {
  const news = getNews();

  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl font-bold">News</h1>
      <NewsFeed items={news} />
      <div className="mt-8 space-y-8">
        {news
          .filter((item) => !item.inline)
          .map((item) => (
            <article key={item.slug} id={item.slug} className="scroll-mt-20">
              <h2 className="font-serif text-xl font-semibold">{item.title}</h2>
              <p className="text-sm text-[var(--text-muted)]">
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-2 leading-relaxed">{item.content}</p>
            </article>
          ))}
      </div>
    </div>
  );
}
