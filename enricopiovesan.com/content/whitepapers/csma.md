---
title: Client-Side Microservices Architecture (CSMA)
description: CSMA applies service-oriented thinking to the frontend, packaging business logic as modular, portable units that run in the browser without depending on a server call for every decision.
layout: page.njk
permalink: /whitepapers/csma/
canonical: https://enricopiovesan.com/whitepapers/csma/
ogTitle: Client-Side Microservices Architecture (CSMA)
ogDescription: CSMA applies service-oriented thinking to the frontend, packaging business logic as modular, portable units that run in the browser without depending on a server call for every decision.
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

**Service-oriented thinking applied to the frontend.** CSMA applies the same modularity principles that made backend microservices successful to the client side. Each capability is a self-contained unit with declared inputs, outputs, and contracts — not a component tied to a framework.

**Stateful and stateless services.** The paper distinguishes between capabilities that manage their own state and capabilities that are pure functions. Both have a place in a client-side service architecture. The distinction matters for lifecycle management and composition.

**Isolation and boundaries.** How client-side services communicate without coupling. The event bus pattern, capability boundaries, and the contract layer that keeps services composable as the system grows.

**The portability seed.** CSMA was the first time I wrote down a pattern I had been circling around for years. The question it left open — why stop at the browser? — became the question that UMA answered.

## Who it is for

Frontend architects and senior engineers building complex client applications who are hitting the limits of component-based thinking and want a more disciplined model for managing logic at the client layer.

---

[White Papers](/whitepapers/) · [UMA White Paper](/whitepapers/uma/) · [Universal Microservices Architecture](/uma/)
