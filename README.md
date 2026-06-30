# PanPanTech Static Website

This repository contains the static website for `panpantechnology.com`.

The site was converted from the earlier WordPress planning work into plain HTML, CSS, JavaScript, images, and SEO/GEO files. It can be hosted on GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static web host.

## Local Commands

```bash
npm run build
npm test
```

`npm run build` regenerates the static pages from `scripts/build-site.mjs`.

`npm test` checks:

- HTML titles, meta descriptions, canonical URLs, and one H1 per page
- JSON-LD validity
- internal links and fragment anchors
- image file references
- `robots.txt`, `llms.txt`, `sitemap.xml`, `CNAME`, `.nojekyll`, and `_headers`
- obvious mojibake markers from the old prototype
- CSS constraints for stable typography

## Deployment

For GitHub Pages, deploy from the repository root on the `main` branch. The site includes:

- `CNAME` set to `panpantechnology.com`
- `.nojekyll` for direct static hosting
- `sitemap.xml`, `robots.txt`, and `llms.txt`

The RFQ page uses a static `mailto:` form. For production lead capture, connect the form to Formspree, Tally, HubSpot, or another CRM endpoint.
