---
title: "Terminal Tools I Use in 2026"
date: "2026-07-05"
category: "Tools"
tags: ["Terminal", "Development", "Emulators"]
excerpt: "A comprehensive guide to modern terminal emulators, multiplexers, and utilities I rely on for development work in 2026."
bannerImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop&q=80"
---

## My Top Picks

The essentials I reach for every day:

- [Ghostty](https://ghostty.org)
- [WezTerm](https://wezterm.org)
- [Alacritty](https://alacritty.org)
- [Kitty](https://sw.kovidgoyal.net/kitty)
- [Tabby](https://tabby.sh)

---

## Modern Terminal Emulators

Fast, feature-rich, and actively maintained:

- [Ghostty](https://ghostty.org) — GPU-accelerated, blazingly fast
- [WezTerm](https://wezterm.org) — Cross-platform, powerful configuration
- [Alacritty](https://alacritty.org) — Minimal, performance-focused
- [Kitty](https://sw.kovidgoyal.net/kitty) — Image support, advanced features
- [Tabby](https://tabby.sh) — Tab-based, beautiful UI
- [Warp](https://warp.dev) — AI-powered, collaborative
- [Hyper](https://hyper.is) — Electron-based, JavaScript extensible
- [Rio](https://raphamorim.io/rio) — Rust-based, GPU rendering
- [ElecTerm](https://electerm.github.io/electerm) — Web-based SSH client
- [ExtraTerm](https://extraterm.org) — Productivity-focused

---

## Windows Terminals

Windows-specific and cross-platform options:

- [Windows Terminal](https://github.com/microsoft/terminal) — Official Microsoft terminal
- [Cmder](https://cmder.app) — ConEmu-based with better defaults
- [ConEmu](https://conemu.github.io) — Feature-rich, highly configurable
- [MobaXterm](https://mobaxterm.mobatek.net) — Swiss Army knife for Windows
- [PuTTY](https://www.putty.org) — Classic SSH client

---

## SSH & Remote Development

For working over the network:

- [Termius](https://termius.com) — Cross-platform SSH management
- [MobaXterm](https://mobaxterm.mobatek.net) — All-in-one remote development
- [PuTTY](https://www.putty.org) — Lightweight SSH
- [SecureCRT](https://www.vandyke.com/products/securecrt) — Enterprise-grade
- [Xshell](https://www.netsarang.com/en/xshell) — Professional SSH suite

---

## Linux Terminals

Native Linux terminal environments:

- [Tilix](https://gnunn1.github.io/tilix-web) — Tiling terminal, GNOME-focused
- [Terminator](https://gnome-terminator.org) — Split panes, grid layouts
- [Konsole](https://apps.kde.org/konsole) — KDE's powerful terminal
- [GNOME Terminal](https://apps.gnome.org/Terminal) — Simple and reliable
- [Xfce Terminal](https://xfce.org/projects/xfce4-terminal) — Lightweight

---

## macOS Terminals

macOS-specific and universal options:

- [iTerm 2](https://iterm2.com) — The macOS standard
- [Ghostty](https://ghostty.org) — Next-generation performance
- [WezTerm](https://wezterm.org) — Cross-platform consistency
- [Alacritty](https://alacritty.org) — Minimal and fast
- [Kitty](https://sw.kovidgoyal.net/kitty) — Advanced features

---

## Terminal Multiplexers

Run multiple sessions in one terminal:

- [Tmux](https://github.com/tmux/tmux) — The industry standard
- [Zellij](https://zellij.dev) — Modern, user-friendly
- [GNU Screen](https://www.gnu.org/software/screen) — Classic and stable

---

## Terminal Customization

Make your terminal yours:

- [Starship](https://starship.rs) — Fast, customizable prompt
- [Oh My Zsh](https://ohmyz.sh) — Zsh framework with plugins
- [Oh My Posh](https://ohmyposh.dev) — Cross-shell prompt engine
- [Fish Shell](https://fishshell.com) — User-friendly shell
- [Nushell](https://www.nushell.sh) — Modern shell language

---

## Terminal Utilities

Essential CLI tools for productivity:

- [Bat](https://github.com/sharkdp/bat) — Syntax highlighting for `cat`
- [Eza](https://github.com/eza-community/eza) — Modern replacement for `ls`
- [Fzf](https://github.com/junegunn/fzf) — Fuzzy finder for files/history
- [Zoxide](https://github.com/ajeetdsouza/zoxide) — Smarter `cd` command
- [Btop](https://github.com/aristocratos/btop) — System monitor
- [Fastfetch](https://github.com/fastfetch-cli/fastfetch) — System info display
- [Ripgrep](https://github.com/BurntSushi/ripgrep) — Fast text search
- [Fd](https://github.com/sharkdp/fd) — User-friendly `find` replacement
- [Lsd](https://github.com/lsd-rs/lsd) — Modern `ls` with colors and icons

---

The terminal ecosystem has evolved dramatically. Pick tools that match your workflow—whether you value speed, features, or cross-platform compatibility. Most of these work together seamlessly.

<details>
<summary>My Personal Daily Setup</summary>

After trying most tools on this list, my current daily setup is deliberately minimal:

**Terminal emulator: Ghostty**
GPU-accelerated, starts instantly, and gets out of the way. No tabs, no splits — that's what the multiplexer handles. The configuration is a single clean file.

**Multiplexer: Zellij**
Replaced tmux after years. The default keybindings are discoverable (a status bar shows available commands), the layout system is more intuitive, and session management just works. For anyone who found tmux configuration a rite of passage rather than a feature, Zellij is the answer.

**Shell: Fish**
Autosuggestions from history, syntax highlighting as you type, and tab completions that work out of the box. Not POSIX-compatible, which matters occasionally for scripts — when it does, I drop to bash for that command.

**Prompt: Starship**
Cross-shell, written in Rust, fast. Configured once and works identically in Fish, Bash, and Zsh.

**Key utilities: bat, eza, fzf, zoxide, ripgrep**
These five replace cat, ls, Ctrl+R, cd, and grep respectively. After a week of using them you will find the originals feel slow. All are available via Homebrew, apt, and most package managers.

The full setup takes about 30 minutes to configure from scratch. Worth doing once on a new machine and committing the configs to a dotfiles repo.
</details>

<details>
<summary>Combining Tools: What Works Together</summary>

Individual tools are useful. Combined, they change how you work:

**fzf + zoxide**
Map a shell shortcut to `z (fzf selection)` — you get an interactive fuzzy directory browser that ranks by frequency of use. Jump anywhere in your project structure in under a second.

**fzf + ripgrep**
`rg --files | fzf` gives you a fuzzy file finder. `rg 'pattern' | fzf` gives you fuzzy search over grep results. Both are significantly faster than the equivalents in most editors.

**bat + git diff**
Set `GIT_PAGER=bat` and git diff output gets syntax highlighting and line numbers. Small change, large improvement in readability.

**Zellij + Ghostty**
Zellij handles splits and sessions. Ghostty handles rendering. The combination means you always have the same layout available regardless of which machine you're on — your Zellij config travels with you.

**Starship + any shell**
The value of Starship is consistency. The same prompt context (git branch, exit code, command duration, language version) is available everywhere. When you SSH into a remote machine and run Starship there too, your muscle memory doesn't need to adjust.

The principle: pick one tool for each job (emulator, multiplexer, shell, prompt, each utility), learn it well, and connect them. The integrations compound.
</details>

<details>
<summary>Configuration Tips Worth Knowing</summary>

A few non-obvious configuration choices that make a significant difference:

**Set a 24-bit colour theme consistently across all tools.** Mismatched colour depth between emulator and multiplexer produces washed-out colours. Set `TERM=xterm-256color` or `TERM=ghostty` in your shell profile and ensure Zellij/tmux force 24-bit colour.

**Disable bell sounds and enable visual bell.** Audio bells in terminals become unbearable quickly. Visual bell (a brief flash) is enough to catch your attention. Most emulators have this in settings; Fish has `set -g fish_greeting ""` to stop the startup message.

**Configure fzf to use ripgrep as its default file search.** Add `export FZF_DEFAULT_COMMAND='rg --files --hidden --follow --glob "!.git/*"'` to your shell profile. Now fzf respects .gitignore and searches hidden files correctly.

**Use zoxide's autojump without the `z` alias conflict.** If you have both installed, alias `j` to zoxide's `__zoxide_z` function directly to avoid conflicts.

**Store configs in a dotfiles repo and use symlinks.** The setup that matters is your config — the tool itself can be reinstalled in minutes. A dotfiles repo with a one-line install script means a new machine is configured in under five minutes. Use `stow` or a simple shell script to manage the symlinks.

The terminal is the most-used tool for most developers. The hour spent configuring it correctly pays back every day.
</details>
