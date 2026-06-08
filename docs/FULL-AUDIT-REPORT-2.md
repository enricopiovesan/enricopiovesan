# SEO Audit Report #2 — enricopiovesan.com
**Date:** June 2026  
**Pages audited:** 25  
**Previous audit:** Audit #1 (prior session — Critical/High/Medium issues fixed)

---

## SEO Health Score: 69 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 72 | 15.8 |
| Content Quality | 23% | 64 | 14.7 |
| On-Page SEO | 20% | 65 | 13.0 |
| Schema / Structured Data | 10% | 62 | 6.2 |
| Performance (CWV) | 10% | 75 | 7.5 |
| AI Search Readiness | 10% | 79 | 7.9 |
| Images | 5% | 82 | 4.1 |
| **Total** | | | **69.2** |

---

## Executive Summary

Significant improvement from Audit #1. All C1–C5 Critical issues resolved. All H1–H7 High issues resolved. All M1–M8 Medium issues resolved. The remaining gaps fall into four clusters:

1. **Duplicate titles** — whitepaper pages share exact titles with framework hub pages (title cannibalization with Google)
2. **Schema errors** — orphaned Person node on /speaking/, missing datePublished on /concepts/* TechArticle, duplicate Person @graph nodes with inconsistent sameAs
3. **On-page thinness** — 12 section hub titles are generic single-word titles; 5 meta descriptions under 120 chars; 6 over 160
4. **AI citation** — paragraph lengths still 40–90 words (target: 130–160); /uma/ and /c-dad/ framework H2s are noun phrases not questions; llms.txt missing 14 of 25 pages

---

## Critical Issues

### C1 — Duplicate Title Tags: /whitepapers/uma and /uma
Both pages have title: `Universal Microservices Architecture (UMA) - Enrico Piovesan`  
Same for: `/whitepapers/c-dad` and `/c-dad` → `Contract-Driven AI Development (C-DAD) - Enrico Piovesan`  
**Fix:** Prefix whitepaper titles with "White Paper: " → `White Paper: Universal Microservices Architecture (UMA) - Enrico Piovesan`  
Files: `content/whitepapers/uma.md`, `content/whitepapers/c-dad.md`

### C2 — Orphaned Person Schema on /speaking/
`src/layouts/speaking.njk` has a standalone `<script type="application/ld+json">` block with `@type: Person` and no `@id`. Google will treat it as a separate unrelated Person entity.  
**Fix:** Add `"@id": "https://enricopiovesan.com/#person"` to the orphan block, or remove it (base.njk already injects the Person node).

### C3 — Missing datePublished on /concepts/* TechArticle nodes
All three concept pages (`/concepts/universal-microservices/`, `/concepts/contract-driven-ai-development/`, `/concepts/agentic-systems/`) render TechArticle schema with no `datePublished`. This blocks Google Article rich result eligibility.  
**Fix:** Add `datePublished` to concept page frontmatter and inject it into `page.njk` TechArticle block.  
Files: `content/concepts/*.md`, `src/layouts/page.njk`

---

## High Issues

### H1 — Duplicate Person @graph nodes with inconsistent sameAs
base.njk injects a full Person node on every page. Pages that also declare Person in their `@graph` (home, about, speaking) produce two `<script>` blocks for the same `@id: #person` with differing `sameAs` arrays.  
Three different `sameAs` arrays in use — should be one canonical set:
```json
"sameAs": [
  "https://github.com/enricopiovesan",
  "https://linkedin.com/in/enricopiovesan",
  "https://medium.com/@enricopiovesan",
  "https://x.com/enricopiovesan",
  "https://www.universalmicroservices.com",
  "https://www.amazon.com/dp/B0GTTTTQH4"
]
```
**Fix:** Keep full Person in base.njk with canonical sameAs; remove duplicate Person nodes from home/about/speaking `@graph` blocks, replacing them with `{"@id": "https://enricopiovesan.com/#person"}` references.

### H2 — llms.txt missing 14 of 25 pages
Entire `/concepts/` cluster (4 pages) and `/perspectives/` cluster (2 pages) absent. Also missing: `/thinking/`, `/now/`, `/cfp-log/`, `/uses/`, `/work/`, `/writing/`. These are the highest-citability definitional pages.  
**Fix:** Add `## Concepts` and `## Perspectives` sections to `public/llms.txt`.

### H3 — No question-format H2s on /uma/ and /c-dad/
Both use noun-phrase H2s ("Contract-first", "Runtime-agnostic", "Contracts over code", "Hybrid governance"). These don't surface as Q&A pairs in AI Overviews.  
**Fix:** Add or convert at least 2 H2s per page to question format: "What problem does UMA solve?", "How does UMA differ from standard microservices?", "What is a C-DAD contract?", "How does C-DAD differ from OpenAPI?"  
Files: `content/uma.md`, `content/cdad.md`

### H4 — Paragraph lengths below AI citation threshold (40–90 words; need 130–160)
No paragraph on the site reaches the 130-word self-contained passage threshold needed for AI extraction. The `/uma/` and `/c-dad/` pages are the primary targets.  
**Fix:** Merge adjacent short paragraphs in the "What is UMA?" and "What is C-DAD?" opening sections to create one 150-word self-contained definitional block per page.

### H5 — No credential/trust line on /uma/ and /c-dad/ hero
Homepage has: "Platform Software Architect at Autodesk · 1 published book (Apress) · 5 white papers · 4 open source projects" — but this pattern doesn't exist on the two most-visited framework pages.  
**Fix:** Add same credential line to `src/layouts/uma.njk` and `src/layouts/cdad.njk` hero sections.

### H6 — 12 section hub titles generic/too short
`Work - Enrico Piovesan` (22 chars), `Books - Enrico Piovesan` (23), `Projects - Enrico Piovesan` (26), `Speaking - Enrico Piovesan` (26), `Writing - Enrico Piovesan` (25), `Thinking - Enrico Piovesan` (26), etc. — no keywords, no search intent value.  
**Fix:** Expand titles to include subject keywords:
- Work → "Software Architecture Books, Papers & Projects - Enrico Piovesan"
- Books → "Software Architecture Books by Enrico Piovesan"
- Projects → "Open Source Architecture Projects - Enrico Piovesan"
- Speaking → "Conference Speaking on Software Architecture & AI - Enrico Piovesan"
- Writing → "Software Architecture Writing on Medium - Enrico Piovesan"
- Thinking → "Architecture Concepts & Perspectives - Enrico Piovesan"

### H7 — /books/ no CTA in hero; Apress not in visible text
Publisher (Apress) appears only in JSON-LD, never rendered. No "Buy on Amazon →" link above the fold.  
**Fix:** Add Apress badge as visible metadata next to book title; add "Buy on Amazon →" link in hero.

---

## Medium Issues

### M1 — 5 meta descriptions too short, 6 too long
Too short (under 120 chars): `/now` (45), `/work` (65), `/thinking` (93), `/writing` (108), `/books` (108), `/cfp-log` (100)  
Too long (over 160 chars): `/concepts/universal-microservices` (241), `/concepts/agentic-systems` (228), `/whitepapers/csma` (186), `/perspectives/context-engineering` (180), `/whitepapers/uma-mcp` (166), `/concepts/contract-driven-ai-development` (168)

### M2 — og:type = "website" on content pages
`/perspectives/context-engineering/` and all `/concepts/*` pages should use `og:type: article` with `article:published_time`.

### M3 — /perspectives/ at 122 words (thinnest indexed page)
Only one perspective entry. Either expand with editorial framing or noindex until more content exists.  
File: `content/perspectives/index.md` (or noindex via frontmatter)

### M4 — SoftwareApplication @id missing on /projects/
All 4 nodes have no `@id`; `the-day-after-toolkit` and `Traverse` also missing `url`.  
File: `src/layouts/projects.njk`

### M5 — /thinking/ doesn't link directly to /uma/ or /c-dad/
Currently: `/thinking/` → `/concepts/` → `/concepts/universal-microservices/` → `/uma/` (3 clicks). Should be 2 max.  
**Fix:** Add direct links in `content/thinking.md`.

### M6 — dateModified absent on all TechArticle and ScholarlyArticle nodes
Recommended for recrawl prioritization. All whitepaper, concept, and framework pages affected.

### M7 — Whitepaper detail pages missing author bio in body
Quality raters landing on a whitepaper page from search see no E-E-A-T signal for the author. A one-line bio with link to /about/ costs little.

### M8 — /whitepapers/uma-mcp/ no PDF download link
All other 4 whitepaper pages have direct PDF links. UMA-MCP has only a detail page.

### M9 — Speaking CTA button lacks visual weight
LinkedIn CTA uses hairline border (no fill). Convention for primary conversion CTA is filled accent background.  
File: `src/layouts/speaking.njk`

### M10 — /now/ meta description 45 chars
Reads as a placeholder. Needs expansion.  
File: `content/now.md`

---

## Low Issues

### L1 — /whitepapers/uma-mcp/ date imprecise ("2025" only)
All other papers have month-level dates. Add `datePublished: "2025-06-01"` or correct month.

### L2 — ISBN missing on books
Google Book rich results require `isbn`. If available, add to `src/layouts/books.njk` schema.

### L3 — "The Day After" book missing `url` and `bookFormat` in schema
File: `src/layouts/books.njk`

### L4 — UMA+MCP whitepaper reuses uma-paper.png
If the paper has a distinct cover, use a separate image file. Alt text is correct but image filename is misleading.

### L5 — /writing/ recent post links point to publication homepage, not specific articles
2 of 6 recent post entries link to `medium.com/publication` not a specific post URL.  
File: `content/writing.md`

### L6 — /cfp-log/ shows zero accepted talks
Indexable but low E-E-A-T right now. Consider noindexing until ≥1 accepted talk, or adding richer context about the talk content.

---

## Sitemap
✅ All 25 pages present. XML valid. Trailing slash consistent. lastmod dates correct. No deprecated tags.

## AI Search Readiness: 79/100
Strong: crawler access complete, llms.txt Context block, FAQPage schema on framework pages, SSR rendering.  
Weak: paragraph lengths, 14 pages missing from llms.txt, label-style H2s on framework pages.

---

## Action Plan (prioritized)

| # | Issue | Effort | Files |
|---|---|---|---|
| C1 | Duplicate whitepaper titles | Low | content/whitepapers/uma.md, c-dad.md |
| C2 | Orphaned Person schema on /speaking/ | Low | src/layouts/speaking.njk |
| C3 | Missing datePublished on /concepts/* TechArticle | Low | content/concepts/*.md, src/layouts/page.njk |
| H1 | Dedup Person @graph + canonical sameAs | Medium | src/layouts/base.njk, home.njk, about.njk, speaking.njk |
| H2 | Add /concepts/ + /perspectives/ to llms.txt | Low | public/llms.txt |
| H3 | Question-format H2s on /uma/ and /c-dad/ | Medium | content/uma.md, content/cdad.md |
| H4 | Expand paragraphs to 130-160 words on framework pages | Medium | content/uma.md, content/cdad.md |
| H5 | Credential line on /uma/ and /c-dad/ hero | Low | src/layouts/uma.njk, cdad.njk |
| H6 | Keyword-rich titles for 12 hub pages | Low | content/*.md (title/ogTitle frontmatter) |
| H7 | Apress visible + Amazon CTA on /books/ | Low | src/layouts/books.njk |
| M1 | Fix 11 meta description lengths | Low | content/*.md frontmatter |
| M2 | og:type article on concept/perspective pages | Low | src/layouts/page.njk |
| M3 | Expand /perspectives/ or noindex | Medium | content/perspectives/index.md |
| M4 | @id + url on SoftwareApplication nodes | Low | src/layouts/projects.njk |
| M5 | Direct /uma/ and /c-dad/ links from /thinking/ | Low | content/thinking.md |
| M6 | dateModified on all article schema | Low | src/layouts/page.njk, uma.njk, cdad.njk |
| M7 | Author bio on whitepaper detail pages | Low | src/layouts/page.njk (whitepapers block) |
| M8 | PDF link for /whitepapers/uma-mcp/ | Low | content/whitepapers/uma-mcp.md |
| M9 | Speaking CTA accent fill | Low | src/layouts/speaking.njk |
| M10 | /now/ meta description expand | Low | content/now.md |
