---
title: "Deploying a Next.js App to Cloudflare Workers with vinext: The Errors I Hit"
date: "2026-11-27"
category: "Development"
tags: ["Cloudflare", "vinext", "Next.js", "DevOps"]
excerpt: "This site runs on vinext and Cloudflare Workers. Moving it over, the deploy failed twice for reasons the error messages explained well. Here is what broke and how I fixed each one."
bannerImage: "https://images.unsplash.com/photo-1550745165-9bcb59c25cc7?w=1200&h=400&fit=crop&q=80"
---

## My Thoughts

This portfolio is a Next.js-style app that builds with **vinext** (a Vite-based runtime for the Next.js API) and deploys to **Cloudflare Workers** with the `cf` CLI. The build was green from day one. The *deploy* was not.

Both failures were clear once I read the message properly. Here they are, in the order I hit them.

## Error 1: the Vite plugin was too old for `cf`

```
@cloudflare/vite-plugin@2.0.0-beta.v.13 is installed, but cf requires
@cloudflare/vite-plugin >=2.0.0-rc.0 <3 to produce Build Output v1.
```

The build step passed because the old plugin still built fine. `cf deploy` is stricter: it checks the plugin version before it will produce its deploy output.

**Fix:** bump the plugin to a release candidate, `^2.0.0-rc.6`, run `bun install` so the lockfile updates, and commit both files. Nothing in the app code changed.

## Error 2: config drift between the repo and the dashboard

```
The local configuration being used differs from the remote configuration
of your Worker set via the Cloudflare Dashboard
...
Aborting the upload operation because of conflicts.
Rerun with `cf deploy --force` to override and upload anyway.
```

The Worker had settings that only existed in the dashboard: a different compatibility date, an extra compatibility flag, two environment variables, and observability turned on. My config file knew about none of them, so `cf` refused to overwrite them.

### Why I did not use `--force`

`--force` works, but it makes the repo the source of truth by **deleting** everything the dashboard had. That would have turned off logging and removed the variables in production.

**Fix:** copy the dashboard's values into `cloudflare.config.ts` so the file describes what is really deployed:

```ts
compatibilityDate: "2026-10-01",
compatibilityFlags: ["nodejs_compat", "global_fetch_strictly_public"],
observability: { enabled: true, logs: { enabled: true } },
env: {
  ASSETS: bindings.assets(),
  NEXT_PUBLIC_SITE_URL: bindings.json("https://www.jacksdevfolio.com/"),
  NODE_VERSION: bindings.json("22"),
},
```

Once the file matches the dashboard, the diff is empty and the deploy goes through without forcing anything.

## What I would tell past me

1. **A green build does not mean a green deploy.** The deploy command runs its own checks.
2. **Read the diff the CLI prints.** The `-` and `+` lines are the whole answer.
3. **Prefer matching config over `--force`.** Forcing is fine when you *want* the repo to win. It is destructive when you do not.
4. **Keep config in the repo.** Dashboard-only settings are how drift starts.

## Still unverified

I am not certain how `cf` treats plain string variables declared with `bindings.json`. If the diff ever shows those two values as changed, that is the first place to look.

## Bottom line

Both errors came down to the tool checking something my build never checked. Fix the version, make the config honest, and let the deploy run.
