import type { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Image from "next/image";
import { normalizeAssetPath } from "@/lib/utils";
import "katex/dist/katex.min.css";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

type RehypePlugins = NonNullable<ComponentProps<typeof ReactMarkdown>["rehypePlugins"]>;
const katexPlugins = [rehypeKatex] as unknown as RehypePlugins;

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={katexPlugins}
        components={{
          img: ({ src, alt }) => {
            const imageSrc = normalizeAssetPath(typeof src === "string" ? src : "");
            if (!imageSrc) return null;
            return (
              <span className="my-4 block">
                <Image
                  src={imageSrc}
                  alt={alt ?? ""}
                  width={800}
                  height={500}
                  className="h-auto w-full max-w-md rounded-lg"
                />
              </span>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[var(--theme-color)] underline-offset-2 hover:underline"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
