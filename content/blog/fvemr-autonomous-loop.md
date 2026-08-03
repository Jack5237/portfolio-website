---
title: "F.E.V.M.R. — The Autonomous Loop"
date: "2026-06-15"
category: "Development"
tags: ["AI", "Automation", "Systems Design"]
excerpt: "A simple 5-step workflow for autonomous AI systems: Find, Execute, Verify, Memorize, Repeat."
bannerImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=400&fit=crop&q=80"
---

A simple 5-step workflow for autonomous AI systems:

* **Find** — Identify the next task.
* **Execute** — Perform the task.
* **Verify** — Independently validate the result.
* **Memorize** — Store context, decisions, and outcomes.
* **Repeat** — Continue until the objective is complete.

```text
FIND
  ↓
EXECUTE
  ↓
VERIFY
  ↓
MEMORIZE
  ↓
REPEAT
  └────────→ FIND
```

**Key idea:** Reliable AI agents are built on reliable loops, not better prompts.

— Created by Jack

<details>
<summary>Why Each Step Cannot Be Skipped</summary>

The F.E.V.M.R. loop is designed to be non-negotiable at every step. Skipping any one of the five breaks the feedback cycle that makes autonomous systems reliable.

**Find without Execute** — the agent plans indefinitely, producing strategy documents instead of results. Common in over-cautious LLM setups with too many approval gates.

**Execute without Verify** — the agent ships work it hasn't checked. This is how silent failures compound: a task is "done" but wrong, and the next task builds on the wrong output.

**Verify without Memorize** — the agent catches the error but forgets it happened. It will make the same mistake on the next loop iteration. This is the most common failure mode in stateless agents.

**Memorize without Repeat** — the agent builds up context but never uses it to improve. The loop stalls.

Each step exists to prevent the failure mode of the next one. The loop is only as strong as its strictest step.
</details>

<details>
<summary>Implementing the Loop: A Practical Pattern</summary>

Here's a minimal implementation pattern in pseudocode that maps directly to the five steps:

```js
async function fvemrLoop(objective, memory = []) {
  while (!isComplete(objective, memory)) {
    // FIND
    const task = await findNextTask(objective, memory);
    if (!task) break;

    // EXECUTE
    const result = await executeTask(task);

    // VERIFY
    const verified = await verifyResult(task, result);
    if (!verified.passed) {
      memory.push({ task, result, error: verified.reason });
      continue; // retry with error context
    }

    // MEMORIZE
    memory.push({ task, result, status: 'done' });

    // REPEAT (loop continues automatically)
  }

  return memory;
}
```

The `memory` array is the critical piece — it carries forward what worked, what failed, and why. Without it, each loop iteration starts blind.

In practice, this memory is usually a structured JSON object stored in a file, database, or passed as context in the LLM prompt for the next iteration.
</details>

<details>
<summary>Common Failure Modes and How to Fix Them</summary>

**1. Verify is too strict**
The agent rejects valid work because the verification criteria are poorly defined. Fix: define verification as specific, measurable checks — not subjective quality judgments.

**2. Memorize stores noise**
The memory fills with irrelevant details, making Find slower and less accurate over time. Fix: filter memories by relevance before storing. Only persist decisions, errors, and completed tasks — not internal reasoning steps.

**3. Find loops on the same task**
The agent keeps picking the same unfinished task because it doesn't understand what "done" looks like. Fix: every task must have an explicit completion condition defined before Execute starts.

**4. The loop runs forever**
No stopping condition. Fix: add a maximum iteration count and a completion check that evaluates the objective holistically after each Memorize step.

**5. Verify is the same model as Execute**
Self-verification is weak — the same reasoning that produced the error tends to miss it. Fix: use a different model, a different prompt, or a deterministic check (run tests, lint, parse output) as the Verify step.
</details>

<details>
<summary>Real-World Applications of F.E.V.M.R.</summary>

The loop pattern maps onto a wide range of autonomous tasks:

**Code generation agents** — Find: next failing test. Execute: write code to fix it. Verify: run tests. Memorize: which patterns worked. Repeat.

**Research agents** — Find: next unanswered question. Execute: search and read sources. Verify: check for contradictions. Memorize: confirmed facts. Repeat until topic covered.

**DevOps agents** — Find: next deployment step. Execute: run command. Verify: check exit code and logs. Memorize: system state. Repeat until deploy complete.

**Data pipeline agents** — Find: next unprocessed batch. Execute: transform and load. Verify: validate row counts and schema. Memorize: processed batch IDs. Repeat.

What all of these share: a defined objective, discrete verifiable tasks, and a memory that persists across iterations. The F.E.V.M.R. structure makes the loop auditable — you can inspect the memory at any point and understand exactly what the agent did, found, and decided. That auditability is what separates reliable automation from black-box agents.
</details>
