---
name: topic-signal-report
description: Use this skill to research and produce a structured signal report on any topic, technology, or domain. Searches across GitHub trending repositories, YouTube talks and tutorials, Hacker News discussions, web sources, research papers, and practitioner blogs. Trigger on requests like "research what is happening in X", "give me a signal report on X", "what are practitioners building in X", "top repos and talks on X", "what is trending in X right now", or any request to get a comprehensive current picture of a technology area. The user can specify how many items to include per source — default is 5 if not stated. Works for any domain: AI agents, software architecture, Rust, devtools, security, frontend, infrastructure, and so on.
---

# Topic signal report

This skill produces a structured signal report on any topic by researching across multiple source types in parallel. It covers what practitioners are building (GitHub), what they are watching and learning from (YouTube), what they are debating (Hacker News), what research is landing (arXiv and technical reports), and what is shipping (release notes and announcements). The output is an honest, opinionated summary of where a topic actually is right now — not where vendors say it is.

---

## Parameters

**Topic:** Required. The domain, technology, or theme to research. Examples: "AI agents", "software architecture", "MCP servers", "Rust async runtimes", "agent observability", "context engineering".

**Count:** Optional. How many items to surface per source type. Default is 5 if not specified. Applies to GitHub repos and YouTube talks — other source types surface as many relevant signals as found. User can specify a different number.

**Time window:** Optional. Default covers the last 30 days. User can request "this week", "this month", "last 3 months", or "all time". Weekly shows what is viral. Monthly shows sustained momentum. Longer windows show established leaders and foundational resources.

If any parameter is ambiguous, ask one clarifying question before starting. Do not guess.

---

## Research workflow

Run all source types before writing a single word. The report is only as good as the breadth of the research. This is evidence gathering — do not synthesize or write conclusions until all sources have been searched.

### Source 1 — GitHub trending repositories

What practitioners are actually building and shipping. A repository trending for weeks is a stronger signal than one that spiked for a day.

Search queries:
- "github trending [topic] [month] [year]"
- "github.com/trending [topic]"
- "top github repositories [topic] [year]"
- Direct aggregators if available: trendshift.io/monthly, ossinsight.io/trending/ai

For each repository found, note: name, URL, approximate star count, growth signal (daily/weekly/monthly), and what it does in one honest sentence.

### Source 2 — YouTube talks and tutorials

What practitioners are watching, learning from, and publishing. Prioritize talks that come with a GitHub repo or paper behind them — those have substance beyond the slide deck. Conference talks from QCon, GOTO, SREcon, KubeCon, and Strange Loop carry more signal than product demos.

Search queries:
- "[topic] talk conference [month] [year] youtube"
- "[topic] tutorial production [month] [year]"
- "[topic] deep dive [year] youtube"
- Specific channels relevant to the topic (e.g. Fireship, ThePrimeagen, Hussein Nasser, ByteByteGo for architecture topics)

For each talk found, note: title, channel, approximate view count or engagement signal, and what the core argument or demonstration is.

### Source 3 — Hacker News discussions

Where practitioners surface real production pain, debate tradeoffs, and share honest experiences that do not appear in polished blog posts. "Ask HN" threads are the highest-signal format — they represent genuine questions from people building real systems.

Search queries:
- "site:news.ycombinator.com [topic] [month] [year]"
- "hacker news ask HN [topic] [year]"
- "hacker news show HN [topic] [month] [year]"
- "hacker news [topic] production [year]"

For each thread found, note: title, approximate comment count or upvote signal, and the dominant sentiment or finding in the discussion.

### Source 4 — Research papers and technical reports

Papers published or crossing into mainstream practitioner awareness in the specified time window. Prioritize papers with direct implications for how systems are designed or built — not pure ML theory unless the topic specifically calls for it.

Search queries:
- "arxiv.org cs.SE [topic] [month] [year]"
- "arxiv.org cs.AI [topic] [month] [year]"
- "[topic] research paper [month] [year]"
- "[topic] study findings [year]"

For each paper found, note: title, authors, publication venue or arXiv ID, and the key finding in one sentence.

### Source 5 — Release notes and announcements

What actually shipped. Framework major versions, spec changes, protocol milestones, significant feature releases. This is the most factual source type — something either shipped or it did not.

Search queries:
- "[topic] release [month] [year]"
- "[major tool or framework in topic area] update [month] [year]"
- "[topic] launch announcement [month] [year]"

For each release found, note: what shipped, when, and the one change that matters most to practitioners.

### Source 6 — Practitioner blogs and engineering posts

