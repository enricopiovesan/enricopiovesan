---
title: Universal Microservices Architecture (UMA)
description: The foundational paper introducing UMA as a portable, contract-based execution model for distributed systems that separates business logic from runtime environment.
layout: page.njk
permalink: /whitepapers/uma/
canonical: https://enricopiovesan.com/whitepapers/uma/
ogTitle: Universal Microservices Architecture (UMA)
ogDescription: The foundational paper introducing UMA as a portable, contract-based execution model for distributed systems that separates business logic from runtime environment.
datePublished: "2024-08-01"
---

**August 2024 · Enrico Piovesan**

[Download PDF](/whitepapers/Universal%20Microservices%20Architecture%20%28UMA%29%20-%20White%20Paper.pdf)

---

Most distributed systems have a logic problem that nobody talks about.

The same business rule — a pricing formula, an eligibility check, a validation step — gets implemented separately for the browser, the backend, the edge, and now the AI pipeline. Nobody planned it that way. It happened because the architecture made assumptions about the environment before it made decisions about the behavior. Over time the copies drift. A bug gets fixed in one place and not the others. The system becomes harder to reason about, harder to change, and harder to trust.

This paper introduces Universal Microservices Architecture as a response to that problem.

## What the paper covers

**The portability argument.** Separating business logic from runtime environment is not just a performance optimization or a deployment convenience. It is an architectural decision that changes what a system can do, where it can run, and how long it can stay coherent as requirements change. The paper establishes why this matters now more than it did five years ago.

**The UMA execution model.** Each business capability is packaged as a self-describing service that declares its contracts, metadata, and execution requirements independently of any runtime. The capability runs identically across browser, edge, cloud, and AI pipeline without duplicating the logic or losing behavioral coherence.

**WebAssembly as the enabling layer.** The paper explains how WASM makes runtime-agnostic execution practical rather than theoretical. Not because WASM is the point — because WASM removes the obstacle.

**Contract-driven composition.** How UMA capabilities discover each other, compose into workflows, and maintain behavioral coherence across environments. The contract layer is what distinguishes UMA from earlier portability approaches.

**Design sequence.** How to design a UMA system from scratch — capability identification, contract definition, runtime mapping, and versioning strategy. The vocabulary the paper establishes is what the book later expanded into 13 runnable chapters.

## Who it is for

Software architects, senior engineers, and technical leads designing modern distributed systems who are paying the hidden tax of duplicated logic across runtimes and want a structural answer.

---

[Read the full framework](/uma/) · [UMA Book](https://www.amazon.com/dp/B0GTTTTQH4) · [Reference implementation](https://www.universalmicroservices.com) · [CSMA White Paper](/whitepapers/csma/)
