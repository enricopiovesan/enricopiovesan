# SEO Audit — enricopiovesan.com
**Date:** June 6, 2026  
**Pages crawled:** 25  
**Agents:** Technical SEO · Content Quality · Schema · GEO/AI Readiness · SXO

---

## SEO Health Score: 61 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 58 | 12.8 |
| Content Quality | 23% | 65 | 14.9 |
| On-Page SEO | 20% | 52 | 10.4 |
| Schema / Structured Data | 10% | 48 | 4.8 |
| Performance (CWV) | 10% | 82 | 8.2 |
| AI Search Readiness | 10% | 61 | 6.1 |
| Images | 5% | 70 | 3.5 |
| **Total** | | | **60.7** |

---

## Business Type
Personal brand site — Platform Software Architect, author (Apress), open source builder. Primary intents: professional credibility, framework discoverability (UMA, C-DAD), speaking acquisition.

---

## Top 5 Critical Issues

1. **Title tag duplication** — 22/24 pages render "Page — Enrico Piovesan - Enrico Piovesan" (name appears twice)
2. **Content cannibalization** — UMA and C-DAD each have 3 competing pages with identical titles and near-duplicate content
3. **Duplicate Person schema** — head `Person` has no `@id`; conflicts with page-level `#person` entity on every page
4. **Sitemap incomplete** — `/whitepapers/uma-mcp/` and `/cfp-log/` have built HTML but are absent from sitemap.xml
5. **Static nav/footer links absent** — all navigation is JS web components; crawlers get no link graph without executing JS

---

## Top 5 Quick Wins

1. Fix title template (remove duplicate author suffix) — 30-minute template edit
2. Add missing URLs to sitemap.xml — 10-minute edit
3. Add `@id` to head Person schema in base.njk — 1-line fix
4. Add `datePublished` to ScholarlyArticle schemas on whitepaper sub-pages — frontmatter + template fix
5. Add speaking inquiry CTA to `/speaking/` — copy + link addition

---

## Technical SEO

### robots.txt
The built `docs/robots.txt` is clean — explicit `Allow: /` for GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot. However, the **live robots.txt** (fetched from enricopiovesan.com) contains a Cloudflare-injected managed block at the top that **Disallows ClaudeBot, GPTBot, Google-Extended, Bytespider, CCBot** before the manual Allow rules. First-match parsers honour the Disallow. This is Cloudflare's "Bot Management" layer overwriting the source file.

**Action:** Cloudflare Dashboard → Security → Bots → verify "Block AI Scrapers" managed rule is OFF.

### Sitemap
22 URLs in sitemap.xml. Missing:
- `https://enricopiovesan.com/whitepapers/uma-mcp/` (has built page, has content)
- `https://enricopiovesan.com/cfp-log/` (has built page, has content)

No `priority` or `changefreq` attributes (minor — Bing uses these).

### Title Tags
| Pattern | Count | Example |
|---|---|---|
| Correct | 2 | `Universal Microservices Architecture (UMA) - Enrico Piovesan` |
| Duplicated suffix | 22 | `About — Enrico Piovesan - Enrico Piovesan` |
| Homepage | 1 | `Enrico Piovesan - Platform Architect & Author` |

Root cause: title template appends `" - Enrico Piovesan"` to `{{ title }}`, and `{{ title }}` already ends with `"— Enrico Piovesan"` on all pages except `/uma/` and `/c-dad/`.

### Canonical Tags
All 25 pages: correct, self-referencing, absolute URLs. ✓

### H1 Structure
All pages have exactly one H1. Homepage H1 is a philosophy statement ("Software should work for users…") not a keyword phrase — intentional brand voice, acceptable.

### Internal Linking
All navigation and footer links are inside `ep-nav` and `ep-footer` web components. Without JS execution, crawlers see no internal links in the HTML source. This means:
- Google must execute JS to discover the link graph
- Googlebot does execute JS, but with delay — new pages may take longer to be found
- 7 pages are effectively orphaned from a static-crawl perspective: `/now/`, `/cfp-log/`, `/thinking/`, `/work/`, and concept sub-pages

**Fix:** Add a static `<nav>` with key links in `<noscript>` or in the HTML before the web component mounts.

