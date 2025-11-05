# Cloudflare Pages Functions

This directory contains Cloudflare Pages Functions that run on Cloudflare's edge network.

## robots.txt.ts

Generates the `robots.txt` file dynamically for your Cloudflare Pages deployment.

### How it works

- Handles requests to `/robots.txt`
- Dynamically generates the robots.txt content based on the request domain
- Ensures the sitemap URL is always correct for the current deployment (production, preview, etc.)

### Setup

1. Deploy your site to Cloudflare Pages
2. The function will automatically be detected and executed when `/robots.txt` is requested
3. No additional configuration needed - Cloudflare Pages automatically recognizes files in the `functions/` directory

### Testing locally

To test locally, you can use Wrangler (Cloudflare's CLI tool):

```bash
# Install Wrangler (if not already installed)
npm install -g wrangler

# Run the Pages development server
npx wrangler pages dev dist
```

Then visit `http://localhost:8788/robots.txt` to see the generated file.

### Note

The static `public/robots.txt` file will still work for local development and can serve as a fallback. The Cloudflare Function will take precedence when deployed to Cloudflare Pages.

