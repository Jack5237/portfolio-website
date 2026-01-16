"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
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

  /**
   * Handles keyboard shortcut to navigate home.
   * Listens for 'B' key to go back to home.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for 'B' key (case insensitive)
      if (event.key.toLowerCase() === "b" && !event.ctrlKey && !event.metaKey) {
        // Only trigger if not typing in an input/textarea
        const target = event.target as HTMLElement;
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          !target.isContentEditable
        ) {
          event.preventDefault();
          logger.debug("Blog page keyboard shortcut triggered", {
            page: "Blog",
            key: event.key,
          });
          router.push("/");
        }
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
  }, [router]);

  /**
   * Filters blog posts based on search query.
   */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(BLOG_POSTS);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = BLOG_POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
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
        <HeroSection />

        {/* Back Navigation with Keyboard Hint */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className={cn(
              "text-[10px] sm:text-xs uppercase tracking-[0.25rem] sm:tracking-[0.3rem]",
              "text-muted-foreground transition-colors hover:text-foreground hover:underline"
            )}
          >
            ← Back to Home
          </Link>
          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-muted-foreground/60">
            <kbd className="px-1.5 py-0.5 rounded border border-foreground/20 bg-muted/50 font-mono text-[9px] sm:text-[10px]">
              B
            </kbd>
            <span className="text-muted-foreground/50">to go back</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto w-full">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full px-4 py-3 bg-transparent border-b border-foreground/20",
              "text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50",
              "focus:outline-none focus:border-foreground transition-colors",
              "uppercase tracking-[0.1rem] sm:tracking-[0.15rem]"
            )}
          />
        </div>

        {/* Blog Posts - Minimal List Layout */}
        <div className="max-w-4xl mx-auto w-full space-y-8 sm:space-y-10 md:space-y-12">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
                No posts found matching "{searchQuery}"
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className={cn(
                  "group border-t border-foreground/20 pt-6 sm:pt-8 transition-colors",
                  "hover:border-foreground/40"
                )}
              >
                <Link
                  href={(`/blog/${post.slug}`) as any}
                  className="block"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 sm:gap-6">
                    {/* Post Content - Left Side */}
                    <div className="flex-1 space-y-3 sm:space-y-4">
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
                    </div>

                    {/* Tags - Right Side */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap md:flex-col md:items-end gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] sm:text-[10px] px-2 py-1 rounded border border-foreground/20 bg-background/50 font-outfit uppercase tracking-wider text-muted-foreground/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
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
