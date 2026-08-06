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
