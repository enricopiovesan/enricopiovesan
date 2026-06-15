---
title: Client-Side Microservices Architecture (CSMA)
description: CSMA packages frontend business logic as modular, portable units that run in the browser without server calls. It is the precursor to Universal Microservices Architecture.
layout: section.njk
sectionGroup: whitepapers
breadcrumb:
  - href: /work/
    label: Work
  - href: /whitepapers/
    label: White Papers
  - label: Client-Side Microservices Architecture
permalink: /whitepapers/csma/
canonical: https://enricopiovesan.com/whitepapers/csma/
ogTitle: Client-Side Microservices Architecture (CSMA)
ogDescription: CSMA applies service-oriented thinking to the frontend, packaging business logic as modular, portable units that run in the browser without depending on a server call for every decision.
datePublished: "2023-06-01"
---

**June 2023 · Enrico Piovesan**

[Download PDF](/whitepapers/Client-side%20Microservices%20Architecture%20%28CSMA%29%20-%20White%20Paper.pdf)

---

This is where the thinking started.

The browser kept getting treated as a consumer of server logic rather than a legitimate execution environment in its own right. Every decision that could be made locally was deferred to a round trip. Every business rule that could run in the browser was reimplemented on the server because that was where logic was supposed to live. The frontend was a rendering layer. It was not supposed to think.

That assumption made less sense every year. Browsers got faster. WASM made native-speed execution possible. Offline requirements became real. AI changed what clients needed to do. And yet the architecture stayed the same: server decides, browser displays.

CSMA was an attempt to write down why that assumption was wrong and what the alternative looked like.

## What the paper covers

**The browser as a runtime.** The central argument is that the browser is a legitimate execution environment and should be treated as one architecturally. That means business logic that runs locally, not logic that is fetched and rendered.

**Service-oriented thinking applied to the frontend.** <abbr title="Client-Side Microservices Architecture">CSMA</abbr> applies the same modularity principles that made backend microservices successful to the client side. Each capability is a self-contained unit with declared inputs, outputs, and contracts. Not a component tied to a framework.

**Stateful and stateless services.** The paper distinguishes between capabilities that manage their own state and capabilities that are pure functions. Both have a place in a client-side service architecture. The distinction matters for lifecycle management and composition.

**Isolation and boundaries.** How client-side services communicate without coupling. The event bus pattern, capability boundaries, and the contract layer that keeps services composable as the system grows.

**The portability seed.** CSMA was the first time I wrote down a pattern I had been circling around for years. The question it left open (why stop at the browser?) became the question that <abbr title="Universal Microservices Architecture">UMA</abbr> answered.

## What triggered this paper

The problem was not abstract. Frontend applications were getting more complex and more important, but the architecture treated them like an afterthought. The browser was a place where server logic got rendered, not a place where real business logic could live.

The result was frontend codebases that could not scale across multiple teams. Every team built its own version of validation, formatting, and business rules because there was no shared, modular way to define that logic once and reuse it. Apps felt like collections of pages glued together rather than software with the same rigor as a desktop application.

## How CSMA connects to UMA

CSMA solved the modularity and team-scaling problem within the client. It did not yet ask the bigger question that UMA would ask a year later: why should the same logic be confined to the browser at all? CSMA established that the browser deserved to be treated as a first-class execution environment with modular, well-defined services. UMA generalised the solution across every runtime.

Performance and modularity were not in tension. A well-architected frontend could be both fast and composable. That observation became the foundation of everything that followed.

## Who it is for

Frontend architects and senior engineers building complex client applications who are hitting the limits of component-based thinking and want a more disciplined model for managing logic at the client layer. Also relevant to anyone building at organisations with multiple teams contributing to the same frontend codebase, where the current architecture makes it hard to share business logic without duplicating it or creating tight coupling between teams.

---

[White Papers](/whitepapers/) · [UMA White Paper](/whitepapers/uma/) · [Universal Microservices Architecture](/uma/)
