/**
 * Cloudflare Pages Function to generate robots.txt dynamically
 * 
 * This function handles requests to /robots.txt and returns the robots.txt content
 * with the appropriate Content-Type header.
 * 
 * The function dynamically generates the robots.txt based on the request domain,
 * ensuring the sitemap URL is always correct for the current deployment.
 * 
 * @see https://developers.cloudflare.com/pages/platform/functions/
 */

export const onRequest = async (context: { request: Request }): Promise<Response> => {
  // Get the request URL to determine the domain
  const url = new URL(context.request.url);
  const domain = url.origin;

  // Generate robots.txt content
  // Based on the robots.txt in the public folder
  const robotsContent = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml`;

  // Return the response with the correct Content-Type header
  return new Response(robotsContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};

