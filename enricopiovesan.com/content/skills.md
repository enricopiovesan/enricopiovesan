---
title: Agent Skills — Enrico Piovesan
description: A collection of agent skills for Claude Code, Codex, and Cursor, built around contract-first development, spec-governed workflows, and AI-assisted architecture practices.
layout: section.njk
sectionGroup: work
breadcrumb:
  - href: /work/
    label: Work
  - label: Skills
permalink: /skills/
canonical: https://enricopiovesan.com/skills/
ogTitle: Agent Skills — Enrico Piovesan
ogDescription: Agent skills for Claude Code, Codex, and Cursor. Contract-first, spec-governed, built from the same thinking as C-DAD and Traverse.
---

Agent skills are folders of instructions that AI agents load to perform specific tasks in a repeatable, governed way. The skills in this collection are built around the same principles as the rest of the work here: contract-first, spec-governed, and designed to make AI-assisted development safer and more predictable.

These are not prompt tricks or shortcut libraries. They are structured workflows that encode how to approach a specific class of problem, what to verify before proceeding, and what constraints to respect throughout.

## Why a public skills collection

Most agent skills are private, project-specific, or tied to a single tool. This collection is public and designed to be composable across tools and projects.

The underlying belief is the same one that produced C-DAD and Traverse: AI agents work better when the intent is declared explicitly rather than inferred. Skills are one concrete way to do that. A well-written skill tells an agent not just what to do but how to reason about the problem, what edge cases to check, and when to stop and ask rather than guess.

## How to use these skills

Skills follow the standard Agent Skills specification and are compatible with Claude Code, Codex, Cursor, and any agent that supports SKILL.md files.

To add a skill to your project, copy the SKILL.md file into your project's skills directory or reference the GitHub path directly. The skill activates when you describe the task it handles — no configuration required.

The full collection lives on GitHub: [github.com/enricopiovesan/enricopiovesan/tree/main/skills](https://github.com/enricopiovesan/enricopiovesan/tree/main/skills)

## Skills in this collection

### [Topic Signal Report](/skills/topic-signal-report/)

Researches any topic, technology, or domain across six source types in parallel and produces a structured signal report. Covers what practitioners are building on GitHub, what they are watching on YouTube, what they are debating on Hacker News, what research is landing on arXiv, what has shipped in release notes, and what teams are writing about from production experience.

Useful for architects and engineering leaders who need an honest current picture of a technology area before making a platform decision or writing a recommendation.

[Read the full skill documentation](/skills/topic-signal-report/)

## Philosophy

**Contract before execution.** Every skill starts by declaring what it is trying to achieve, what constraints apply, and what a successful outcome looks like. The agent does not start executing until those things are clear.

**Verify, do not assume.** Skills include explicit verification steps. The agent checks its work against declared criteria before reporting completion.

**Stop and ask at the right moments.** A skill that never stops and asks produces plausible-looking output that violates unstated constraints. These skills include explicit decision points where the agent surfaces ambiguity rather than resolving it silently.

**Composable and reusable.** Each skill addresses one class of problem. Multiple skills can be combined for complex tasks without each one needing to know about the others.

## Connection to the broader work

These skills are the practical expression of the ideas behind Contract-Driven AI Development and Traverse. C-DAD defines how software should declare its intent so AI agents can navigate it safely. These skills apply the same principle in the other direction: they declare the agent's intent so the work it produces is predictable, verifiable, and governed.

- [Contract-Driven AI Development](/c-dad/)
- [Traverse](https://traverse-framework.com)
- [C-DAD White Paper](/whitepapers/c-dad/)
- [the-day-after-toolkit](https://github.com/enricopiovesan/the-day-after-toolkit)
