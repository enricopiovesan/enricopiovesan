---
title: Software Architecture Books by Enrico Piovesan
description: Two books on software architecture and AI-native systems by Enrico Piovesan. One published, one forthcoming.
layout: books.njk
permalink: /books/
canonical: https://enricopiovesan.com/books/
ogTitle: Books
ogDescription: Two books on software architecture and AI-native systems. One published, one forthcoming.
intro: "Two books on software architecture. One published, one forthcoming. Both came from the same place: years of watching the same problems show up in different companies, different stacks, and different teams, and deciding that the answer was architectural, not incidental."
books:
  - title: "Universal Microservices Architecture: Device-Independent Modelling for Modern Software Design with WASM"
    status: published
    publisher: Amazon
    cover: /src/assets/img/cover.png
    url: https://www.amazon.com/dp/B0GTTTTQH4
    website: https://www.universalmicroservices.com/
    companion_repo: https://github.com/enricopiovesan/UMA-code-examples
    companion_live: https://www.universalmicroservices.com/reference-application/
    audience: Software architects, senior engineers, and technical leads designing modern distributed systems who are tired of paying the hidden tax of duplicated logic across runtimes.
    description:
      - Most distributed systems have a logic problem that nobody talks about. The same business rule — a pricing formula, an eligibility check, a validation step — gets implemented separately for the browser, the backend, the edge, and now the AI pipeline. Nobody planned it that way. It happened because the architecture made assumptions about the environment before it made decisions about the behavior. Over time the copies drift. The system becomes harder to reason about, harder to change, and harder to trust.
      - Universal Microservices Architecture is a response to that problem. It is a portable, contract-driven execution model where each business capability is packaged as a self-describing service that runs identically across browser, edge, cloud, and AI-assisted environments without duplicating the logic or losing behavioral coherence. The full model, the core concepts, and the reference application are documented at universalmicroservices.com.
      - The book covers the principles and building blocks of UMA, how it differs from older architectural models, and how to design distributed systems at scale that are portable, modular, and runtime-agnostic using WebAssembly. It is backed by a maintained companion repository with 13 chapters of runnable Rust code, 100% business logic coverage enforced in CI, and a live reference application.
      - "The shortest summary of what UMA makes possible is not write once, run everywhere. It is: write once, run where it makes sense."
  - title: "The Day After: How to Restructure Your Software Company for the Age of AI Agents"
    status: forthcoming
    cover: /src/assets/img/cover-day-after.svg
    companion_repo: https://github.com/enricopiovesan/the-day-after-toolkit
    whitepaper: /whitepapers/
    audience: Engineering leaders, CTOs, staff architects, and senior developers who are watching AI agents become part of their teams and want a structured answer to the question of what needs to change and in what order.
    description:
      - Most software organizations are not ready for AI agents. Not because the models are immature. Because the codebases were never built to be navigable by anything other than the people who wrote them.
      - The constraints live in Slack threads from two years ago. The intent is locked in the memory of engineers who may or may not still be at the company. The capability boundaries exist in someone's head, not in the system. When an AI agent tries to work in that environment it does not fail loudly. It produces plausible output that is wrong in ways that take weeks to find.
      - The fix is not a rewrite. It is a deliberate process of making software organizations legible to agentic systems without throwing everything away. Role by role, capability by capability. The architect declares the reasoning space before the sprint begins. The developer owns a contract, not just a ticket. The PM asks in discovery what a story format was never designed to hold.
      - The Day After is a practical guide to that process. It is built from the same framework that produced the C-DAD white paper and the companion CLI tool, both developed since 2023.
---
