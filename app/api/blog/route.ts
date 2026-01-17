import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  slug: string;
  bannerImage: string;
}

/**
 * Read markdown file and extract frontmatter and content
 */
function readMarkdownFile(filePath: string): Omit<BlogPost, 'id'> | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      excerpt: data.excerpt || content.slice(0, 150) + '...',
      content: content,
      slug: path.basename(filePath, '.md'),
      bannerImage: data.bannerImage || '',
    };
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all blog posts from markdown files
 */
function getAllBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(process.cwd(), 'content', 'blog');

  try {
    const fileNames = fs.readdirSync(blogDirectory);
    const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

    const posts = markdownFiles
      .map((fileName, index) => {
        const filePath = path.join(blogDirectory, fileName);
        const postData = readMarkdownFile(filePath);

        if (postData) {
          return {
            ...postData,
            id: (index + 1).toString(),
          };
        }
        return null;
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function GET() {
  try {
    const posts = getAllBlogPosts();
    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error in blog API:', error);
    return NextResponse.json(
      { error: 'Failed to load blog posts', posts: [] },
      { status: 500 }
    );
  }
}