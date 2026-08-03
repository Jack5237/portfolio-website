---
title: "Token Saving Stack"
date: "2026-07-29"
category: "Development"
tags: ["AI", "Tools", "Optimization", "LLM"]
excerpt: "A breakdown of tools, plugins and components I use to optimize token usage and reduce LLM costs."
bannerImage: "/token-saving-stack.png"
---

When working with LLMs, token efficiency is everything. These are the tools and components I use to reduce input tokens, optimize output tokens, and keep costs manageable while maintaining quality.

## The Tools

### [RTK](https://github.com/rtk-ai/rtk)
Saves input tokens by intelligently processing and conditioning your inputs before sending them to the model.

### [Ponytail](https://github.com/DietrichGebert/ponytail)
Optimizes output token usage by condensing and refining model responses without losing meaning.

### [Caveman](https://github.com/JuliusBrussee/caveman)
Reduces output tokens through effective response compression and structured output formatting.

### [Headroom](https://github.com/headroomlabs-ai/headroom)
Manages input tokens by trimming context and maintaining only the most relevant information for your requests.

### [Context-Mode](https://github.com/mksglu/context-mode)
Optimizes input token efficiency by intelligently selecting and formatting the context window for your queries.

---

These tools work together to create a comprehensive token optimization workflow. Whether you're working with long-context documents, complex prompts, or high-volume LLM usage, this stack helps you reduce costs without sacrificing quality.

<details>
<summary>Why Token Efficiency Actually Matters</summary>

The cost argument is obvious: fewer tokens mean lower API bills. But token efficiency matters beyond cost.

**Speed.** Shorter inputs produce faster responses. Every unnecessary token in a prompt adds latency — both from processing time and because larger contexts hit rate limits faster.

**Quality.** Dense, relevant context outperforms bloated context. Models perform better when the signal-to-noise ratio in the input is high. Padding a prompt with irrelevant history degrades output quality in ways that are hard to attribute without instrumentation.

**Context window utilisation.** Long-context models have large windows, but the cost scales with usage. Staying well under the limit also means you can fit more relevant information when you genuinely need it.

**Predictability.** Token-efficient prompts are easier to test and iterate on. A 200-token prompt is much easier to audit and improve than a 4,000-token one.

For high-volume workflows — batch processing, agents running in loops, code generation pipelines — token efficiency compounds. Cutting input tokens by 40% on a pipeline running 10,000 requests per day is a significant saving and a meaningful performance improvement.
</details>

<details>
<summary>Tool Deep Dives</summary>

**RTK (Rust Token Killer)**
RTK operates as a proxy between your shell and the model, preprocessing inputs before they're sent. It strips redundant context, normalises whitespace, and applies compression rules that preserve semantic content while reducing token count. The Rust implementation means the overhead is negligible — preprocessing adds microseconds, not milliseconds.

**Ponytail**
Ponytail applies to the output side: it enforces concise response patterns through system prompts and output shaping. The key insight is that most models pad responses with explanatory preamble and trailing summaries that the user never reads. Ponytail's prompts train the model to skip these patterns — the information density per token increases.

**Caveman**
Caveman compresses style without compressing substance. It drops articles, filler words, and hedging language while keeping all technical content intact. For developer-facing outputs — diffs, reports, analysis — this is often 20-30% shorter with zero loss of utility.

**Headroom**
Headroom manages context window hygiene. It tracks what's been said, what's still relevant, and what can be safely trimmed before the next request. For long agentic sessions, it prevents the slow accumulation of stale context that degrades model performance over time.

**Context-Mode**
Context-Mode optimises what gets included in a request at all. It applies relevance scoring to available context and selects only the highest-signal chunks for each query — similar to RAG but operating on session context rather than a document corpus.
</details>

<details>
<summary>How the Tools Work Together</summary>

The five tools target different points in the token lifecycle:

```
User Input → [Context-Mode: select relevant context]
           → [RTK: preprocess and compress input]
           → Model
           → [Ponytail + Caveman: shape output style]
           → Response
           → [Headroom: manage what gets carried forward]
```

In practice, you don't run all five on every request. The combination that covers the most ground with the least setup is RTK + Headroom — input compression and context management together handle the majority of token waste in long-running sessions.

Add Caveman when outputs are going to humans who prefer dense information. Add Ponytail when you're shaping model behaviour at the system prompt level. Add Context-Mode when you're working with large amounts of available context and need smart selection rather than manual curation.

The stack is modular. Start with one tool, measure the impact, and add the next where the marginal gain is highest.
</details>

<details>
<summary>Measuring the Savings</summary>

Token savings are only meaningful if you're measuring them. A few practical approaches:

**Log before and after token counts.** Most model APIs return token usage in the response. Store `prompt_tokens` and `completion_tokens` per request, then compare before and after introducing each tool.

**Track cost per task type.** Break down your usage by task (summarisation, code generation, Q&A). Different task types respond differently to optimisation — code generation compresses less than prose summarisation.

**Watch for quality regressions.** Token reduction can hurt quality if taken too far. The signal is increased error rates, more follow-up requests, or lower user satisfaction. A 50% token reduction that doubles retry rate isn't a saving.

**Use a test set.** Pick 20-30 representative prompts. Run them before and after each tool. Compare token counts and output quality side by side. This prevents optimising for a narrow case that doesn't represent real usage.

The tools in this stack typically deliver 25-60% input token reduction depending on the workflow. The highest gains come from long-session, high-volume agentic pipelines. The lowest gains come from short, single-turn queries where there is little redundancy to eliminate.
</details>
