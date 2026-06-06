---
title: Uses
description: How Enrico Piovesan works — the setup, tools, and workflow behind the architecture work, writing, and open source projects.
layout: page.njk
permalink: /uses/
canonical: https://enricopiovesan.com/uses/
ogTitle: Uses
ogDescription: The setup, tools, and workflow behind the architecture work, writing, and open source projects.
---

A year and a half ago I was reviewing every line of code. Then I wrote the C-DAD paper and realized the problem was never the code. It was the absence of contracts. You cannot trust AI to execute if you have not declared what it is supposed to do and under what conditions it can be trusted.

Now I invest in the harness. The stack follows the solution.

## How I work

I measure the baseline before touching anything. If I cannot define metrics that prove progress, I do not have a clear enough picture of the problem yet. Once the baseline is solid I define the target architecture and break it into incremental slices that each deliver real value to real users. The language and tooling choices come after that, not before.

This applies to greenfield and brownfield equally. The approach does not change. The starting point does.

## The AI setup

My workflow runs on AI. Not as a tool I reach for occasionally but as the operating system my day runs on.

I work with multiple agents running in parallel across multiple projects simultaneously. When an agent needs input it waits. We run a focused session, I provide the context or decision it needs, and it continues. The output is a backlog item, a contract, a spec, or a code slice — depending on what the session was for.

All agent work is managed through Claude Code, Codex, and Cursor. The choice between them depends on the task and the project context.

At the end of every working day each agent produces a retrospective of what was done and what was learned. I review it, provide feedback, and the agent surfaces the most actionable improvements for the next session. The process improves continuously.

## The second brain

My knowledge lives in a graph. Everything I read, write, research, and build feeds into it. When I am working on a problem the graph is the starting point, not a search engine. The connections between ideas are as important as the ideas themselves.

This is the foundation youaskm3 is being built on. The goal is a WASM-native, MCP-powered personal knowledge layer that anyone can fork and run. Zero cost, no server, fully portable.

## Contract-first, always

Before any code exists in a new project I write contracts and specs that define the functional and non-functional requirements. Not high-level documentation. Machine-readable contracts that the pipeline can enforce.

The architecture is tailored to the solution. The team capabilities, hiring considerations, and technology preferences are secondary to what the problem actually requires. That order matters.

## Writing

I write every morning before the work day starts. One hour, no interruptions. That is where the blog posts and books get written. Not in stolen moments between meetings. In dedicated time before anything else competes for attention.

The writing is thinking made visible. Posts become papers. Papers become books. The artifact is almost a bonus compared to what you learn producing it.

Writing tools are minimal. The ideas are the hard part.
