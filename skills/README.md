# Claude Code Skills — Enrico Piovesan

Reusable, structured instruction sets for [Claude Code](https://claude.ai/code). Each skill defines a repeatable workflow for a specific type of task: what triggers it, what parameters it accepts, how it executes, and what it produces. Skills replace ad-hoc prompting with a consistent, reproducible process.

**Repository:** [github.com/enricopiovesan/enricopiovesan](https://github.com/enricopiovesan/enricopiovesan)
**Author:** [Enrico Piovesan](https://enricopiovesan.com) — Platform Architect, Author, Builder of portable systems and AI-navigable codebases.

---

## What is a Claude Code skill?

A skill is a `SKILL.md` file that Claude Code loads when a matching trigger phrase is detected. Instead of improvising a multi-step task from scratch each time, Claude follows the documented workflow: the sources to search, the structure to produce, the quality checks to run, and the output format to use.

Skills are version-controlled, shareable, and composable. They encode the reasoning behind a workflow — not just the steps, but why each step matters.

---

## Skills index

| Skill | What it does | Trigger example |
|---|---|---|
| [topic-signal-report](#topic-signal-report) | Multi-source signal report on any topic or technology | "give me a signal report on X" |

---

## Skill reference

### topic-signal-report

**File:** [`skills/topic-signal-report/SKILL.md`](./topic-signal-report/SKILL.md)

Produces a structured signal report on any topic, technology, or domain by researching across six source types in parallel: GitHub trending repositories, YouTube talks and tutorials, Hacker News discussions, arXiv research papers, release notes, and practitioner engineering blogs. The output is an honest, opinionated summary of where a topic actually stands right now — not where vendors say it is.

**When to use it:**
- You want to know what practitioners are building, watching, and debating in a specific area
- You need a quick but thorough read on where a technology or ecosystem is heading
- You are preparing a conference talk, white paper, or blog post and need current signal
- You want to identify cross-platform trends — topics showing up independently across GitHub, YouTube, and Hacker News simultaneously

**Trigger phrases:**
- "give me a signal report on X"
- "research what is happening in X"
- "what are practitioners building in X"
- "top repos and talks on X"
- "what is trending in X right now"

**Parameters:**

| Parameter | Required | Default | Description |
|---|---|---|---|
| `topic` | Yes | — | The domain, technology, or theme to research. Examples: "AI agents", "MCP servers", "Rust async", "context engineering" |
| `count` | No | 5 | Number of items to surface per source type (GitHub repos, YouTube talks) |
| `time_window` | No | 30 days | Coverage window. Options: "this week", "this month", "last 3 months", "all time" |

**Output:** A markdown report named `signal-report-[topic-slug]-[month]-[year].md` covering GitHub repositories, YouTube talks, Hacker News threads, research papers, recent releases, practitioner blog posts, and a cross-platform signal summary.

**Sources searched:** GitHub Trending, YouTube, Hacker News, arXiv (cs.SE / cs.AI), release notes, engineering blogs (Stripe, Shopify, Cloudflare, Notion, Linear, Vercel, and similar)

---

## How to add a skill

1. Create a new subfolder under `skills/` named after the skill: `skills/your-skill-name/`
2. Add a `SKILL.md` file with a YAML frontmatter block (`name`, `description`) and a documented workflow
3. Add an entry to the index table above and a reference section below it

The `description` field in the frontmatter is what Claude Code uses to match the skill to a user request. Write it to be specific and include the trigger phrases a user would naturally say.

---

## Related

- [enricopiovesan.com](https://enricopiovesan.com) — writing and frameworks on portable systems and AI-native architecture
- [Universal Microservices Architecture (UMA)](https://github.com/enricopiovesan/UMA-code-examples) — contract-driven execution model for distributed systems
- [the-day-after-toolkit](https://github.com/enricopiovesan/the-day-after-toolkit) — CLI for auditing codebase agent-readiness
- [youaskm3](https://github.com/enricopiovesan/youaskm3) — WASM-native personal knowledge layer
