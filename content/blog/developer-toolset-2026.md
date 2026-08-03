---

title: "UI Favourites I Use in 2026"
date: "2026-01-16"
category: "Development"
tags: ["UI", "Design Systems", "Frontend"]
excerpt: "A curated list of my favourite UI libraries, component systems, inspiration galleries, and design builders that define modern frontend work in 2026."
bannerImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop&q=80"
-------------------------------------------------------------------------------------------------------------------

Frontend engineering in 2026 is less about reinventing components and more about **composition, taste, and speed**. The modern UI ecosystem is rich, opinionated, and incredibly modular. Below is my personal, battle-tested list of **UI favourites** — the things I reach for again and again.

## UI Favourites

These are the sites I keep bookmarked and revisit constantly for inspiration, patterns, and production-ready ideas:

* [https://ui.shadcn.com/](https://ui.shadcn.com/)
* [https://reactbits.dev/](https://reactbits.dev/)
* [https://21st.dev/](https://21st.dev/)
* [https://shaders.paper.design/](https://shaders.paper.design/)

## UI Libraries & Component Systems

The backbone of most modern React and design-system-driven products:

* [https://ui.shadcn.com/](https://ui.shadcn.com/)
* [https://www.radix-ui.com/](https://www.radix-ui.com/)
* [https://tailwindui.com/components](https://tailwindui.com/components)
* [https://tremor.so/](https://tremor.so/)
* [https://heroui.com/](https://heroui.com/)
* [https://ant.design/](https://ant.design/)
* [https://silkhq.co/](https://silkhq.co/)
* [https://ui.aceternity.com/](https://ui.aceternity.com/)
* [https://magicui.design/](https://magicui.design/)
* [https://originui.com/](https://originui.com/)
* [https://mui.com/](https://mui.com/)
* [https://untitledui.com/](https://untitledui.com/)
* [https://kokonutui.com/](https://kokonutui.com/)
* [https://smoothui.dev/](https://smoothui.dev/)
* [https://reui.io/](https://reui.io/)
* [https://cult-ui.com/](https://cult-ui.com/)
* [https://motion-primitives.com/docs](https://motion-primitives.com/docs)
* [https://tailark.com/](https://tailark.com/)
* [https://ui.elevenlabs.io/](https://ui.elevenlabs.io/)
* [https://kibo-ui.com/](https://kibo-ui.com/)
* [https://patterncraft.fun/](https://patterncraft.fun/)
* [https://blocks.so/](https://blocks.so/)
* [https://www.ag-grid.com/](https://www.ag-grid.com/)

## Collections & Designers

Where taste is refined. These are invaluable for layout ideas, interaction patterns, and visual direction:

* [https://landingfolio.com/](https://landingfolio.com/)
* [https://dribbble.com/](https://dribbble.com/)
* [https://framer.com/marketplace/](https://framer.com/marketplace/)
* [https://webflow.com/templates](https://webflow.com/templates)
* [https://flowbase.co/](https://flowbase.co/)
* [https://relume.io/](https://relume.io/)
* [https://mobbin.com/](https://mobbin.com/)
* [https://mui.com/store/](https://mui.com/store/)
* [https://elements.envato.com/web-templates](https://elements.envato.com/web-templates)
* [https://unsection.com/](https://unsection.com/)
* [https://land-book.com/](https://land-book.com/)
* [https://flowponent.com/](https://flowponent.com/)
* [https://curated.design/](https://curated.design/)
* [https://www.landing.gallery/](https://www.landing.gallery/)
* [https://saaslandingpage.com/](https://saaslandingpage.com/)
* [https://admiretheweb.com/](https://admiretheweb.com/)
* [https://godly.website/](https://godly.website/)

## Design Builders & AI Tools

Tools that accelerate ideation, layout generation, and visual experimentation:

* [https://aura.build/](https://aura.build/)
* [https://stitch.withgoogle.com/](https://stitch.withgoogle.com/)
* [https://ideogram.ai/](https://ideogram.ai/)
* [https://chatgpt.com/g/g-PbV4y5Q7Q-ideogram-3-0-prompt-creator](https://chatgpt.com/g/g-PbV4y5Q7Q-ideogram-3-0-prompt-creator)

---

This list is constantly evolving as new tools emerge and patterns shift. I’ll be diving deeper into **how I combine these tools in real-world projects**, including system design, animation strategies, and AI-assisted UI workflows, in upcoming posts.

<details>
<summary>Why These Libraries Over Others</summary>

The frontend ecosystem in 2026 has more options than any developer can evaluate. The list above is curated based on three criteria: production stability, active maintenance, and composability.

**Shadcn/ui sits at the top of every list** because it solved a fundamental problem: ownership. Every other component library gives you pre-built components you style around. Shadcn gives you the source code. You own it. The components live in your repo. You change what you want, delete what you don’t, and never fight library defaults.

**Radix UI underpins most of the modern ecosystem** because it solves accessibility correctly. Keyboard navigation, ARIA attributes, focus management, screen reader support — all handled at the primitive level. Build on Radix and your components are accessible by default, not by afterthought.

**Tailwind UI and Aceternity represent opposite ends of the spectrum.** Tailwind UI is conservative and production-ready — templates you’d be comfortable shipping to enterprise clients. Aceternity is experimental and visually ambitious — effects you’d use to make a portfolio or landing page memorable. Both have a place, rarely in the same project.

The galleries (21st.dev, reactbits.dev, originui.com) are for inspiration and copy-paste components, not dependencies. Use them to move fast on UI that isn’t your core product differentiator.
</details>

<details>
<summary>My Go-To Starting Stack</summary>

When starting a new project, these are the specific tools I reach for in order:

**1. Framework: Next.js (App Router)**
Server components, file-based routing, built-in image optimisation, and Vercel deployment make this the fastest path to a production-ready setup.

**2. Styling: Tailwind CSS + Shadcn/ui**
Tailwind for utilities, Shadcn for components. Run `npx shadcn@latest init` and you have a design system in 60 seconds.

**3. Animation: Framer Motion**
For interactions that go beyond CSS — page transitions, gesture-based animations, layout animations. The API is the best in class for React.

**4. Icons: Lucide React**
Consistent stroke-width, tree-shakeable, TypeScript-typed, and Shadcn-compatible. No others needed.

**5. Inspiration check: 21st.dev and reactbits.dev**
Before building a custom component, check if a polished version already exists here. Copy, adapt, own it.

For projects that need more visual impact — agencies, portfolios, landing pages — add Aceternity or Magic UI for the specific components that need to stand out. For data-heavy applications, add Tremor for its chart and stat components.

The goal is to make styling decisions fast so engineering time goes toward product logic.
</details>

<details>
<summary>Tips for Choosing Between Similar Libraries</summary>

When two libraries look equivalent, these questions break the tie:

**Do you own the code?** Shadcn-style copy-paste libraries mean zero runtime dependency. Traditional npm libraries mean their breaking changes become your breaking changes on every update. Prefer ownership for components that are central to your UI.

**Is it actively maintained?** Check the GitHub commit history and open issue count. A library with 300 open issues and no commits in six months is a liability, regardless of how good it looked at launch.

**Does it work with your existing stack?** Test the component that’s hardest to integrate first, not the easiest demo. A form library that conflicts with your state management will cost you a sprint to swap out.

**What’s the bundle size?** Use bundlephobia.com before adding any UI library. Some "component libraries" import significant runtime overhead. For reference: Shadcn adds zero — it’s just your code. Radix primitives are individually importable. Ant Design’s full build is large and requires tree-shaking configuration to stay manageable.

**Does it match your design language?** A library that requires heavy overriding to match your design is slower than writing the component from scratch. The best library is the one that needs the least customisation for your specific context.

When in doubt, start with less. A handful of well-chosen Shadcn components will outperform a full component library you’re fighting for every feature.
</details>
