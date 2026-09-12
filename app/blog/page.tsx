import { getAllBlogPosts } from "@/lib/blog";
import BlogClient from "./blog-client";

export default function BlogPage() {
  const posts = getAllBlogPosts();
  // ponytail: listing page never renders post bodies; strip content to keep payload under 20kB
  // full markdown moved to individual /blog/[slug] pages which are static-prerendered
  const postsWithoutContent = posts.map(({ content, ...meta }) => ({
    ...meta,
    content: "",
  }));
  return <BlogClient posts={postsWithoutContent} />;
}
