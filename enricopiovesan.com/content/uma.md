---
title: Universal Microservices Architecture (UMA)
description: Universal Microservices Architecture is a portable, contract-driven execution model for distributed systems that separates business logic from runtime environment.
layout: uma.njk
permalink: /uma/
canonical: https://enricopiovesan.com/uma/
ogTitle: Universal Microservices Architecture (UMA) — Enrico Piovesan
ogDescription: A portable, contract-driven execution model for distributed systems. Write once, run where it makes sense.
concept: UMA
---

Every team I have worked with has the same invisible tax. The payment logic lives in the backend. A version of it lives in the browser. Another version runs at the edge. A fourth gets rewritten when the AI pipeline needs it. Nobody planned this. It just happened because the architecture made assumptions about the environment before it made decisions about the problem.

Over time the copies drift. A bug gets fixed in one place and not the others. A business rule changes and three of the four versions get updated. The system becomes harder to reason about, harder to change, and harder to trust. The tax compounds.

Universal Microservices Architecture is a response to that problem.

## What UMA is

A portable, contract-driven execution model for distributed systems. Each business capability is packaged as a self-describing service that declares its contracts, metadata, and execution requirements independently of any runtime. The same capability runs identically across browser, edge, cloud, and AI pipeline without duplicating the logic or losing behavioral coherence.

The shortest summary is not "write once, run everywhere." It is: write once, run where it makes sense.

## The core idea

Most distributed architectures make environment assumptions too early. The database layer assumes a server. The UI layer assumes a browser. The edge layer gets its own rewrite. Each assumption creates a coupling that limits where logic can run and multiplies the cost of every change.

UMA separates the question of what a capability does from the question of where it runs. The capability is defined once, tested once, versioned once. The runtime is a deployment decision, not an architectural one. WebAssembly makes this possible at the execution level. Contracts make it trustworthy at the system level.

## How it differs from existing approaches

Standard microservices architectures reduce coupling between services but do not address the coupling between logic and runtime. A microservice running in a container is still tied to a server environment. UMA takes the portability further: the capability itself is runtime-agnostic.

This matters more now than it did five years ago. AI pipelines need to invoke the same business logic that the browser and backend use. Edge computing needs the same validation rules that the server enforces. The cost of environment-specific rewrites has gone up, not down.

## Where it came from

UMA evolved from Client-Side Microservices Architecture, a 2023 paper that applied service-oriented thinking to the browser. The question was simple: why should the browser always be a consumer of server logic rather than a legitimate execution environment? That question expanded into UMA, which asked the same thing of every runtime in the stack.

The UMA white paper was published in August 2024. The book followed with 13 chapters of runnable Rust and WASM code, 100% business logic coverage enforced in CI, and a live reference application. The full model, concepts, and reference implementation live at universalmicroservices.com.

## The work

- [universalmicroservices.com](https://www.universalmicroservices.com) — the full model, reference app, and documentation
- [Universal Microservices Architecture — Book](https://www.amazon.com/dp/B0GTTTTQH4) — the full implementation guide. Published on Amazon.
- [UMA-code-examples](https://github.com/enricopiovesan/UMA-code-examples) — 13 chapters of runnable Rust and WASM code
- [UMA White Paper](/whitepapers/) — the foundational paper. August 2024.
- [CSMA White Paper](/whitepapers/) — where the thinking started. June 2023.
