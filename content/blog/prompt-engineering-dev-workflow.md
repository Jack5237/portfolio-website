---
title: "My Daily Driver"
date: "2026-08-05"
category: "Development"
tags: ["AI", "Tools", "Workflow", "Claude Code", "Codex"]
excerpt: "The terminal setup I use every day — Zed, OpenCode, Claude Code, Codex CLI, and WezTerm."
bannerImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80"
---

I use **[Zed](https://zed.dev/)** with ACP connected to **[OpenCode](https://opencode.ai/)**, giving me access to multiple model providers.

My usual Zed terminal layout:

* **Left:** Dev server
* **Right:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and [Codex CLI](https://developers.openai.com/codex/cli) Multi-terminals

Sometimes I work entirely in **[WezTerm](https://wezterm.org/)**, with one tab for dev servers and another for Claude/Codex sessions. I've found that around eight projects per tab is the limit before things become too cramped.

<details> <summary>About the tools</summary>

**Zed** is a high-performance, GPU-accelerated code editor built in Rust. It's fast to open, fast to navigate, and has first-class multi-buffer and terminal support. ACP (Agent Control Protocol) lets Zed hand tasks off to AI agents directly from the editor.

**OpenCode** is a terminal-native AI coding assistant that connects to multiple model providers — Anthropic, OpenAI, Google, and others — through a single interface. Running it inside Zed's terminal means I can swap models without leaving the editor.

**Claude Code** is Anthropic's official CLI for Claude. It reads the full repository, maintains context across a session, and handles multi-file edits, debugging, and architectural tasks. It's the tool I reach for when a task requires understanding the whole codebase.

**Codex CLI** is OpenAI's terminal agent. It's faster on narrow, well-defined tasks — generate a function, scaffold a file, apply a specific transformation. I run it alongside Claude Code in a split terminal and route tasks based on scope.

**WezTerm** is a GPU-accelerated terminal emulator with a programmable config in Lua. Tabs, panes, and multiplexing make it practical for running multiple projects and AI sessions simultaneously without a window manager.

</details>

## Why this setup works

A good AI-assisted workflow is mostly about removing friction. Every context switch, whether that is opening another window, hunting for the right terminal or waiting for a dev server to restart, quietly eats focus. Keeping the editor, the dev server and the agents within a single glance means I can read a diff, run the app and queue the next task without losing my place.

The split between tools is deliberate. The editor is where I read and shape code. The agents are where I delegate. The terminal multiplexer is where long-running things live. When each tool has one clear job, I never have to think about where something should happen.

## Routing tasks between agents

I treat the two main agents like teammates with different strengths.

* **Claude Code** gets the broad, ambiguous work: refactors that touch many files, debugging a problem I do not understand yet, or reviewing the architecture of a feature before I build it.
* **Codex CLI** gets the narrow, well-defined work: scaffold this component, add a test for this function, apply this exact transformation across a folder.
* **OpenCode inside Zed** is my flexible option when I want to try a different model on the same problem without changing my environment.

The rule of thumb is scope. If I can describe the task in a single sentence with a clear finish line, it goes to the fast agent. If the honest answer is "I am not sure what the right approach is", it goes to the one that reads the whole repository first.

## Prompting habits that save time

1. **State the goal and the constraint, not the steps.** "Add rate limiting to the contact endpoint without a new dependency" beats a ten-step recipe.
2. **Point at examples already in the repo.** "Follow the pattern used in the blog route" removes most style mismatches.
3. **Ask for a plan before a large change.** Reading a short plan is far cheaper than reviewing a wrong implementation.
4. **Keep sessions focused.** One task per session keeps context clean and results predictable.
5. **Always review the diff.** Agents are fast, but I am still the one shipping the code.

## Keeping terminals manageable

Running several projects at once is only useful while the layout stays readable. In WezTerm I give each project a pane pair, a dev server and an agent, and I group them by tab. Past roughly eight panes per tab I lose track of which session is which, so I open a new tab instead. Naming tabs after the project makes jumping back effortless.

In Zed the same idea applies. The dev server stays on the left where I can glance at errors, and the agent terminals sit on the right where I can read their output while I keep editing.

<details>
<summary>Frequently asked questions</summary>

**Do I need all of these tools?** No. The pattern matters more than the products: an editor, a place for long-running processes and one or two agents. Start with whatever you already have.

**Why use more than one agent?** Different agents are better at different kinds of work, and having two available means you are never blocked by one tool's limits or outages.

**Is a multiplexer necessary?** It is not necessary, but once you run more than two or three processes, tabs and panes stop you losing track of them.

**How do you avoid agents making a mess?** Small, scoped tasks, a clean git state before each session and a careful read of every diff before committing.

</details>

<details>
<summary>My daily routine in practice</summary>

I start by pulling the latest changes and launching the dev server in the left pane. Then I open an agent on the right and describe the first task. While it works, I review yesterday's notes or read through the files it is about to change. When the agent finishes, I read the diff, run the checks and commit in small, meaningful steps.

Throughout the day I repeat that loop, switching agents depending on the size of the task. At the end I close sessions I no longer need, so tomorrow starts clean instead of cluttered with stale terminals.

</details>