### Security Headers
No Content Security Policy (CSP). Cloudflare provides basic headers (HSTS present via Cloudflare). CSP can be added via a `_headers` file in the repo root (served by Cloudflare Pages / GitHub Pages).

### Performance
- CSS is render-blocking (external `global.css` in `<head>`) — Lighthouse flagged this
- Fonts: `font-display: optional` — correct, eliminates CLS from font swap ✓
- GTM: async, but 156 KiB, 103–138ms main thread — single largest performance impact
- No `<link rel="preconnect">` to `https://www.googletagmanager.com`
- CLS: 0.047–0.077 (borderline; driven by web component render timing)

### 404 Page
Two 404 files: `/docs/404.html` and `/docs/public/404.html`. Confirm only one is served.

---

## Content Quality

**E-E-A-T Score: 75 / 100**

| Factor | Score | Key Gap |
|---|---|---|
| Experience | 17/20 | No timestamps showing ongoing iteration on most pages |
| Expertise | 21/25 | No formal credentials listed, no peer citations |
| Authoritativeness | 17/25 | CFP log has zero accepted talks; no third-party coverage cited |
| Trustworthiness | 20/30 | No privacy policy, no email address, no last-updated dates |

### Thin Content
- `/work/` — 65 words of body copy (3 stubs)
- `/thinking/` — 56 words of body copy (2 stubs)
- `/now/` — minimal content; `/cfp-log/` — zero accepted entries

### Near-Duplicate Content Clusters
Three URLs compete for "universal microservices architecture":
- `/uma/` (232 lines, TechArticle schema)
- `/whitepapers/uma/` (154 lines, ScholarlyArticle schema)
- `/concepts/universal-microservices/` (137 lines, no content schema)

Same pattern for C-DAD. All three pages in each cluster have identical title tags and near-identical opening sections.

### Factual Inconsistency
Homepage, about, speaking, projects all say **"five research papers"**. `/whitepapers/` index says **"Four research papers"**. The fifth paper (`/whitepapers/uma-mcp/`) exists as a built page but is absent from the sitemap, the whitepapers index listing, and the meta description.

### Missing Content Opportunities
- `/writing/` links to Medium but surfaces zero post titles — no freshness signal, no on-site depth
- `/perspectives/` has one article (should be a growing section)
- `/speaking/` talks have no dates, no conference names, no accepted status
- `/books/` forthcoming book has no ETA, no pre-order path

---

## On-Page SEO

### Meta Descriptions
| Page | Issue |
|---|---|
| `/whitepapers/` | "Four research papers" — contradicts site-wide "five" claim |
| `/work/` | Generic — "Books, white papers, and open source projects by Enrico Piovesan" |
| `/thinking/` | Generic — "Concepts and perspectives on software architecture…" |
| All others | Accurate, within length limits ✓ |

### Heading Hierarchy
Clean across all pages. One H1 per page. ✓

### Internal Link Coverage
- `/cfp-log/` — not linked from `/speaking/` (natural home)
- `/perspectives/` — not linked from `/writing/` (natural home)
- `/now/` — only in footer, not in nav
- `/whitepapers/uma-mcp/` — not linked from `/whitepapers/` index

---

## Schema / Structured Data

**Schema Health: 48 / 100**

### Issues

| Severity | Issue | Fix |
|---|---|---|
| Critical | Head `Person` (base.njk) has no `@id` — conflicts with `#person` entity on every page | Add `"@id": "https://enricopiovesan.com/#person"` to head Person |
| Critical | `/books/` has two separate Book schema blocks — second has `"publisher": "Amazon"` (invalid string, not Organization) and wrong `bookFormat` URL | Remove second script block entirely |
| High | `/speaking/` second Person block has no `@id` — creates 3rd orphaned Person entity | Merge `hasOccupation` into `#person` @graph block |
| High | Whitepaper sub-pages: ScholarlyArticle missing `@id`, `datePublished`, `description` | Add to page frontmatter + page.njk template |
| High | ScholarlyArticle `publisher` typed as `Person` — should be `Organization` | Change to `{ "@type": "Organization", "name": "Enrico Piovesan" }` |
| Medium | `/concepts/` sub-pages have no content schema (only base Person) | Add TechArticle + BreadcrumbList |
| Low | Book schema: `"datePublished": "2024"` not ISO 8601; `bookFormat` uses URL not short form | `"2024-01-01"`, `"EBook"` |
| Low | `sameAs` differs between head Person and page-level `#person` | Unify into one canonical set |

