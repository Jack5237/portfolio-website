import { NextResponse } from 'next/server';
import { getBlogPost } from '@/lib/blog';

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  try {
    const post = getBlogPost(params.slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post, {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to load blog post' },
      { status: 500 }
    );
  }
}
