# Changelog

All notable changes to OmarCMS will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-02-21

### Added
- Multi-page documentation structure with sidebar navigation
- Breadcrumbs component with BreadcrumbList schema for SEO
- Hero image system for blog posts (1200×630px)
- Creative Commons image finder script (`scripts/find-hero.sh`)
- Images documentation page
- Homepage hero image with blue color overlay
- About page hero image with blue color overlay
- Hero images for all initial blog posts

### Changed
- Improved accessibility: increased muted text contrast (#9ca3af → #a3a3a3)
- Added underlines to all content links for WCAG AA compliance
- Docs sidebar width reduced from 250px to 180px for more content space

### Fixed
- Hero images now use regular `<img>` tags instead of Astro Image component (for public folder assets)

## [0.1.0] - 2026-02-14

### Added
- Initial release
- Blog with markdown support
- Tag filtering system
- Light/dark theme toggle with system preference detection
- WCAG AAA accessibility compliance
- JSON-LD structured data (BlogPosting, WebSite)
- Open Graph social share previews
- RSS feed
- Sitemap generation
- Reading time calculation
- Vercel Analytics integration
- Mobile-responsive design

### Documentation
- Installation guide
- Writing content guide
- Tag system documentation
- Publishing workflow
- Configuration options
- AI-Native features guide
- Philosophy and design decisions

---

## Upgrade Guide

### From 0.1.0 to 0.2.0

**New Features:**
1. **Hero Images** - Add images to your posts by placing `hero.jpg` in `public/images/blog/[post-slug]/`
2. **Image Finder** - Use `./scripts/find-hero.sh "query" post-slug` to find Creative Commons images
3. **Breadcrumbs** - Automatic breadcrumb navigation on blog pages
4. **Multi-page Docs** - Documentation is now split across multiple pages

**Breaking Changes:**
- None

**Migration Steps:**
```bash
# 1. Pull latest changes from the template repo
git remote add template https://github.com/ewimsatt/OmarCMS.git
git fetch template
git merge template/main

# 2. Resolve any conflicts (likely just in your content files)

# 3. If you want the new features, run:
pnpm install  # Update dependencies if needed

# 4. Test locally
pnpm dev

# 5. Deploy
git push
```

**Optional Enhancements:**
- Add hero images to your existing posts (see `/docs/images`)
- Update your docs if you customized them (new multi-page structure)
