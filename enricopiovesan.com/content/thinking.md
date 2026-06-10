---
title: Architecture Concepts & Perspectives
description: Concepts and perspectives on software architecture, AI-native systems, and portable runtimes, covering UMA, C-DAD, agentic systems, and context engineering.
layout: section.njk
sectionGroup: thinking
breadcrumb:
  - label: Thinking
permalink: /thinking/
canonical: https://enricopiovesan.com/thinking/
ogTitle: Thinking
ogDescription: Concepts and perspectives on software architecture, AI-native systems, and portable runtimes.
---

The work section covers what has been built and published. This section covers how to think about the problems that motivated it. Not tutorials or summaries of what others are saying. Close readings of specific ideas, where they lead, and what they leave unresolved.

## [Concepts](/concepts/)

Short, precise explanations of the three architectural ideas behind the published work. Each concept page answers one question directly and links to the full framework, white paper, and tooling behind it.

[Universal Microservices Architecture](/concepts/universal-microservices/) addresses the portability problem: why does the same business logic get rewritten for every runtime, and what does an architecture look like that prevents it structurally? The concept page gives the short answer. The [full UMA framework page](/uma/) and the [Apress book](https://www.amazon.com/dp/B0GTTTTQH4) give the complete model.

[Contract-Driven AI Development](/concepts/contract-driven-ai-development/) addresses the navigability problem: why can AI agents describe what software does but not why it does it, and what changes when contracts replace implicit intent? The concept page gives the short answer. The [full C-DAD framework page](/c-dad/) and the forthcoming book give the complete model.

[Agentic Systems Architecture](/concepts/agentic-systems/) addresses the coordination problem: what does software need to provide structurally for AI agents to participate safely? Not just to execute instructions, but to navigate capabilities, validate behavior, and compose solutions within declared boundaries.

## [Perspectives](/perspectives/)

Longer analytical pieces on specific terms and practices the industry is actively building around. The format is always the same: what the idea gets right, what it leaves unresolved, and what structural answer fills the gap. Current piece: [Beyond Context Engineering](/perspectives/context-engineering/), which asks why giving agents better context is necessary but not sufficient, and why machine-enforceable contracts solve the problem that context management cannot. New perspectives are added as the field moves and specific ideas become worth examining at length.

## [Knowledge Graph](/knowledge-graph/)

An interactive map of the concepts, arguments, and connections across the published writing: books, white papers, and articles. 577 nodes, 602 edges, 82 communities. Built from the intellectual content only, not the site structure. Useful for finding how ideas connect across different frameworks and pieces.
