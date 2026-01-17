"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Coffee, ArrowLeft } from "lucide-react";

import { Footer } from "@/components/sections/footer";
import { BlogHeroSection } from "@/components/sections/blog-hero-section";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { BLOG_POSTS } from "@/lib/content";

const logger = getWebLogger();
logger.info("Loaded blog page module", { page: "Blog" });

/**
 * Minimal blog listing page with hero section, search functionality, and streamlined layout.
 * @returns The blog listing page markup.
 */
const BlogPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(BLOG_POSTS[0]?.id || null);
  
  /**
   * Buy Me Coffee URL - update with your actual Buy Me Coffee link
   */
  const BUY_ME_COFFEE_URL = "https://buymeacoffee.com/jack"; // Update with your actual link

  /**
   * Handles keyboard shortcuts:
   * - 'B' key to navigate home
   * - Ctrl+Backspace to close expanded post
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      // Skip if typing in an input/textarea
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Check for Ctrl+Backspace (or Cmd+Backspace on Mac) to close expanded post
      if ((event.ctrlKey || event.metaKey) && event.key === "Backspace") {
        if (expandedPostId) {
          event.preventDefault();
          setExpandedPostId(null);
          logger.debug("Blog page: Expanded post closed via keyboard shortcut", {
            page: "Blog",
            postId: expandedPostId,
          });
        }
        return;
      }

      // Check for 'B' key (case insensitive) to navigate home
      if (event.key.toLowerCase() === "b" && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        logger.debug("Blog page keyboard shortcut triggered", {
          page: "Blog",
          key: event.key,
        });
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    logger.debug("Blog page keyboard shortcut listener attached", {
      page: "Blog",
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      logger.debug("Blog page keyboard shortcut listener removed", {
        page: "Blog",
      });
    };
  }, [router, expandedPostId]);

  /**
   * Filters blog posts based on search query and tag selection.
   */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(BLOG_POSTS);
      return;
    }

    const query = searchQuery.toLowerCase();
    // Check if search query matches a tag exactly
    const allTags = Array.from(new Set(BLOG_POSTS.flatMap(post => post.tags)));
    const isTagFilter = allTags.some(tag => tag.toLowerCase() === query);
    
    const filtered = BLOG_POSTS.filter((post) => {
      if (isTagFilter) {
        // If searching by tag, filter by tag match
        return post.tags.some((tag) => tag.toLowerCase() === query);
      } else {
        // Otherwise, filter by general search
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
    });
    setFilteredPosts(filtered);
    logger.debug("Blog posts filtered", {
      page: "Blog",
      query: searchQuery,
      results: filtered.length,
    });
  }, [searchQuery]);

  logger.debug("Rendering blog page", {
    page: "Blog",
    postCount: BLOG_POSTS.length,
    filteredCount: filteredPosts.length,
  });

  return (
    <>
      <main
        className={cn(
          "container relative mx-auto z-10 flex min-h-screen flex-col gap-12 sm:gap-14 md:gap-16",
          "pb-16 sm:pb-20 md:pb-24 pt-12 sm:pt-14 md:pt-16 px-4 sm:px-6 md:px-8",
        )}
      >
        {/* Hero Section */}
        <BlogHeroSection />

        {/* Back Button - Only on Blog Page */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground/70 hover:text-foreground transition-colors font-smooth-bold"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>back</span>
          </Link>
        </div>

        {/* Search and Tags Layout - Inline */}
        <div
          data-blog-content
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6"
        >
          {/* Search Bar - Left Side */}
          <div className="w-full md:max-w-md">
            <input
              type="text"
              placeholder="search posts..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full px-4 py-3 bg-transparent border-b border-foreground/20",
                "text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50",
                "focus:outline-none focus:border-foreground transition-colors",
                "tracking-wide"
              )}
            />
          </div>

          {/* Tags - Right Side (Plain Text, Right-Aligned) */}
          <div className="flex flex-wrap gap-4 items-center md:justify-end">
            <button
              onClick={() => setSearchQuery("")}
              className={cn(
                "text-sm sm:text-base transition-colors",
                !searchQuery
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              all
            </button>
            {Array.from(new Set(BLOG_POSTS.flatMap(post => post.tags))).map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={cn(
                  "text-sm sm:text-base transition-colors",
                  searchQuery === tag
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Expanded Post Content */}
        {expandedPostId && (
          <div className="blog-expand-container border-t border-foreground/20 pt-8 sm:pt-10 space-y-6 overflow-hidden">
            {(() => {
              const post = BLOG_POSTS.find((p) => p.id === expandedPostId);
              if (!post) return null;

              return (
                <article className="space-y-6">
                  {/* Banner Image */}
                  {post.bannerImage && (
                    <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden rounded-sm">
                      <Image
                        src={post.bannerImage}
                        alt={post.title}
                        fill
                        className="object-cover grayscale opacity-80 hover:opacity-100 transition-opacity"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                    </div>
                  )}

                  {/* Post Header */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.2rem] text-muted-foreground/60">
                      <span>{post.category}</span>
                      <span>•</span>
                      <time dateTime={post.date}>{post.date}</time>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-wide">
                      {post.title}
                    </h2>

                    {/* Post Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-sm text-muted-foreground/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Content - Left Aligned */}
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-foreground text-left">
                      {post.content}
                    </div>
                  </div>

                  {/* Footer with Buy Me Coffee and Close Button */}
                  <div className="flex justify-between items-center pt-4 border-t border-foreground/20">
                    {/* Buy Me Coffee Button - Left Side */}
                    <a
                      href={BUY_ME_COFFEE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-xs sm:text-sm tracking-wide font-smooth-bold",
                        "border border-foreground/20 hover:border-foreground/40 transition-colors",
                        "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Coffee className="h-4 w-4" />
                      buy me a coffee
                    </a>

                    {/* Close Button - Right Side */}
                    <button
                      onClick={() => setExpandedPostId(null)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-xs sm:text-sm tracking-wide font-smooth-bold",
                        "border border-foreground/20 hover:border-foreground/40 transition-colors",
                        "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <X className="h-4 w-4" />
                      close
                    </button>
                  </div>
                </article>
              );
            })()}
          </div>
        )}

        {/* Blog Posts - Left Aligned Layout */}
        <div className="w-full space-y-8 sm:space-y-10 md:space-y-12">
          {filteredPosts.length === 0 ? (
            <div className="text-left py-12 sm:py-16">
              <p className="text-sm sm:text-base text-muted-foreground">
                No posts found matching &quot;{searchQuery}&quot;
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className={cn(
                  "group border-t border-foreground/20 pt-6 sm:pt-8 transition-colors cursor-pointer",
                  "hover:border-foreground/40",
                  expandedPostId === post.id && "opacity-50"
                )}
                onClick={() => {
                  if (expandedPostId === post.id) {
                    setExpandedPostId(null);
                  } else {
                    setExpandedPostId(post.id);
                    logger.debug("Blog post expanded", {
                      page: "Blog",
                      postId: post.id,
                    });
                  }
                }}
              >
                <div className="space-y-3 sm:space-y-4">
                  {/* Post Metadata */}
                  <div className="flex items-center gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.2rem] text-muted-foreground/60">
                    <span>{post.category}</span>
                    <span>•</span>
                    <time dateTime={post.date}>{post.date}</time>
                  </div>

                  {/* Post Title */}
                  <h2
                    className={cn(
                      "text-xl sm:text-2xl font-display font-bold uppercase tracking-wide",
                      "transition-colors group-hover:text-muted-foreground"
                    )}
                  >
                    {post.title}
                  </h2>

                  {/* Post Excerpt */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm text-muted-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </main>
      <Footer
        email="contact.jack.dev@gmail.com"
        socialLinks={{
          twitter: "https://x.com/Jack1168556",
          github: "https://github.com/Jack5237",
          linkedin: "https://www.linkedin.com/in/jack-m-a732b4397",
          discord: "https://discord.com/users/ttv_jack_",
        }}
      />
    </>
  );
};

export default BlogPage;