### Missing Opportunities
- `FaqPage` schema on `/uma/` and `/c-dad/` — strongest signal for Google AI Overviews
- `SoftwareApplication` or `TechArticle` on `/projects/` per project
- `Event` schema on `/speaking/` (even with TBD dates)
- `WebPage` node with `dateModified` on `/now/`
- `isbn` on UMA book if print ISBN available

---

## Performance (CWV)

Lighthouse scores (mobile / desktop):

| Metric | Mobile | Desktop |
|---|---|---|
| Performance | 99 | 100 |
| FCP | 0.9s | 0.3s |
| LCP | 1.5s | 0.7s |
| TBT | 20ms | 40ms |
| CLS | 0.077 | 0.047 |
| SI | 0.9s | 0.3s |

Scores are excellent. Remaining opportunities:
- GTM is the single largest impact item (156 KiB, 103ms main thread) — no practical fix without removing analytics
- CLS driven by web component render timing — 0.077 is borderline (threshold: 0.1)
- Add `<link rel="preconnect" href="https://www.googletagmanager.com">` to base.njk

---

## AI Search Readiness (GEO)

**GEO Health Score: 61 / 100**

| Platform | Score | Key Blocker |
|---|---|---|
| Google AI Overviews | 55/100 | No FAQ schema, no question headings, missing ScholarlyArticle dates |
| ChatGPT (Browse) | 62/100 | Good SSR + llms.txt; hurt by passage fragmentation |
| Perplexity | 68/100 | Strong sitemap + SSR; passage length limits citation |
| Bing Copilot | 58/100 | Missing datePublished, no FAQ schema |

### robots.txt (Live)
Cloudflare-injected block disallows major AI crawlers at the top of the file before the manual Allow rules. First-match parsers treat these as blocked. **This is the highest-severity AI discoverability issue on the site.**

### llms.txt
Present at `/public/llms.txt`. Well-structured, comprehensive inventory. Gaps:
- `/whitepapers/uma-mcp/` not listed
- No licensing declaration (add `> License: CC BY 4.0` or similar)
- No `## Context` block positioning Enrico as originator of UMA/C-DAD

### Passage Length
Every paragraph across C-DAD, UMA, concepts, and whitepaper pages falls in the 40–80 word range. AI citation extraction works best in the 134–167 word range. Zero paragraphs on the site hit this range on key framework pages.

### Question Headings
All headings are declarative. Only `/perspectives/context-engineering/` uses question-format headings. This is the strongest AI Overview signal and is absent from the two most important pages (`/uma/`, `/c-dad/`).

---

## SXO — Search Experience

**SXO Gap Score: 54 / 100**

### Persona Coverage
| Persona | Quality | Gap |
|---|---|---|
| Researcher / architect | Strong | Cannibalization dilutes authority |
| Speaking booker | Weak | No direct contact CTA, no past conferences, /cfp-log/ orphaned |
| Hiring manager | Partial | Autodesk not visible above the fold on homepage |
| Collaborator | Moderate | No GitHub stars, CI badges, contribution links |
| Journalist / press | None | No press page, no media kit |

### Homepage Above-the-Fold
- ✓ Clear positioning in hero label
- ✗ No mention of Autodesk in above-fold content
- ✗ No credentials line ("1 book (Apress), 5 white papers") — nav-cards are below fold on most screens

### /about/ Soft Duplicate
Same opening label as homepage ("Platform architect. Author. Open source builder."). H1 is just "Enrico Piovesan" — same as homepage og:title. Meta descriptions differentiate slightly but not enough to signal distinct purpose to Google.

---

## Images

- Alt text: present on headshot and book cover images ✓
- Formats: WOFF2 for fonts ✓
- OG image: set to `/public/og-default.png` on all pages — single image for all pages. Per-page OG images would improve CTR from social shares.
- No WebP format offered for the headshot or book cover (JPEG/PNG only)

---

## Sitemap Quality

| Check | Status |
|---|---|
| Valid XML | ✓ |
| All indexed pages included | ✗ — 2 missing |
| `lastmod` dates | ✓ — all present |
| `priority` / `changefreq` | ✗ — absent |
| Homepage included | ✓ |
| Sitemap declared in robots.txt | ✓ |
