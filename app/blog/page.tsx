"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { X, Coffee, Share2, Linkedin, Twitter, ArrowLeft, ArrowRight, Maximize2, Minimize2 } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Dithering } from "@paper-design/shaders-react";

import { Footer } from "@/components/sections/footer";
import { BlogHeroSection } from "@/components/sections/blog-hero-section";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/types";

/**
 * Minimal blog listing page with hero section, search functionality, and streamlined layout.
 * @returns The blog listing page markup.
 */
const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState<string | null>(null);
  const [isImmersive, setIsImmersive] = useState(false);

  /**
   * Fetch blog posts from API (runs once on mount)
   */
  useEffect(() => {
    let isMounted = true;

    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          const posts: BlogPost[] = Array.isArray(data) ? data : data.posts || [];
          if (isMounted) {
            setBlogPosts(posts);
          }
        } else {
          console.error("Failed to fetch blog posts:", response.status);
          if (isMounted) {
            setBlogPosts([]);
          }
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        if (isMounted) {
          setBlogPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Handle URL slug parameter when posts load (runs once on mount)
   */
  useEffect(() => {
    if (blogPosts.length === 0) return;

    const slug = new URLSearchParams(window.location.search).get("post");
    if (slug) {
      const post = blogPosts.find(p => p.slug === slug);
      if (post) {
        setExpandedPostId(post.id);
      }
    }
  }, [blogPosts]);

  /**
   * Set URL when a post is expanded. Runs after React commits so it
   * is outside Next.js's event-handler interception cycle.
   */
  useEffect(() => {
    if (!expandedPostId || blogPosts.length === 0) return;
    const post = blogPosts.find(p => p.id === expandedPostId);
    if (post?.slug) {
      window.history.replaceState(null, "", `/blog?post=${post.slug}`);
    }
  }, [expandedPostId, blogPosts]);

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
        }
        return;
      }

      // Check for Ctrl+Delete to close expanded post
      if ((event.ctrlKey || event.metaKey) && event.key === "Delete") {
        if (expandedPostId) {
          event.preventDefault();
          setExpandedPostId(null);
        }
        return;
      }

      // Check for 'W' key to navigate to work section
      if (event.key.toLowerCase() === "w" && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        window.location.href = "/#projects";
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedPostId]);

  /**
   * Memoized filtering of blog posts
   */
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return blogPosts;
    }

    const query = searchQuery.toLowerCase();
    const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));
    const isTagFilter = allTags.some((tag) => tag.toLowerCase() === query);

    return blogPosts.filter((post) => {
      if (isTagFilter) {
        return post.tags.some((tag) => tag.toLowerCase() === query);
      } else {
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
    });
  }, [searchQuery, blogPosts]);


  if (loading) {
    return (
      <>
        <main
          className={cn(
            "container relative mx-auto z-10 flex min-h-screen flex-col gap-12 sm:gap-14 md:gap-16",
            "pb-16 sm:pb-20 md:pb-24 pt-12 sm:pt-14 md:pt-16 px-4 sm:px-6 md:px-8",
          )}
        >
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-muted-foreground">Loading blog posts...</div>
          </div>
        </main>
        <Footer
          email="contact.jack.dev@gmail.com"
          socialLinks={{
            twitter: "https://x.com/Jack1168556",
            github: "https://github.com/Jack5237",
            linkedin: "https://www.linkedin.com/in/jack-dev-a732b4397",
            discord: "https://discord.com/users/ttv_jack_",
          }}
        />
      </>
    );
  }

  const expandedPost = blogPosts.find((p) => p.id === expandedPostId);

  return (
    <>
      {/* Immersive reader overlay */}
      {isImmersive && expandedPost && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
            {/* Immersive header */}
            <div className="flex items-center justify-between mb-10 text-[9px] sm:text-[10px] uppercase tracking-[0.2rem] text-muted-foreground/60">
              <div className="flex items-center gap-3">
                <span>{expandedPost.category}</span>
                <span>•</span>
                <time dateTime={expandedPost.date}>{expandedPost.date}</time>
              </div>
              <button
                onClick={() => setIsImmersive(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.2rem]",
                  "border border-foreground/10 hover:border-foreground/30 transition-colors",
                  "text-muted-foreground/60 hover:text-foreground",
                )}
              >
                <Minimize2 className="h-3 w-3" />
                exit
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase leading-tight tracking-wide mb-8">
              {expandedPost.title}
            </h1>

            <div className="prose dark:prose-invert prose-neutral max-w-none prose-p:text-foreground/80 prose-li:text-foreground/90 prose-ul:list-disc prose-ul:pl-6">
              <div className="text-base leading-loose text-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {expandedPost.content}
                </ReactMarkdown>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-foreground/10 flex justify-end">
              <button
                onClick={() => setIsImmersive(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2rem]",
                  "border border-foreground/10 hover:border-foreground/30 transition-colors",
                  "text-muted-foreground hover:text-foreground",
                )}
              >
                <Minimize2 className="h-4 w-4" />
                exit reader
              </button>
            </div>
          </div>
        </div>
      )}

      <main
        className={cn(
          "container relative mx-auto z-10 flex min-h-screen flex-col gap-12 sm:gap-14 md:gap-16",
          "pb-16 sm:pb-20 md:pb-24 pt-12 sm:pt-14 md:pt-16 px-4 sm:px-6 md:px-8",
        )}
      >
        {/* Hero Section */}
        <BlogHeroSection />

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className={cn(
                "w-full px-4 py-3 bg-transparent border-b border-foreground/20",
                "text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50",
                "focus:outline-none focus:border-foreground transition-colors",
                "tracking-wide",
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
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              all
            </button>
            {Array.from(new Set(blogPosts.flatMap((post) => post.tags))).map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className={cn(
                    "text-sm sm:text-base transition-colors",
                    searchQuery === tag
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tag}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Expanded Post Content */}
        {expandedPostId && (
          <div className="blog-expand-container border-t border-foreground/20 pt-8 sm:pt-10 space-y-6 overflow-hidden">
            {(() => {
              const post = blogPosts.find((p) => p.id === expandedPostId);
              if (!post) return null;

              return (
                <article className="space-y-6">
                  {/* Banner */}
                  <div className="relative w-full overflow-hidden rounded-sm aspect-video">
                    {post.bannerImage ? (
                      <Image
                        src={post.bannerImage}
                        alt={post.title}
                        fill
                        className="object-contain grayscale opacity-80 hover:opacity-100 transition-opacity"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                      />
                    ) : (
                      <Dithering
                        width={1280}
                        height={720}
                        colorBack="#141414"
                        colorFront="#ebebeb"
                        shape="ripple"
                        type="2x2"
                        size={3}
                        speed={1}
                      />
                    )}
                  </div>

                  {/* Post Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.2rem] text-muted-foreground/60">
                        <span>{post.category}</span>
                        <span>•</span>
                        <time dateTime={post.date}>{post.date}</time>
                      </div>
                      <button
                        onClick={() => setIsImmersive(true)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.2rem]",
                          "border border-foreground/10 hover:border-foreground/30 transition-colors",
                          "text-muted-foreground/60 hover:text-foreground",
                        )}
                        title="Immersive reader"
                      >
                        <Maximize2 className="h-3 w-3" />
                        read
                      </button>
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
                  <div className="prose dark:prose-invert prose-neutral max-w-none prose-p:text-foreground/80 prose-li:text-foreground/90 prose-ul:list-disc prose-ul:pl-6">
                    <div className="text-sm sm:text-base leading-relaxed text-foreground text-left whitespace-pre-wrap">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {post.content}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Footer - single row: nav left, actions right */}
                  {(() => {
                    const currentIndex = blogPosts.findIndex(p => p.id === post.id);
                    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
                    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
                    return (
                      <div className="flex items-center justify-between pt-8 mt-8 border-t border-foreground/10 gap-4 flex-wrap">
                        {/* Left - Previous */}
                        {prevPost ? (
                          <button
                            onClick={() => {
                              setExpandedPostId(prevPost.id);
                              setIsImmersive(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2rem]",
                              "border border-foreground/10 hover:border-foreground/30 transition-colors",
                              "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <ArrowLeft className="h-4 w-4" />
                            previous
                          </button>
                        ) : <div />}

                        {/* Right - Actions */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <a
                            href="https://buymeacoffee.com/scottish.jack"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2rem]",
                              "border border-foreground/10 hover:border-foreground/30 transition-colors",
                              "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <Coffee className="h-4 w-4" />
                            coffee
                          </a>

                          {/* Share */}
                          <div className="relative">
                            <button
                              onClick={() => setShareOpen(shareOpen === `expanded-${post.id}` ? null : `expanded-${post.id}`)}
                              className={cn(
                                "flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2rem]",
                                "border border-foreground/10 hover:border-foreground/30 transition-colors",
                                "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              <Share2 className="h-4 w-4" />
                              share
                            </button>
                            {shareOpen === `expanded-${post.id}` && (
                              <div className="absolute bottom-full mb-2 right-0 bg-background border border-foreground/20 rounded-sm p-3 flex gap-2 z-50 shadow-lg shadow-foreground/10">
                                <button
                                  onClick={() => {
                                    const text = `Check out "${post.title}" on Jack's blog`;
                                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, "_blank");
                                  }}
                                  className="p-2 hover:bg-foreground/10 rounded transition-colors"
                                  title="Share on Twitter"
                                >
                                  <Twitter className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank");
                                  }}
                                  className="p-2 hover:bg-foreground/10 rounded transition-colors"
                                  title="Share on LinkedIn"
                                >
                                  <Linkedin className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert("Link copied!");
                                  }}
                                  className="p-2 hover:bg-foreground/10 rounded transition-colors text-xs"
                                  title="Copy link"
                                >
                                  Copy
                                </button>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              setExpandedPostId(null);
                              setShareOpen(null);
                              setIsImmersive(false);
                              window.history.replaceState(null, "", "/blog");
                            }}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2rem]",
                              "border border-foreground/10 hover:border-foreground/30 transition-colors",
                              "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <X className="h-4 w-4" />
                            close
                          </button>

                          {nextPost && (
                            <button
                              onClick={() => {
                                setExpandedPostId(nextPost.id);
                                setIsImmersive(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={cn(
                                "flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.2rem]",
                                "border border-foreground/10 hover:border-foreground/30 transition-colors",
                                "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              next
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </article>
              );
            })()}
          </div>
        )}

        {/* Blog Posts - Card Layout matching Projects Section */}
        <div className="grid gap-8 sm:gap-10 md:gap-12">
          {filteredPosts.length === 0 ? (
            <div className="text-left py-12 sm:py-16">
              <p className="text-sm sm:text-base text-muted-foreground">
                No posts found matching &quot;{searchQuery}&quot;
              </p>
            </div>
          ) : (
            filteredPosts.map((post, index) => {
              const isLeftAligned = index % 2 === 0;
              return (
                <article
                  key={post.id}
                  className={cn(
                    "group relative border-t border-foreground/15 pt-6 sm:pt-8 md:pt-10 transition-colors cursor-pointer",
                    "hover:border-foreground",
                    index === filteredPosts.length - 1 && "border-b pb-8",
                  )}
                  onClick={() => {
                    if (expandedPostId === post.id) {
                      setExpandedPostId(null);
                      setIsImmersive(false);
                      window.history.replaceState(null, "", "/blog");
                    } else {
                      setExpandedPostId(post.id);
                      setShareOpen(null);
                      setIsImmersive(false);
                    }
                  }}
                >
                  {/* Metadata row — category left/right, date opposite (mirrors work section) */}
                  <div
                    className={cn(
                      "flex flex-col gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.35rem] text-muted-foreground transition-colors group-hover:text-accent",
                      isLeftAligned
                        ? "md:flex-row md:items-center md:justify-between"
                        : "md:flex-row-reverse md:items-center md:justify-between",
                    )}
                  >
                    <span>{post.category}</span>
                    <time dateTime={post.date}>{post.date}</time>
                  </div>

                  {/* Content row — title one side, excerpt opposite (exact work section pattern) */}
                  <div
                    className={cn(
                      "flex flex-col gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-5 md:mt-6",
                      "md:items-start md:justify-between",
                      isLeftAligned ? "md:flex-row" : "md:flex-row-reverse",
                    )}
                  >
                    <span
                      className={cn(
                        "block text-[clamp(1.5rem,3.5vw,3rem)] sm:text-[clamp(1.75rem,4vw,3.75rem)] font-display font-bold uppercase leading-tight transition-colors hover:text-accent flex-1",
                        isLeftAligned ? "text-left" : "text-left md:text-right",
                      )}
                    >
                      {post.title}
                    </span>

                    {post.excerpt && (
                      <p
                        className={cn(
                          "text-xs sm:text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex-1 md:max-w-xs",
                          "text-left",
                          isLeftAligned ? "md:text-right" : "md:text-left",
                        )}
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                </article>
              );
            })
          )}
        </div>
      </main>
      <Footer
        email="contact.jack.dev@gmail.com"
        socialLinks={{
          twitter: "https://x.com/Jack1168556",
          github: "https://github.com/Jack5237",
          linkedin: "https://www.linkedin.com/in/jack-dev-a732b4397",
          discord: "https://discord.com/users/ttv_jack_",
        }}
      />
    </>
  );
};

export default BlogPage;
