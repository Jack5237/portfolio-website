---
title: "Gemini 4: Which Tier Should You Actually Use?"
date: "2026-11-27"
category: "AI"
tags: ["Gemini", "LLM", "Model Strategy", "Development"]
excerpt: "Google shipped Carbon, Neon and Hydrogen within weeks of each other. Here is what each one is for, what it costs, and a simple way to decide which to call."
bannerImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=400&fit=crop&q=80"
---

## My Thoughts

Google's Gemini 4 launch is confusing if you read it as "one new model". It is a **family**, and the interesting part is not which one is best. It is which one you should call for which job.

Same idea as my [Fable 5 post](/blog/fable-5-10-80-10): don't pay top-tier prices for work a cheaper tier does fine.

> Prices and dates below come from public release roundups at the time of writing (27 Nov 2026). Sources disagree on a few details, so check Google's own changelog before you build a budget around any number.

## The lineup

| Model | Released | Role | Price per 1M tokens (in / out) |
| --- | --- | --- | --- |
| **Gemini 4 Carbon** | API GA on 10 Nov | Strongest reasoning | Check Google's pricing page |
| **Gemini 4 Neon** | 18 Nov | The middle tier | $3 / $15 |
| **Gemini 4 Hydrogen** | 12 Nov | Fast and cheap, has a free tier | $1.50 / $7.50 |
| **Gemini Decision 1** | 11 Nov | Yes/no, category or rubric answers only | $0.10 input, no output tokens |

Carbon was announced on 28 Oct, first to a group of cyber defenders, before it reached the general API.

## What is new for developers

- **A new `xhigh` thinking level.** The Gemini API now lists low, medium, high (the default) and `xhigh`. More thinking means more latency and more tokens, so treat `xhigh` as an opt-in for hard problems, not a default.
- **A real free tier.** Hydrogen is the only Gemini 4 model on the free API tier, which makes it the obvious pick for prototypes and side projects.
- **A model that only decides.** Gemini Decision returns a verdict, a category or a rubric score. No prose. For moderation, routing and triage, that is exactly what you want and it is very cheap.
- **Older models are going away.** Gemini 2.5 Pro and 2.5 Flash were deprecated on 2 Nov, so if you still call them, migrate now.

## How I would choose

This is my opinion, not a benchmark result.

1. **Start on Hydrogen.** Prototype, classify, summarise, extract. If it works, you are done and it costs almost nothing.
2. **Reach for Neon when Hydrogen gets it wrong,** not before. Code generation and multi-step tasks are where I would expect the gap to show.
3. **Keep Carbon for the hard 10%.** Planning, deep debugging, security review. Run it as the architect and let cheaper tiers do the typing.
4. **Use Gemini Decision for gates.** Anything that is a yes/no question should never cost you output tokens.

## A tiny router

```ts
type Task = "gate" | "bulk" | "build" | "hard";

const MODEL: Record<Task, string> = {
  gate: "gemini-decision-1",
  bulk: "gemini-4-hydrogen",
  build: "gemini-4-neon",
  hard: "gemini-4-carbon",
};

export const pickModel = (task: Task) => MODEL[task];
```

Model IDs here are illustrative. Copy the exact strings from the API docs. The point is that the choice lives in **one place**, so changing a tier later is a one-line edit.

## What I have not tested

I have not benchmarked these models against each other, so I am not claiming one beats another on coding. The routing advice above is a starting point. Measure it on your own tasks, with your own prompts, before you trust it.

## Bottom line

Gemini 4 is less a single leap and more a menu. Pick the cheapest tier that passes your tests, and spend Carbon only where it earns it.
