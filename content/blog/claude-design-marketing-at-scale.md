---
title: "Claude Design + Claude Code = Marketing at Scale"
date: "2026-10-11"
category: "Development"
tags: ["AI", "Claude", "Design", "Marketing"]
excerpt: "Sync your design system from Claude Code, then generate landing pages, product visuals and promo videos in your own style."
bannerImage: "/images/serva-discord-promo-thumb.png"
---

Claude Design + the new Claude models = marketing at scale.

> **New:** follow the [interactive tutorial for this post](https://claude.ai/artifact/GknV1Fa456bHvKnsNXVg7X#play-15dd8cd198dd) and try every step yourself as you read.

Most developers can ship a product in a weekend and then lose a fortnight trying to explain it. Landing pages, screenshots, promo clips and launch posts all need design work, and design work has traditionally meant either a second skill set or a second person. Claude Design closes that gap, but only if it knows what your product actually looks like. That is where Claude Code comes in.

## Step 1: sync your design system

Go to your codebase, open Claude Code and run:

```bash
/design-sync
```

Or simply ask Claude Code to `extract your design system.` It reads your Tailwind config, CSS variables, fonts, spacing scale, component library and brand assets, then packages them into a design system Claude Design can use. Because the source of truth is your real code, the output matches your product instead of a generic template.

## Step 2: generate in your own style

Open the Claude desktop app, go to the Design tab, click **Design** and select your synced design system.

Now you can create landing pages, product visuals and marketing assets in your own style. Every colour, radius and typeface comes from your codebase, so the assets look like they belong to the same product as the app itself.

## Example

This 15-second promo for ServaDiscord was generated this way:

<video controls playsinline preload="metadata" poster="/images/serva-discord-promo-thumb.png" style="width:100%;border-radius:12px">
  <source src="/videos/serva-discord-promo-v7.mp4" type="video/mp4" />
</video>

The whole video, from the first scene to the closing call to action, came from a single prompt plus a handful of screenshots. No timeline editor, no stock footage and no motion-design software were involved.

## My favourite prompt

> Create a 15-second promotional video for our app using this design system and the attached screenshots. Match the product UI exactly, make every scene clean and visually distinct, use polished transitions, show the app's key workflow and end with a clear "Get started" message and website link.

Each clause in that prompt does a job. "Match the product UI exactly" stops the model inventing interface elements that do not exist. "Every scene clean and visually distinct" prevents a repetitive clip. "Show the app's key workflow" forces the video to demonstrate value instead of listing features. And ending with a clear call to action means the viewer knows exactly what to do next.

## What to make with it

Once the design system is synced you are not limited to video. The same setup produces:

* **Landing pages** with hero, feature grid, pricing and FAQ sections in your brand.
* **Product visuals** such as device mockups, feature highlight cards and changelog graphics.
* **Social assets** sized for X, LinkedIn and Open Graph previews.
* **Launch videos** like the one above, in portrait or landscape.
* **Email headers and docs illustrations** that match the product.

## Tips for better results

1. **Attach real screenshots.** The more accurate your inputs, the less the model has to guess.
2. **Keep one idea per scene.** A 15-second clip has room for three or four ideas, not ten.
3. **Iterate in small steps.** Ask for one change at a time, such as "slow the second transition" or "make the headline larger".
4. **Re-sync after a redesign.** Run `/design-sync` again whenever your tokens or components change so new assets never drift from the product.
5. **Review before publishing.** Check text, links and any claims about the product yourself.

<details>
<summary>Frequently asked questions</summary>

**Do I need design experience?** No. You describe the outcome, and the design system keeps it consistent. Basic taste still helps when choosing between variations.

**Does it work with any framework?** The sync reads standard styling sources such as Tailwind configuration, CSS variables and component files, so it works across most modern front-end stacks.

**Can I edit the output afterwards?** Yes. Ask for specific changes in follow-up prompts, or export the assets and finish them in your usual tools.

**Is the video really generated from one prompt?** The promo above came from one prompt and a set of screenshots, then a few small refinements. Expect to iterate a little for your own product.

**How often should I re-sync?** Whenever your brand tokens or core components change. It takes seconds and keeps every new asset on brand.

</details>

<details>
<summary>Why this beats a template</summary>

Templates are designed for everybody, which means they look like everybody. A synced design system is designed for exactly one product: yours. Colours, typography, spacing, iconography and even the way buttons feel are inherited from your code. That consistency is what makes marketing material feel trustworthy, and it is the part that is normally hardest to maintain as a small team.

It also changes the economics. Producing a landing page variation or a launch clip used to cost days. With a synced design system it costs a prompt, which makes it realistic to test several messages, ship updates with matching visuals and keep your marketing as current as your product.

</details>

Thank me later.
