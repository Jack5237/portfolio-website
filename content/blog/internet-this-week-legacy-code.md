---
title: "The Worst Week in Security (Oct 2026): What Actually Happened"
date: "2026-10-22"
category: "Security"
tags: ["Security", "Supply Chain", "DevOps", "Incident Response"]
excerpt: "PHP, Node.js, GitLab, LiteLLM, OpenCode, eMudhra and Railway all went bad within days of each other. Here is what really broke, who is affected and what to do about it."
bannerImage: "/images/internet-this-week-meme.png"
---

Between 16 and 22 October 2026, the internet had what can only be described as a full-stack bad week. A language, a runtime, a git server, an AI proxy, a coding tool, a certificate authority and a hosting platform all had a very public incident, and most of them landed within 48 hours of each other.

![The internet this week: SpongeBob surrounded by seven burning incidents, then walking out the door with a suitcase labelled Legacy Code](/images/internet-this-week-meme.png)

The meme is funny because it is accurate. This post is the part the meme can't fit on a wooden sign: what actually happened, how bad it is, and what to do before your Friday gets ruined.

## TL;DR: the checklist

If you only read one section, make it this one.

| If you run... | Do this |
| --- | --- |
| PHP 8.2 to 8.5 | Update to **8.5.12, 8.4.27, 8.3.36 or 8.2.35**, then restart |
| Node.js 22, 24 or 26 | Update to **22.23.4, 24.22.1 or 26.12.1** |
| Self-managed GitLab | Update to the latest patch of your line (e.g. **19.5.1, 19.4.3, 19.3.6**) |
| LiteLLM | Check you never installed **1.107.0**; pin **1.106.2** and rotate secrets if you did |
| OpenCode Console | Rotate any OpenAI, Anthropic or Google keys saved there |
| Railway | Roll **every** environment variable, API key and registry credential |
| `curl` or static CA bundles | Make sure the eMudhra intermediates are distrusted |

## 1. PHP: "PHP2Shell"

PHP shipped emergency patches for two critical unauthenticated remote code execution bugs, **CVE-2026-109618** and **CVE-2026-109619**, both scored 9.2 on CVSS v4.0. The release was pulled forward to 21 October after the details leaked, and exploitation attempts have been reported since.

