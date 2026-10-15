"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  readonly content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // Visible, underlined links; external ones open in a new tab.
        a: ({ href, children }) => {
          const external = /^https?:\/\//.test(href ?? "");
          return (
            <a
              href={href}
              className="font-medium text-foreground underline underline-offset-4 decoration-foreground/40 hover:decoration-foreground"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
