---
title: Event Contract Catalog Architecture (ECCA)
description: ECCA is a blueprint for an event contract catalog that treats events as first-class architectural artifacts with declared contracts, ownership, and lifecycle.
layout: section.njk
sectionGroup: whitepapers
breadcrumb:
  - href: /work/
    label: Work
  - href: /whitepapers/
    label: White Papers
  - label: Event Contract Catalog Architecture
permalink: /whitepapers/ecca/
canonical: https://enricopiovesan.com/whitepapers/ecca/
ogTitle: Event Contract Catalog Architecture (ECCA)
ogDescription: ECCA is a blueprint for an event contract catalog that treats events as first-class architectural artifacts with declared contracts, ownership, and lifecycle.
datePublished: "2025-08-01"
---

**August 2025 · Enrico Piovesan**

[Download PDF](/whitepapers/Event%20Contract%20Catalog%20Architecture%20%28ECCA%29%20-%20White%20Paper.pdf)

---

Event-driven architectures have a governance problem that schema registries and API management platforms were not designed to solve.

Events cross team boundaries, service boundaries, and time boundaries. A schema registry tells you what an event looks like. It does not tell you who owns it, what it means, what contracts govern its consumers, or what happens when the format changes. Without a way to make events discoverable, governable, and consistent at scale, they become a source of invisible coupling that compounds over years. By the time the problem is visible it is already expensive.

ECCA is a blueprint for fixing that at the architectural level.

## What the paper covers

**Events as first-class artifacts.** The core argument is that events should be treated with the same architectural discipline as APIs and services. That means declared ownership, versioned contracts, documented lifecycle, and discoverable metadata — not just a schema in a registry.

**The event contract catalog.** A structured system for declaring what an event is, who produces it, who consumes it, what the behavioral contract between them is, and how changes are governed. Not a tool — a pattern that can be implemented with the tooling a team already has.

**Governance without centralization.** One of the failure modes in event-driven systems is governance that requires a central team to approve every change. ECCA proposes a federated model where ownership is distributed but contracts are machine-readable and enforceable at the boundary.

**Lifecycle management.** How events are versioned, deprecated, and retired without breaking consumers. The paper covers explicit versioning strategies and the contract obligations that producers carry through a deprecation cycle.

**Discovery and AI navigability.** An event contract catalog makes event-driven systems navigable by AI agents in the same way that C-DAD contracts make service logic navigable. The two frameworks are designed to compose.

## Who it is for

Architects and engineering leads building event-driven systems at scale who are hitting the governance ceiling — systems that work but that nobody can fully reason about anymore.

---

[White Papers](/whitepapers/) · [C-DAD White Paper](/whitepapers/c-dad/) · [UMA White Paper](/whitepapers/uma/)
