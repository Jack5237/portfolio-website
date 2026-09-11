import { NextResponse } from 'next/server';

import { getAllBlogPosts } from '@/lib/blog';

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
