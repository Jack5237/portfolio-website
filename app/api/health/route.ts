import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Jack Portfolio API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    apis: [
      {
        path: '/api/blog',
        method: 'GET',
        description: 'Retrieve all blog posts'
      },
      {
        path: '/api/contact',
        method: 'POST',
        description: 'Submit contact form message'
      }
    ],
    documentation: '/openapi.json',
    support: {
      email: 'contact@jacksdevfolio.com',
      website: 'https://www.jacksdevfolio.com'
    }
  }, {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'Content-Type': 'application/json',
    },
  });
}