The meme says the patch "may be incomplete". The more precise version is that the **workaround** was incomplete. Disabling session upload progress was widely circulated before the fix, but it only blocks some of the attack paths. According to [Wiz's write-up](https://www.wiz.io/blog/php2shell-php-rce), the real patch fixes the underlying problem, including the other variants.

The nastier detail is who gets nothing. There is no fix for PHP 8.1 or older, and Phoenix Security estimates [hundreds of thousands of end-of-life hosts](https://phoenix.security/php-core-rce-cve-2026-109618-109619-critical-remote-code-execution/) will stay exposed.

- [The Hacker News: emergency patches and exploit attempts](https://thehackernews.com/2026/10/php-issues-emergency-patches-for-two.html)
- [DigitalOcean: patch now](https://www.digitalocean.com/blog/critical-php-rce-vulnerabilities-patch-now)
- [Huntress: rapid response](https://www.huntress.com/blog/php2shell-leaked-critical-php-vulnerabilities)

## 2. Node.js: a Brotli bug you may not call yourself

On 21 October the Node.js team fixed 10 vulnerabilities across the 22.x, 24.x and 26.x lines. The headline is **CVE-2026-111497**, a high-severity out-of-bounds write in the Brotli decoder that can lead to remote code execution.

The part worth understanding is the exposure. You do not need to call Brotli yourself. Node's built-in `fetch()` decompresses `Content-Encoding: br` responses, and Express 5's body parser decompresses Brotli request bodies by default, so a surprising number of apps are reachable. The same fix shipped in Brotli 1.2.1, 1.1.1 and 1.0.10, so anything bundling Brotli needs checking too.

The release also fixes two TLS hostname verification bypasses. Node 20 and 25 are end of life and get no patch.

- [Node.js Brotli decoder RCE, The Hacker News](https://thehackernews.com/2026/10/nodejs-brotli-decoder-bug-could-allow.html)
- [Vercel security bulletin](https://vercel.com/kb/bulletin/node-js-security-advisory)
- [What to update, Convika](https://convika.com/blog/nodejs-security-release-2026-10-brotli/)

## 3. GitLab: a perfect 10 hiding for 12 years

GitLab patched **CVE-2026-110264** on 21 October. It scores a maximum **CVSS 10.0**: network reachable, low complexity, no privileges and no user interaction. Reporting describes an integer overflow in the regex engine that Ruby bundles (Onigmo), which can corrupt heap memory, and says it affects self-managed installs all the way back to version 7.0.

It is also the second CVSS 10 GitLab bug in about nine days, after [CVE-2026-97229](https://www.rapid7.com/blog/post/etr-cve-2026-97229-critical-unauthenticated-remote-code-execution-in-gitlab/) in the CI/CD regex compiler. That one has a public proof of concept, and Rapid7 reproduced code execution on an unpatched image. GitLab.com is already patched, so this is a self-managed problem.

Reports disagree on a few details, such as the exact fixed versions for the first bug, so trust GitLab's own release notes over any summary, including this one.

- [GitLab patches CVSS 10.0 flaw, Techerati](https://www.techerati.com/news-hub/gitlab-patches-critical-cvss-10-0-flaw-allowing-unauthenticated-code-execution/)
- [Critical patch release, SecurityOnline](https://securityonline.info/gitlab-critical-patch-release-cve-2026-110264/)

## 4. LiteLLM 1.107.0: the supply chain special

On 21 October a malicious **litellm 1.107.0** reached PyPI, and the official Docker images (the `latest`, `main-latest` and `main-stable` tags) briefly carried it too. Multiple vendors confirm the same story.

How it worked is the interesting part:

- The `v1.107.0` git tag was clean. The release was built from a **lookalike GitHub repository** with ten extra commits stacked on top.
- Installing it dropped `cook.pth`, `cook.py` and `sitecustomize.py` into `site-packages`. A `.pth` file runs whenever Python starts, so **the malware ran even if your app never imported litellm**.
- The stealer grabbed browser passwords, SSH and GPG keys, cloud credentials, the environment of every running process, configs for 20+ AI coding tools and the provider keys in the LiteLLM proxy database, then posted them to a lookalike domain.
- There was also an hourly remote code loading channel, so it was a backdoor and not just a smash and grab.

Wiz reports stolen credentials being abused about 4.5 hours after exfiltration. PyPI removing the release does **not** clean machines that already installed it. If you did, treat the host as compromised, rebuild it and rotate everything it could reach.

- [JFrog: LiteLLM hijacked again](https://research.jfrog.com/post/litellm-hijacked-again/)
- [StepSecurity technical breakdown](https://www.stepsecurity.io/blog/litellm-1-107-0-compromised-pypi-backdoored-wheels-credential-stealer)
- [SafeDep analysis](https://safedep.io/litellm-pypi-compromise-credential-stealer-backdoor/)
- [Socket on the earlier compromise](https://socket.dev/blog/litellm-compromise)

## 5. OpenCode Console: keys in a legacy system

OpenCode disclosed on 17 October that an intruder reached a **legacy system** that was being decommissioned. Third-party provider keys (OpenAI, Anthropic, Google) that users had saved in the hosted Console may have been exposed, affecting roughly 1.4% of Console users. The CLI and desktop apps keep keys locally, so they are not part of this.

Some users reported unexpected charges, and Anthropic and Google revoked the affected keys. The key lesson is a subtle one: Console's budget limits only apply to requests routed through Console, so they do nothing against someone using a leaked key **directly** against the provider. Rotate at the provider.

- [The Hacker News: Console breach](https://thehackernews.com/2026/10/opencode-console-breach-may-have.html)
- [Rescana write-up](https://www.rescana.com/post/opencode-console-breach-exposes-openai-anthropic-and-google-api-keys-in-credential-theft-and-distillation-attack-october)

## 6. eMudhra: a private key that was the number 4

This is the one that makes people laugh and then stop laughing. Eight intermediate CA keys from the Indian certificate authority eMudhra were found to be trivially weak: **4, 56, 66, 115, 155, 156, 230 and 237**. They were P-384 keys, so a normal one is an astronomically large number. These were all below 256, meaning you could recover each one by trying 256 guesses. Scott Helme recovered all eight on a laptop in under a second.

Anyone with those keys could mint a certificate for any site. Mitigations held up: browsers revoked the intermediates on 18 October, Mozilla, Google and Apple blocked them, and Google says none of the TLS intermediates appeared in Certificate Transparency logs, so forged certs would fail in clients that enforce CT, like Chrome. Clients that use a static trust store file, such as `curl`, may still trust them. eMudhra attributes it to a key generation fault that produced a weak set alongside the strong one, and that explanation is still being investigated.

Filippo Valsorda called it a cleanup job bigger than Heartbleed.

- [BleepingComputer: browsers block the CA certificates](https://www.bleepingcomputer.com/news/security/mozilla-google-apple-block-compromised-emudhra-ca-certificates/)
- [The Next Web: one key was the number 4](https://thenextweb.com/news/emudhra-certificates-weak-keys-browsers-block)
- [Help Net Security](https://www.helpnetsecurity.com/2026/10/21/emudhra-certificates-private-keys-compromised/)
- [The Register: eMudhra defends its keys](https://www.theregister.com/security/2026/10/22/certification-authority-emudhra-defends-its-laughably-weak-private-keys/5304647)
- [Keytos explainer](https://www.keytos.io/blog/pki/emudhra-ca-key-compromise/)

## 7. Railway: outage plus a secrets incident

Railway had builds paused on 20 October, then its dashboard, API and CLI went down on 21 October, with the outage still being resolved on 22 October. On top of the outage, Railway disclosed that an unauthorized party may have accessed the systems storing **customer environment variables**, some possibly in decrypted form.

Railway's advice is to roll every environment variable, API key and registry credential stored there. The catch is that with deployments paused you cannot easily redeploy to pick up the new values. One researcher also reported wallet private keys stored in Railway being swept, with losses reported around $371,000, so treat that figure as an unconfirmed report.

- [Railway breach: rotate every secret](https://hol.org/guard/security/campaigns/railway-breach-environment-variables-rotate-secrets)
- [Railway incident log, IsDown](https://isdown.app/status/railway/incidents/673332-builds-are-temporarily-paused)
- [Outage and database recovery, Layerbase](https://layerbase.com/blog/railway-outages-database-recovery)

## What the week had in common

Seven different stories, but only three real failure modes:

1. **Common infrastructure with an unauthenticated path to code execution.** PHP, Node and GitLab sit underneath everything. A single memory-safety or parser bug is internet-scale, and old, unsupported versions simply never get fixed.
2. **Trust in the supply chain.** LiteLLM was not hacked through its code. It was hacked through a release pipeline. A clean git tag and a malicious package are different things.
3. **Secrets in places you do not control.** OpenCode, Railway and eMudhra are the same lesson at three scales: a leaked API key, a leaked environment variable and a leaked CA key.

## How to survive the next one

You cannot pick up the "Legacy Code" suitcase and walk out the door, but you can make the next week cheaper:

- **Know what you run.** You cannot patch what you cannot list. Keep an inventory of runtimes, versions and who owns the upgrade.
- **Delay brand-new releases.** A cooldown of a day or two on dependency updates would have dodged the LiteLLM window entirely. Pin versions and use lockfiles with hashes.
- **Make secrets short-lived and scoped.** One key per tool, with spend limits at the provider, turns a leak into an inconvenience. Rotation should be a routine, not a panic.
- **Retire legacy systems properly.** OpenCode's breach hit a system that was already on its way out. Decommissioning half-way is the most dangerous state.
- **Do not run end-of-life versions.** PHP 8.1, Node 20 and ancient GitLab got no fix. "It still works" is not a security posture.
- **Shrink exposure.** Put GitLab, CI and admin panels behind a VPN or allow list instead of the open internet.
- **Practise the boring drill.** "Rotate everything" goes much better when you have done it once on purpose.

Everything above is current as of 22 October 2026, and this story is still moving. Check the vendors' own advisories for exact versions before acting.
