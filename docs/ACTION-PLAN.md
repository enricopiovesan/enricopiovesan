# SEO Action Plan — enricopiovesan.com
**Generated:** June 6, 2026 | **Overall Score:** 61/100

---

## CRITICAL — Fix Immediately

### C1 · robots.txt — Cloudflare AI crawler block
**File:** Cloudflare Dashboard (not source code)  
**Issue:** Cloudflare's "Bot Management" is injecting Disallow rules for ClaudeBot, GPTBot, Google-Extended at the top of the live robots.txt, before the manual Allow rules. First-match parsers block these crawlers.  
**Fix:** Dashboard → Security → Bots → disable "Block AI Scrapers" managed rule. Or add explicit Override rules pinned above the managed rules.  
**Impact:** High — AI crawlers are effectively blocked from indexing UMA/C-DAD framework content.

---

### C2 · Title tags — duplicate author name on 22/24 pages
**File:** `enricopiovesan.com/src/layouts/base.njk` (title template)  
**Issue:** `{{ title }} - Enrico Piovesan` where `{{ title }}` already ends with `— Enrico Piovesan` on all pages. Renders as "About — Enrico Piovesan - Enrico Piovesan".  
**Fix:** Change page frontmatter `title` fields to strip the author suffix, then keep the template appending. Or strip the duplicate in the template with a Nunjucks conditional. The two correct pages (`/uma/`, `/c-dad/`) use the right pattern — align everything to that.  
**Example target:** `About — Enrico Piovesan` not `About — Enrico Piovesan - Enrico Piovesan`  
**Impact:** High — Google rewrites titles that look spammy; duplicated names trigger this.

---

### C3 · Schema — duplicate conflicting Person entity on every page
**File:** `enricopiovesan.com/src/layouts/base.njk` (head Person block)  
**Issue:** Head Person has no `@id`. Page-level schemas use `@id: "https://enricopiovesan.com/#person"`. Two unlinked Person entities per page break entity graph resolution.  
**Fix:** Add `"@id": "https://enricopiovesan.com/#person"` to the head Person in base.njk. Alternatively, remove the head Person entirely on pages that already declare a full `#person` in their @graph.  
**Impact:** High — entity disambiguation for AI Overviews and Knowledge Panel relies on @id resolution.

---

### C4 · Schema — duplicate invalid Book schema on /books/
**File:** `enricopiovesan.com/src/layouts/books.njk`  
**Issue:** Two `<script type="application/ld+json">` blocks for the same books. Second block has `"publisher": "Amazon"` (invalid — must be `Organization` type) and wrong `bookFormat` URL.  
**Fix:** Remove the second script block entirely. The @graph block is valid and complete.  
**Impact:** Medium — invalid schema suppresses Book rich results.

---

### C5 · Whitepapers — "four vs. five" copy inconsistency
**Issue:** Site-wide bio, homepage, about, speaking, projects say "five research papers". `/whitepapers/` index page and meta description say "Four research papers". `/whitepapers/uma-mcp/` exists as a built page but is not linked from the index.  
**Fix:** 
1. Add `/whitepapers/uma-mcp/` to the whitepapers index page (`content/whitepapers.md`)
2. Update `/whitepapers/` meta description to "Five research papers…"
3. Add to sitemap.xml  
**Impact:** High — factual inconsistency in crawlable metadata damages E-E-A-T.

---

## HIGH — Fix Within 1 Week

### H1 · Sitemap — add 2 missing URLs
**File:** `enricopiovesan.com/src/content` (Eleventy collection config) or `eleventy.config.js`  
**Add to sitemap:**
- `https://enricopiovesan.com/whitepapers/uma-mcp/`
- `https://enricopiovesan.com/cfp-log/`  
**Impact:** Medium-High — missing from sitemap = slower indexation, invisible to AI crawlers using sitemap discovery.

---

