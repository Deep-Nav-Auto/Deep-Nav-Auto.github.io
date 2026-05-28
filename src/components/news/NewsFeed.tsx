import Link from "next/link";
import type { NewsItem } from "@/lib/types";

interface NewsFeedProps {
  items: NewsItem[];
  scrollable?: boolean;
}

export function NewsFeed({ items, scrollable }: NewsFeedProps) {
  if (items.length === 0) {
    return <p className="text-[var(--text-muted)]">No news so far...</p>;
  }

  return (
    <div
      className={scrollable ? "max-h-64 overflow-y-auto pr-2" : undefined}
    >
      <table className="w-full text-sm">
        <tbody>
          {items.map((item) => (
            <tr key={item.slug} className="border-b border-[var(--divider)] last:border-0">
              <th className="w-28 shrink-0 py-2 pr-4 text-left font-normal text-[var(--text-muted)]">
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </th>
              <td className="py-2">
                {item.inline ? (
                  <span>{item.content}</span>
                ) : (
                  <Link
                    href={`/news#${item.slug}`}
                    className="font-medium text-[var(--theme-color)] hover:underline"
                  >
                    {item.title}
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
