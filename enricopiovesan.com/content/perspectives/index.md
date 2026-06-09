---
title: Perspectives
description: Enrico Piovesan's takes on emerging architectural concepts in AI engineering and software architecture — where they lead, what they miss, and what comes next.
layout: page.njk
canonical: https://enricopiovesan.com/perspectives/
ogTitle: Perspectives on AI Engineering & Software Architecture
ogDescription: Takes on emerging concepts in AI engineering and software architecture — where they lead, what they miss, and what comes next.
---

Industry terms come and go. The problems they describe are usually real. The solutions they point to are usually incomplete. Most discourse around AI engineering and software architecture is either too shallow to be useful or too specific to one tool to generalize. These pages sit in the middle: they take a concept the industry is actively discussing, describe it honestly without promotional framing, trace where it leads when followed to its logical conclusion, and explain where it falls short and what fills the gap.

The goal is not to dismiss what the industry is building toward. Context engineering, agentic systems, AI-native architecture — these are real shifts. The goal is to be specific about what each idea actually solves and what it leaves unresolved. Vague optimism does not help teams make better architectural decisions. Specific analysis does.

Each perspective is written by [Enrico Piovesan](https://enricopiovesan.com/about/) — Platform Software Architect at Autodesk and author of [Universal Microservices Architecture](https://www.amazon.com/dp/B0GTTTTQH4) (Apress). Not analyst commentary on what others are building, but direct observations from designing and building systems where these ideas are the actual constraints. The primary analytical lens is always the same: what does the architectural structure need to provide, and what does the current conversation leave structurally unresolved?

The two frameworks developed here — [Universal Microservices Architecture](/uma/) and [Contract-Driven AI Development](/c-dad/) — exist because existing approaches left specific structural problems unsolved. Each perspective traces how that gap shows up in practice and what fills it.

## [Beyond Context Engineering](/perspectives/context-engineering/)

*Published June 2025*

Context engineering has become the dominant practice for improving AI agent behavior — and for good reason. Better-structured inputs produce more consistent outputs. The investment is real and the returns are real.

But context engineering solves the input problem. It does not solve the trust problem. An agent with excellent context still has no way to know what a capability is responsible for, what conditions it must never violate, and when its output can be trusted. Context tells agents what to know. It does not tell agents what they can trust. The gap between those two things is where most AI-assisted development fails in practice — not with a visible error, but with plausible output that violates constraints nobody declared.

This piece examines what context engineering gets right, traces the class of problems it structurally cannot address, and explains why machine-enforceable contracts are the answer that context management cannot provide.

[Read the full piece →](/perspectives/context-engineering/)

## [What Makes Software AI-Native?](/perspectives/ai-native-architecture/)

*Published June 2026*

"AI-native" has become one of those terms that everyone uses and nobody defines. Teams describe their products as AI-native because they call an LLM API. Vendors use it to mean they have a chat interface. The word is doing too much work — and that vagueness has a cost, because the architecture question it points to is real.

There is a meaningful difference between software that has AI features and software that is structurally designed to work with AI agents. That difference is not aesthetic. It determines what AI agents can actually do with your codebase and where they fail in ways you cannot trace. This piece defines AI-native precisely — three structural properties that must all be present — and explains why most software that calls itself AI-native is actually AI-augmented, which is a different and less capable thing.

[Read the full piece →](/perspectives/ai-native-architecture/)

---

*New perspectives are added as the field moves. The frameworks and concepts on this site — UMA and C-DAD — are the primary lens. Each perspective connects to one or both.*