What teams at companies are writing about from production experience. These carry more signal than vendor posts because practitioners are describing what they actually encountered, not what they hoped to sell. Priority sources: Stripe, Shopify, Notion, Linear, Vercel, Cloudflare, Netflix, and similar engineering blogs.

Search queries:
- "[topic] engineering blog [month] [year]"
- "[topic] production lessons [year]"
- "[topic] what we learned [year]"
- "[company engineering blog] [topic] [year]"

---

## Cross-platform consistency check

Before writing, assess whether any signal appears across multiple source types. A topic that shows up in GitHub trending AND a high-upvote Hacker News thread AND a recent conference talk is a stronger signal than the same topic appearing in only one place. Note these cross-platform signals explicitly in the report — they are the most reliable indicators of what is actually shifting in the ecosystem.

Single-source signals are still worth reporting but should be labeled as such. Do not amplify a single viral moment as if it represents a sustained trend.

---

## Report structure

### Header

```
# Signal report: [topic]. [Time window].

**Researched:** [Date]
**Time window:** [Daily / Weekly / Monthly / Last 3 months / All time]
**Sources covered:** GitHub, YouTube, Hacker News, arXiv, release notes, practitioner blogs
```

---

### Opening paragraph

2 to 3 sentences. What is the dominant signal across all source types this period? Name the pattern, not the tools. Be specific to this topic and this time window.

---

### GitHub — what practitioners are building

List the top [count] repositories. For each:

**[repo name] — [honest one-line description]**
`[github.com/owner/repo]` | ⭐ [star count] | [growth signal]

*What it does:* One sentence. The honest version, not the README marketing copy.
*Why it is trending:* One sentence. Specific trigger or sustained growth pattern.
*Worth watching if:* One sentence. The use case or team profile this fits best.
*Caveat:* One sentence. Maturity, limitations, or risks a senior engineer would want to know. If none, write "No significant caveats at this stage."

---

### YouTube — what practitioners are watching

List the top [count] talks or tutorials. For each:

**[talk title]**
[Channel name] | [approximate views or engagement signal] | [link if available]

*Core argument or demonstration:* One to two sentences. What does this teach or show that practitioners are finding valuable right now?

---

### Hacker News — what practitioners are debating

Summarize the 3 to 5 most relevant threads. For each:

**[thread title or paraphrase]**
[Approximate engagement signal]

*What the discussion reveals:* One to two sentences. The honest finding from the thread — including if the sentiment is skeptical, mixed, or enthusiastic. Do not soften real skepticism.

---

### Research — what is being published

List relevant papers or technical reports. For each:

**[paper title]**
[Authors] | [arXiv ID or venue] | [date]

*Key finding:* One sentence. The result that changes how you would design or build something.

---

### What shipped — recent releases

List significant releases in the time window. For each:

**[what shipped]** — [date]
*The one change that matters:* One sentence.

---

### Cross-platform signals

Name any signal that appeared independently across two or more source types. These are the strongest indicators of genuine ecosystem shift versus momentary noise. If no cross-platform signals were found, say so.

---

### Closing paragraph

2 to 3 sentences. Where is this topic heading in the next 3 to 6 months based on what the research shows? Name the direction, not just the tools. If the signals are contradictory, say so — that is itself a useful finding.

---

## Writing standards

**Voice:** Write to a senior engineer or technical lead with 10 or more years of experience. Skip definitions of well-known concepts. Have an opinion.

**What never appears in this report:**
- Em dashes. Use commas, full stops, or restructure the sentence.
- Semicolons.
- "Cutting-edge", "revolutionary", "game-changing", "powerful", "robust"
- "In today's fast-paced world..."
- Star counts presented as evidence of quality rather than popularity
- README marketing copy presented as independent analysis
- Generic caveats like "it is still early days" without specifics

**Formatting:**
- Each source type is an H2 section
- Individual items within sections are H3 or bold headers
- Prose inside entries, not bullet points
- One blank line between entries

---

## Quality checks before writing

All six must pass. Fix before writing.

1. All six source types were searched, even if some returned thin results
2. Every "why it is trending" section names a specific trigger or growth pattern
3. Every caveat is specific, not generic
4. Cross-platform signals are identified and labeled
5. No em dashes or semicolons anywhere
6. Star counts and view counts are sourced or labeled as approximate

---

## Output

Save the report as a markdown file named:

`signal-report-[topic-slug]-[month]-[year].md`

Example: `signal-report-ai-agents-june-2026.md`

Save to `/mnt/user-data/outputs/` and present using `present_files`.

After presenting, state in one sentence what the dominant cross-platform signal was, and flag any source type where results were thin or could not be directly verified.
