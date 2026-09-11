import BlogClient from "./blog-client";

import { getAllBlogPosts } from "@/lib/blog";

const BlogPage = () => <BlogClient posts={getAllBlogPosts()} />;

export default BlogPage;
