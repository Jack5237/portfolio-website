"use client";

import { useEffect, useState } from "react";
import BlogClient from "./blog-client";
import type { BlogPost } from "@/lib/types";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then(r => r.json())
      .then(data => setPosts(Array.isArray(data) ? data : data.posts || []))
      .catch(() => setPosts([]));
  }, []);

  return <BlogClient posts={posts} />;
}
