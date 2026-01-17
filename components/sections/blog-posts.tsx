"use client";

import { useState, useMemo, useEffect } from "react";
import type { BlogPost } from "@/lib/types";
import { Search, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DecryptedText } from "@/components/ui/decrypted-text";

interface BlogPostsProps {
  posts: BlogPost[];
}

export const BlogPosts = ({ posts }: BlogPostsProps) => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const customTags = ["Backend", "Frontend", "Full-stack", "Expermints"];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, search, selectedTag]);

  // Handle Ctrl + Backspace or Esc to close expanded post
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandedPostId) {
        const isBackspace = e.key === "Backspace" || e.keyCode === 8;
        const isEsc = e.key === "Escape";

        if ((isBackspace && e.ctrlKey) || isEsc) {
          setExpandedPostId(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedPostId]);

  return (
    <section className="space-y-12 py-12 relative font-body">
      {/* Main Filter UI */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4 flex-1 max-w-xl">
          <h2 className="text-[10px] font-outfit uppercase tracking-[0.4rem] text-muted-foreground/60">
            Explore thoughts
          </h2>
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground"
              size={16}
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-muted/20 border-t border-foreground/10 py-3 pl-10 pr-4 text-sm tracking-wider focus:outline-none focus:border-foreground/30 transition-all rounded-sm backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <button
            onClick={() => setSelectedTag(null)}
            className={cn(
              "text-[10px] font-outfit uppercase tracking-[0.2rem] transition-all relative pb-1",
              !selectedTag
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            All
          </button>
          {customTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "text-[10px] font-outfit uppercase tracking-[0.2rem] transition-all relative pb-1",
                selectedTag === tag
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-16">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const isExpanded = expandedPostId === post.id;

            return (
              <div
                key={post.id}
                className={cn(
                  "group relative space-y-6 transition-all duration-500",
                  isExpanded
                    ? "pt-4 pb-12 border-b border-foreground/5 text-center"
                    : "cursor-pointer",
                )}
                onClick={() => !isExpanded && setExpandedPostId(post.id)}
              >
                {/* Header Information */}
                <div
                  className={cn(
                    "flex items-center gap-4 text-[9px] font-outfit tracking-[0.25rem] text-muted-foreground/50 uppercase",
                    isExpanded ? "justify-center" : "justify-start",
                  )}
                >
                  <span>{post.date}</span>
                  <span className="w-4 h-[1px] bg-foreground/10"></span>
                  <span>{post.category}</span>
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <h3
                    className={cn(
                      "font-display leading-tight tracking-tight transition-all duration-500",
                      isExpanded
                        ? "text-4xl sm:text-5xl md:text-6xl font-medium"
                        : "text-3xl sm:text-4xl group-hover:text-muted-foreground",
                    )}
                  >
                    {isExpanded ? (
                      post.title
                    ) : (
                      <DecryptedText
                        text={post.title}
                        animateOn="hover"
                        speed={50}
                        className="block"
                      />
                    )}
                  </h3>

                  {!isExpanded && (
                    <p className="text-base text-muted-foreground/70 leading-relaxed max-w-2xl font-light">
                      {post.excerpt}
                    </p>
                  )}
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-1000 fill-mode-both">
                    <div className="prose prose-invert prose-white max-w-3xl pt-8 mx-auto prose-p:text-muted-foreground/80 prose-p:leading-relaxed prose-headings:font-display prose-headings:font-medium prose-strong:text-foreground">
                      <div className="whitespace-pre-wrap text-[17px] sm:text-[19px] leading-[1.8] font-light font-body tracking-tight text-center">
                        {post.content}
                      </div>
                    </div>

                    <div className="mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-foreground/5 pt-10 px-4">
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-outfit uppercase tracking-[0.2rem] text-muted-foreground/40 px-3 py-1 border border-foreground/5 bg-white/[0.01] rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col items-center sm:items-end gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedPostId(null);
                          }}
                          className="flex items-center gap-3 text-[10px] font-outfit uppercase tracking-[0.3rem] text-foreground border border-foreground/10 px-6 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
                        >
                          <X size={14} />
                          Collapse Reading
                        </button>
                        <div className="flex items-center gap-1.5 text-[9px] font-body uppercase tracking-[0.2rem] opacity-30 hidden sm:flex">
                          <span className="border border-foreground/20 px-1 rounded-sm">
                            Ctrl
                          </span>
                          <span>+</span>
                          <span className="border border-foreground/20 px-1 rounded-sm text-[11px]">
                            ⌫
                          </span>
                          <span className="ml-1">to close</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer / Meta (when not expanded) */}
                {!isExpanded && (
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-outfit uppercase tracking-[0.1rem] text-muted-foreground/40 px-2 py-0.5 border border-foreground/5 bg-white/[0.01]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-outfit uppercase tracking-[0.2rem] text-foreground/40 group-hover:text-foreground/80 transition-colors">
                      Read post <ChevronRight size={10} />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center text-muted-foreground font-outfit uppercase tracking-[0.3rem] opacity-40">
            No posts found.
          </div>
        )}
      </div>
    </section>
  );
};
