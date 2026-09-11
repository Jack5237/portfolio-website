import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import {
  estimateReadingMinutes,
  getAllBlogPosts,
  getBlogPost,
} from "@/lib/blog";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.jacksdevfolio.com";

interface BlogPostPageProps {
  readonly params: { slug: string };
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPost(params.slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: ["Jack"],
      tags: post.tags,
      images: post.bannerImage ? [{ url: post.bannerImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.bannerImage ? [post.bannerImage] : undefined,
    },
  };
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const readingMinutes = estimateReadingMinutes(post.content);
  const related = getAllBlogPosts()
    .filter((other) => other.slug !== post.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content.trim().split(/\s+/).length,
    image: post.bannerImage || undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: "Jack",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Jack",
      url: BASE_URL,
    },
  };

  return (
    <main className="container mx-auto px-4 py-12 sm:px-6 md:px-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from local content
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-[10px] uppercase tracking-[0.2rem] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← All posts
        </Link>

        <header className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2rem] text-muted-foreground">
            <span>{post.category}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span>{readingMinutes} min read</span>
          </div>

          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {post.title}
          </h1>

          <p className="text-base text-muted-foreground">{post.excerpt}</p>
        </header>

        {post.bannerImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.bannerImage}
            alt=""
            className="mt-8 aspect-[3/1] w-full rounded-xl object-cover"
          />
        )}

        <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert prose-p:text-foreground/80 prose-li:text-foreground/90 prose-ul:list-disc prose-ul:pl-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {post.tags.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-2 border-t border-foreground/10 pt-6">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-foreground/15 px-3 py-1 text-[10px] uppercase tracking-[0.15rem] text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {related.length > 0 && (
          <section className="mt-12 border-t border-foreground/10 pt-8">
            <h2 className="text-[10px] uppercase tracking-[0.25rem] text-muted-foreground">
              Keep reading
            </h2>
            <ul className="mt-4 space-y-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
};

export default BlogPostPage;
