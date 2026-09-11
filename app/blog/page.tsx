import { getAllBlogPosts } from "@/lib/blog";
import BlogClient from "./blog-client";

export default function BlogPage() {
  const posts = getAllBlogPosts();
  return <BlogClient posts={posts} />;
}
