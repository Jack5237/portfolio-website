export default function NotFound() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>

      <h2>Site Map</h2>
      <ul>
        <li><a href="/">Home</a> - Portfolio homepage</li>
        <li><a href="/blog">Blog</a> - Articles and posts</li>
        <li><a href="/contact">Contact</a> - Get in touch</li>
      </ul>

      <h2>API Endpoints</h2>
      <ul>
        <li><a href="/api/content">/api/content</a> - Portfolio data (JSON, text, markdown)</li>
        <li><a href="/api/health">/api/health</a> - Health check</li>
        <li><a href="/api/blog">/api/blog</a> - Blog posts</li>
        <li><a href="/text">/text</a> - Plain text version</li>
        <li><a href="/openapi.json">/openapi.json</a> - OpenAPI spec</li>
      </ul>

      <h2>Support</h2>
      <p>Contact: <a href="mailto:contact@jacksdevfolio.com">contact@jacksdevfolio.com</a></p>
    </div>
  );
}