### H2 · Schema — add datePublished to all ScholarlyArticle schemas
**File:** `enricopiovesan.com/src/layouts/page.njk` + frontmatter on whitepaper pages  
**Missing dates:**
- `/whitepapers/uma/` — August 2024 → `"datePublished": "2024-08-01"`
- `/whitepapers/ecca/` — add date from paper
- `/whitepapers/c-dad/` — November 2025 → `"datePublished": "2025-11-01"`
- `/whitepapers/csma/` — add date from paper
- `/whitepapers/uma-mcp/` — add date from paper  
**Also:** Change `publisher` type from `Person` to `{"@type": "Organization", "name": "Enrico Piovesan"}` or `{"@id": "https://enricopiovesan.com/#person"}`.  
**Impact:** High — `datePublished` is the #1 recency signal for AI Overviews and Perplexity.

---

### H3 · Speaking — add booker CTA and link to /cfp-log/
**File:** `enricopiovesan.com/content/speaking.md`  
**Add:**
- A styled "Speaking inquiry" link (LinkedIn) near the top — not buried in a paragraph
- Link to `/cfp-log/` ("Current submissions →") beneath the talk listing  
**Impact:** Medium — the page currently has no conversion path for speaking bookers.

---

### H4 · Thin hub pages — /work/ and /thinking/
**Files:** `enricopiovesan.com/content/work.md`, `enricopiovesan.com/content/thinking.md`  
**Options:**
1. Expand to 300+ words each with pulled excerpts from child pages (hub page pattern)
2. Add `eleventyExcludeFromCollections: true` + `noindex` meta if keeping as pure nav  
**Impact:** Medium — 56–65 word pages dilute crawl quality.

---

### H5 · Content cannibalization — differentiate concept vs. framework pages
**UMA cluster:** `/uma/` (keep as canonical framework page) · `/concepts/universal-microservices/` (reframe as entry-level explainer, distinct H1: "What is Universal Microservices Architecture?") · `/whitepapers/uma/` (keep, add distinct title: "UMA White Paper — Enrico Piovesan")  
**C-DAD cluster:** Same pattern.  
**Impact:** High — Google is currently forced to arbitrarily pick one page per cluster. Explicitly differentiated intent resolves this.

---

### H6 · Add question-format headings to /uma/ and /c-dad/
**Files:** `enricopiovesan.com/content/uma.md`, `enricopiovesan.com/content/c-dad.md`  
**Pattern:** Add subsection headings like "What is UMA?", "Why can't software run anywhere without UMA?", "How does UMA use WebAssembly?" alongside or instead of purely declarative headings.  
**Impact:** High — question headings are the strongest structural signal for Google AI Overviews eligibility.

---

### H7 · Consolidate paragraph length on framework pages (AI citation)
**Files:** All framework/concept/whitepaper pages  
**Issue:** Every paragraph is 40–80 words. AI citation works best at 134–167 words (self-contained blocks).  
**Fix:** Merge 2–3 adjacent short paragraphs into one coherent block that opens with a direct-answer sentence and elaborates for ~150 words. Don't change the content — just consolidate the line breaks.  
**Impact:** High — this directly affects how often Perplexity, ChatGPT, and AI Overviews quote this site.

---

## MEDIUM — Fix Within 1 Month

### M1 · Homepage — add credentials above fold
**File:** `enricopiovesan.com/src/layouts/home.njk` or `content/index.md`  
**Add:** A credentialing line below the hero bio: "Platform architect at Autodesk · 1 published book (Apress) · 5 white papers · 4 open source projects"  
**Impact:** Medium — hiring managers and journalists get employer/output confirmation without a click.

---

### M2 · /writing/ — surface recent post titles
**File:** `enricopiovesan.com/content/writing.md`  
**Add:** 3–5 recent Medium post titles with links (external OK). Add explicit link to `/perspectives/` section.  
**Impact:** Medium — freshness signal; cross-links two currently disconnected content sections.

---

### M3 · Add FaqPage schema to /uma/ and /c-dad/
**Files:** `uma.njk`, `cdad.njk` or source markdown  
**Add 3–5 FAQ pairs per page:**
- `/uma/`: "What is UMA?", "How does UMA use WebAssembly?", "What runtimes does UMA support?"
- `/c-dad/`: "What is C-DAD?", "How does C-DAD differ from OpenAPI specs?", "Why can't AI agents understand code intent without contracts?"  
**Impact:** High for AI Overviews — FaqPage is the single strongest structured data trigger.

---

