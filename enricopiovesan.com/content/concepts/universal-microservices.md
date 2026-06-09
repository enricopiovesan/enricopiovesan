---
title: What is Universal Microservices Architecture?
description: UMA separates business logic from runtime so the same capability runs across browser, edge, cloud, and AI pipeline without rewriting. Coined by Enrico Piovesan, 2023.
layout: page.njk
permalink: /concepts/universal-microservices/
canonical: https://enricopiovesan.com/concepts/universal-microservices/
ogTitle: What is Universal Microservices Architecture?
ogDescription: An approach to distributed systems where business logic runs anywhere without rewriting it for every runtime.
datePublished: "2024-08-01"
lastUpdated: "June 2026"
---

Every distributed system eventually develops the same problem. The same business logic exists in multiple places. The validation rule that lives in the backend also lives in the browser, also lives at the edge, also gets rewritten when the AI pipeline needs it. Nobody planned it that way. It happened because the architecture assumed the environment before it defined the behavior.

Universal microservices architecture is the practice of separating what a capability does from where it runs.

## What is the core idea of Universal Microservices Architecture?

In a standard distributed system, a service is tied to its deployment environment. A backend service assumes a server. A frontend component assumes a browser. An edge function assumes a CDN runtime. When requirements change or new environments appear — AI pipelines, for example — the logic gets rewritten for each one. Teams that have lived through this recognize the pattern: not a deployment problem, not a team problem, but an architectural assumption baked in so early it became invisible.

Universal Microservices Architecture inverts that assumption. Each business capability is packaged as a self-describing unit that declares its contracts and execution requirements independently of any specific runtime. The same capability runs across browser, edge, cloud, and AI pipeline without modification. The runtime becomes a deployment decision, not an architectural one. WebAssembly makes this possible at the execution level — it provides a portable, sandboxed compilation target that any runtime can host. Contracts make it trustworthy at the system level — they declare what each capability does and under what conditions it can be relied on. The combination is what makes portability a first-class property rather than an afterthought.

## Why does runtime portability matter now?

The cost of environment-specific rewrites has increased, not decreased. Three forces converged around 2023–2024 that made portability urgent rather than nice to have.

The first is AI pipelines. Every team adding LLM-based features to an existing product needs to invoke business logic — validation rules, pricing calculations, eligibility checks — from within an AI pipeline. That logic already exists in the backend. It usually also exists in the browser and the edge. Each copy diverges over time. The AI pipeline version is typically the most out of sync, because it was added last and nobody owns the divergence problem explicitly.

The second is edge computing at scale. Edge functions run close to users and have strict memory and startup constraints. WASM is the natural compilation target for edge — lightweight, sandboxed, fast to initialize. But rewriting business logic specifically for edge defeats the purpose. UMA lets the same capability run at the edge that runs everywhere else, without a rewrite.

The third is agentic systems. AI agents need to invoke capabilities on behalf of users. If those capabilities are runtime-specific, agents cannot invoke them portably. A UMA-compatible capability is invocable from any agent runtime by design.

Teams paying the rewrite tax for each new environment are not failing at execution. They are using an architecture that was never designed for a multi-runtime world.

## How does UMA differ from standard microservices?

Standard microservices architecture reduces coupling between services. Universal Microservices Architecture reduces coupling between logic and runtime. The first solves the organizational deployment problem — teams can own and deploy services independently. The second solves the portability problem — logic runs in any environment without modification. Both matter. They address different things. A system can use both: independently deployable services, each of which is also runtime-portable internally.

## Where to go deeper

The full model is documented at universalmicroservices.com with a live reference application. The book covers the design sequence, tradeoffs, and 13 chapters of runnable Rust and WASM code.

- [UMA — full framework](/uma/)
- [universalmicroservices.com](https://www.universalmicroservices.com)
- [Universal Microservices Architecture — Book](https://www.amazon.com/dp/B0GTTTTQH4)
- [UMA White Paper](/whitepapers/)
