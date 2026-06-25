---
title: Topic Signal Report — Agent Skill
description: An agent skill for Claude Code, Codex, and Cursor that researches any topic across GitHub, YouTube, Hacker News, arXiv, release notes, and practitioner blogs and produces a structured signal report.
layout: section.njk
sectionGroup: skills
breadcrumb:
  - href: /skills/
    label: Skills
  - label: Topic Signal Report
permalink: /skills/topic-signal-report/
canonical: https://enricopiovesan.com/skills/topic-signal-report/
ogTitle: Topic Signal Report — Agent Skill
ogDescription: An agent skill that researches any technology topic across six source types and produces a structured signal report. Compatible with Claude Code, Codex, and Cursor.
---

**Skill:** topic-signal-report
**Compatible with:** Claude Code, Codex, Cursor, any agent supporting SKILL.md
**Source:** [View on GitHub](https://github.com/enricopiovesan/enricopiovesan/tree/main/skills/topic-signal-report)

---

## What this skill does

The Topic Signal Report skill researches any topic, technology, or domain across six source types in parallel and produces a structured, opinionated signal report. The goal is an honest current picture of where a topic actually is right now, not where vendors say it is.

Source types covered in every report:

- **GitHub** — what practitioners are actually building and shipping
- **YouTube** — what practitioners are watching and learning from
- **Hacker News** — what practitioners are debating, including real production pain and honest skepticism
- **arXiv and research reports** — what research is landing and which papers have direct implications for system design
- **Release notes** — what has actually shipped in frameworks, specs, and tools
- **Practitioner engineering blogs** — what teams at companies are writing about from production experience

The skill runs all six source types before writing a single word. The report is only as good as the breadth of the research. It identifies cross-platform signals — topics that appear independently across multiple source types — which are the most reliable indicators of genuine ecosystem shift rather than momentary noise.

## When to use it

Trigger this skill with requests like:

- "Research what is happening in AI agents right now"
- "Give me a signal report on MCP servers"
- "What are practitioners building in Rust async runtimes?"
- "Top repos and talks on context engineering this month"
- "What is trending in software architecture right now?"

It works for any domain: AI agents, software architecture, Rust, developer tooling, security, frontend frameworks, infrastructure, event-driven systems, WebAssembly, and any other technology area.

## Parameters

**Topic** (required): The domain, technology, or theme to research. Can be broad ("AI agents") or specific ("MCP server implementations", "Rust async runtime tradeoffs").

**Count** (optional): How many items to surface per source type. Default is 5. Applies to GitHub repos and YouTube talks. Other source types surface as many relevant signals as found.

**Time window** (optional): Default covers the last 30 days. Options are "this week", "this month", "last 3 months", or "all time". Weekly shows what is viral. Monthly shows sustained momentum. Longer windows show established leaders and foundational resources.

If any parameter is ambiguous, the skill asks one clarifying question before starting.

## What the report contains

Each report follows a consistent structure:

**Opening paragraph** — the dominant signal across all source types for the period, named as a pattern rather than a list of tools.

**GitHub section** — the top repositories, each with an honest one-line description (not README marketing copy), a growth signal, a "worth watching if" statement, and a specific caveat for senior engineers.

**YouTube section** — top talks and tutorials, prioritizing conference talks with substance over product demos. Channels like QCon, GOTO, SREcon, and KubeCon carry more signal weight.

**Hacker News section** — summaries of the most relevant threads, including real sentiment. Skepticism is preserved, not softened. Ask HN threads are weighted highest.

**Research section** — papers and technical reports with direct implications for how systems are designed or built, not pure theory.

**What shipped section** — factual list of significant releases in the time window.

**Cross-platform signals** — explicit identification of any signal that appeared independently across two or more source types. These are labeled as the strongest indicators.

**Closing paragraph** — where the topic is heading in the next 3 to 6 months based on what the research shows. If signals are contradictory, the report says so.

## Writing standards enforced by the skill

The skill enforces a set of writing standards on every report it produces. These are not stylistic preferences — they are quality gates built into the skill's verification step.

The report never contains:
- Em dashes (rewritten as commas, full stops, or restructured sentences)
- Semicolons
- "Cutting-edge", "revolutionary", "game-changing", "powerful", or "robust"
- Star counts presented as evidence of quality rather than popularity
- README marketing copy presented as independent analysis
- Generic caveats like "it is still early days" without specifics

Before the skill writes a single word, six quality checks must pass:
1. All six source types were searched, even if some returned thin results
2. Every "why it is trending" section names a specific trigger or growth pattern
3. Every caveat is specific, not generic
4. Cross-platform signals are identified and labeled
5. No em dashes or semicolons in the output
6. Star counts and view counts are labeled as approximate where not directly verified

## Output format

The report is saved as a markdown file named:

`signal-report-[topic-slug]-[month]-[year].md`

Example: `signal-report-ai-agents-june-2026.md`

## How to add this skill to your project

Copy the SKILL.md file into your project's skills directory:

```
your-project/
  skills/
    topic-signal-report/
      SKILL.md
```

Then trigger it by describing the research task. The agent reads the skill file and follows the workflow automatically.

Alternatively, reference the GitHub path directly when working with an agent that supports remote skill loading.

[Download SKILL.md from GitHub](https://github.com/enricopiovesan/enricopiovesan/tree/main/skills/topic-signal-report)

## Connection to the broader work

The Topic Signal Report skill was built to power the [Software Architecture Radar](/radar/), a monthly publication of 10 curated architecture signals. The skill generates the raw research. Each issue is then reviewed and edited before publication.

The skill applies the same principles as the rest of the work here. C-DAD defines how software should declare its intent so AI agents can navigate it safely. This skill declares the research agent's intent so the output is predictable, verifiable, and governed rather than whatever the model decides to produce on a given day.

- [Back to all skills](/skills/)
- [Software Architecture Radar](/radar/)
- [Contract-Driven AI Development](/c-dad/)