### M4 · Add BreadcrumbList + TechArticle to /concepts/ sub-pages
**Files:** concept layout template (check which .njk renders these)  
**Add to each:** `BreadcrumbList` (Home → Concepts → [Page]) + `TechArticle` with `headline`, `author: {#person}`, `datePublished`  
**Impact:** Medium — currently these pages have no content-type schema.

---

### M5 · Fix /cfp-log/ indexability
**File:** `enricopiovesan.com/content/cfp-log.md`  
**Two options:**
1. Add `<meta name="robots" content="noindex">` until first accepted talk
2. Keep indexed but add more context around why it's public (transparency rationale) to turn zero-results into a positive signal  
**Impact:** Medium — a publicly indexed page showing "Nothing yet" weakens E-E-A-T authoritativeness signals.

---

### M6 · Add last-updated dates to concept and framework pages
**Files:** `/concepts/*`, `/uma/`, `/c-dad/`, `/perspectives/context-engineering/`  
**Add:** A visible "Last updated: [Month Year]" line near the top or bottom of each page, matching the `/now/` page pattern.  
**Impact:** Medium — freshness signal for AI-adjacent content.

---

### M7 · llms.txt — add missing paper, licensing, context block
**File:** `enricopiovesan.com/public/llms.txt`  
**Add:**
1. `/whitepapers/uma-mcp/` under `## White Papers`
2. `> License: CC BY 4.0` (or appropriate license) near the top
3. `## Context` block: "Enrico Piovesan coined the Universal Microservices Architecture term in 2023 and published the first formal paper on Contract-Driven AI Development in 2025…"  
**Impact:** Medium — LLMs consume llms.txt for attribution context.

---

### M8 · Add preconnect hint for GTM
**File:** `enricopiovesan.com/src/layouts/base.njk`  
**Add before GTM script tag:**
```html
<link rel="preconnect" href="https://www.googletagmanager.com">
```
**Impact:** Low-Medium — reduces GTM connection latency, small LCP improvement.

---

## LOW — Backlog

### L1 · Add schema to /projects/ page
Add `SoftwareApplication` nodes (one per project) with `name`, `url`, `description`, `author: {#person}`.

### L2 · Per-page OG images
Currently all pages share `/public/og-default.png`. Per-page images improve CTR from social sharing.

### L3 · Add IndexNow support
Integrate via GitHub Actions on deploy — notifies Bing/Yandex of new content instantly.

### L4 · CSP headers
Add via `docs/_headers` file (Cloudflare Pages) or Cloudflare Transform Rule.

### L5 · /about/ differentiation
Change H1 to "Platform Software Architect at Autodesk" and update meta description to biography-first rather than positioning-first, to prevent soft-duplicate SERP entries vs. homepage.

### L6 · Resolve second 404 file
Confirm only `/docs/404.html` is served; remove or exclude `/docs/public/404.html`.

### L7 · Speaking talks — add dates and status
Even approximate dates ("March 2026 — submitted") signal an active speaking track record.

### L8 · /books/ forthcoming book
Add expected publication quarter or a "notify me" link (even a mailto) so prospective buyers have a path.

---

## Priority Matrix

| # | Action | Effort | Impact | Priority |
|---|---|---|---|---|
| C1 | Fix Cloudflare bot management rule | Low (dashboard) | High | Critical |
| C2 | Fix title tag duplication | Low | High | Critical |
| C3 | Add @id to head Person schema | Trivial | High | Critical |
| C4 | Remove duplicate Book schema block | Low | Medium | Critical |
| C5 | Fix "four vs. five" copy + add uma-mcp to index | Medium | High | Critical |
| H1 | Add 2 missing URLs to sitemap | Trivial | Medium | High |
| H2 | Add datePublished to ScholarlyArticle schemas | Low | High | High |
| H3 | Add speaking booker CTA + cfp-log link | Low | Medium | High |
| H5 | Differentiate concept vs. framework pages | High | High | High |
| H6 | Add question headings to /uma/ and /c-dad/ | Low | High | High |
| H7 | Consolidate paragraph length (AI citation) | Medium | High | High |
| M3 | Add FaqPage schema to /uma/ and /c-dad/ | Medium | High | Medium |
| M1 | Add credentials line above fold on homepage | Low | Medium | Medium |
| M2 | Surface post titles on /writing/ | Low | Medium | Medium |
| M7 | Update llms.txt | Low | Medium | Medium |
