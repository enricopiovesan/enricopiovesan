---
title: Speaking — Enrico Piovesan
description: Conference talks on portable systems, contract-driven AI development, and restructuring software for the age of AI agents.
layout: page.njk
permalink: /speaking/
canonical: https://enricopiovesan.com/speaking/
ogTitle: Speaking — Enrico Piovesan
ogDescription: Conference talks on architecture, WASM, and AI-native systems drawn from published books and shipped tooling.
---

I talk about portable systems, contract-driven AI development, and what it actually takes to restructure software for the age of AI agents. Every talk is drawn directly from published books, white papers, and shipped tooling. These are not ideas I am exploring. They are problems I spent years running into and frameworks I built to fix them.

## Write Once, Run Where It Makes Sense

**Architecture and platform engineering tracks**

Every team I have worked with has the same invisible tax. The payment logic lives in the backend. A version of it lives in the browser. Another version runs at the edge. A fourth gets rewritten when the AI pipeline needs it. Nobody planned this. It just happened because the architecture made assumptions about the environment before it made decisions about the problem.

This talk is about what it looks like to design the other way around. To separate business logic from execution context so it can run where it makes sense, not where the architecture happens to put it. The framework is Universal Microservices Architecture. The runtime is WebAssembly. The result is a codebase where the same logic runs across browser, backend, edge, and AI pipeline without being rewritten for each one.

The talk is grounded in a published book, a 13-chapter runnable companion repo with 100% business logic coverage enforced in CI, and a live reference application.

Based on: [Universal Microservices Architecture](https://www.amazon.com/dp/B0GTTTTQH4) and the [UMA reference implementation](https://www.universalmicroservices.com)

---

## Contract-Driven AI Development

**AI engineering and developer tooling tracks**

AI coding tools are good at describing what software does. They are not good at knowing why it does it. The constraint that exists because of a regulatory audit three years ago. The non-goal that was obvious in the room and invisible in the repo. The exception path that one engineer carries in their head and nowhere else.

When an AI agent encounters that code, it guesses. Sometimes it guesses correctly. Often it does not. The problem is not the model. The problem is that the codebase has no contracts, only code.

This talk introduces Contract-Driven AI Development. The core idea is that a specification describes what a system does, but a contract describes why it can be trusted. Verifiable contracts, automated reasoning, and hybrid governance change what agentic systems can do with a codebase and what teams can safely delegate to them.

Based on: [C-DAD White Paper](/whitepapers/) and the [the-day-after-toolkit](https://github.com/enricopiovesan/the-day-after-toolkit)

---

## The Day After: Restructuring Software for the Age of AI Agents

**Engineering leadership and CTO tracks**

Most software organizations are not ready for AI agents. Not because the technology is immature, but because the codebases were never built to be navigable by anything other than the people who wrote them. The intent is locked in people's heads. The constraints live in Slack threads from two years ago. The capability boundaries exist in someone's memory, not in the system.

When an AI agent tries to work in that environment, it does not fail loudly. It fails quietly. It produces plausible output that is wrong in ways that take weeks to find.

This talk is about what it actually takes to fix that. Not a rewrite. Not a new platform. A deliberate, role-by-role process of making software organizations legible to agentic systems without throwing everything away. What the architect needs to declare. What the developer needs to own. What the PM needs to ask in discovery that a story format was never designed to hold.

Based on: The Day After (forthcoming) and the [C-DAD White Paper](/whitepapers/)

---

## Speaker Bio

Enrico Piovesan is a platform architect and author who spent years building products across startups in travel, education, and payments before deciding that the problems he kept running into were architectural, not incidental.

He developed Universal Microservices Architecture as an answer to the portability problem and Contract-Driven AI Development as an answer to the navigability problem. His first book on UMA is available on Amazon. His second book, The Day After, is forthcoming. He has published five research papers since 2023 and maintains four open source projects built from the same frameworks.

He is a Platform Software Architect at Autodesk and publishes on architecture and AI-native systems every week on Medium. He is based in Golden, BC, Purcell Mountains, Canada.

---

Currently accepting CFP invitations for architecture, WASM, and AI engineering tracks. All talks are drawn from published work and shipped tooling.

[Contact via LinkedIn](https://linkedin.com/in/enricopiovesan)
