import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developers - Jack\'s Portfolio API',
  description: 'API documentation and developer resources for Jack\'s portfolio integration.',
};

export default function DevelopersPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Developer Portal</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Integrate Jack's portfolio data into your applications.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
        <p className="mb-4">Get portfolio data in your preferred format:</p>

        <div className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
          <code className="text-sm">
            {`# JSON (default)\ncurl https://www.jacksdevfolio.com/api/content\n\n# Markdown\ncurl -H "Accept: text/markdown" https://www.jacksdevfolio.com/api/content\n\n# Plain Text\ncurl -H "Accept: text/plain" https://www.jacksdevfolio.com/api/content`}
          </code>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>

        <div className="space-y-6">
          <div className="border border-foreground/20 rounded p-6">
            <h3 className="text-xl font-semibold mb-2">GET /api/content</h3>
            <p className="text-muted-foreground mb-4">Retrieve portfolio information including profile, projects, technologies, and social links.</p>
            <div className="text-sm">
              <p><strong>Content Types:</strong> application/json, text/markdown, text/plain</p>
              <p><strong>Cache:</strong> 5 minutes (public)</p>
            </div>
          </div>

          <div className="border border-foreground/20 rounded p-6">
            <h3 className="text-xl font-semibold mb-2">GET /api/health</h3>
            <p className="text-muted-foreground mb-4">Health check endpoint. Returns service status and available APIs.</p>
            <div className="text-sm">
              <p><strong>Content Type:</strong> application/json</p>
              <p><strong>Cache:</strong> 5 minutes (public)</p>
            </div>
          </div>

          <div className="border border-foreground/20 rounded p-6">
            <h3 className="text-xl font-semibold mb-2">GET /api/blog</h3>
            <p className="text-muted-foreground mb-4">Retrieve all published blog posts with metadata.</p>
            <div className="text-sm">
              <p><strong>Content Type:</strong> application/json</p>
              <p><strong>Cache:</strong> 1 hour (public)</p>
            </div>
          </div>

          <div className="border border-foreground/20 rounded p-6">
            <h3 className="text-xl font-semibold mb-2">POST /api/contact</h3>
            <p className="text-muted-foreground mb-4">Submit a contact form message.</p>
            <div className="text-sm">
              <p><strong>Rate Limit:</strong> 3 requests per 10 minutes per IP</p>
              <p><strong>Returns:</strong> JSON with success/error message</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">API Specification</h2>
        <p className="mb-4">Full OpenAPI 3.0 specification available at:</p>
        <a href="/openapi.json" className="text-foreground underline font-medium">/openapi.json</a>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Content Negotiation</h2>
        <p className="mb-4">All content endpoints support multiple formats via the Accept header:</p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><code>application/json</code> - Structured JSON data (default)</li>
          <li><code>text/markdown</code> - Markdown formatted content</li>
          <li><code>text/plain</code> - Plain text format</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Support</h2>
        <p className="text-muted-foreground">
          For questions or issues, email{' '}
          <a href="mailto:contact@jacksdevfolio.com" className="text-foreground underline">
            contact@jacksdevfolio.com
          </a>
        </p>
      </section>
    </main>
  );
}
