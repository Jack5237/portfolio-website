---
title: "Spatial UI & Reactive Systems"
date: "2026-01-10"
category: "Design"
tags: ["Experiments", "Frontend"]
excerpt: "Exploring spatial interfaces and reactive design systems that adapt to user intent in real-time."
bannerImage: "https://images.unsplash.com/photo-1550745165-9bcb59c25cc7?w=1200&h=400&fit=crop&q=80"
---

Spatial computing is redefining the boundary of the 'window'. Our interfaces are becoming fluid, aware of depth and lighting, and most importantly, aware of the user's focus.

In this experiment, I've been exploring how we can use GLSL shaders and physics-based interactions to create menus that feel 'physical'.

<details>
<summary>What is Spatial Computing, Really?</summary>

Spatial computing is the broad term for technology that understands and interacts with physical space. Unlike flat 2D interfaces, spatial systems track depth, orientation, lighting, and the user's gaze or hand position. Devices like Apple Vision Pro, Meta Quest, and HoloLens brought this from research labs into product development.

For web developers, "spatial computing" doesn't necessarily mean AR/VR headsets. It means designing interfaces that respond to context — where the user is looking, how fast they're scrolling, whether their pointer is decelerating or accelerating. Even on a standard monitor, spatial awareness makes interactions feel more alive.

The key shift is moving from **event-driven** UI ("button clicked") to **intent-driven** UI ("user is moving toward this element"). That single change in mental model unlocks a completely different class of interactions.
</details>

<details>
<summary>GLSL Shaders in UI: How They Work</summary>

GLSL (OpenGL Shading Language) runs directly on the GPU, making it orders of magnitude faster than JavaScript-driven animations for visual effects. In a UI context, shaders are used for backgrounds, hover distortions, fluid simulations, and transitions that would be impossible to achieve at 60fps with CSS alone.

The basic pattern for a UI shader:

1. Write a fragment shader that runs per-pixel
2. Pass time, mouse position, and resolution as uniforms
3. Render to a canvas element underneath or behind your UI layer
4. Keep DOM elements on top with pointer events intact

Libraries like [OGL](https://github.com/oframe/ogl) and [Three.js](https://threejs.org) make this approachable without WebGL boilerplate. For UI-specific shader work, [curtains.js](https://www.curtainsjs.com) lets you attach shaders directly to HTML elements.

The gotcha: shaders are GPU-bound but the JavaScript bridge still has overhead. Keep uniform updates in a requestAnimationFrame loop and avoid triggering layout recalculations on the same frame.
</details>

<details>
<summary>Physics-Based Interactions: Spring Systems</summary>

Physics-based animations — specifically spring simulations — are what make interactions feel "physical" rather than mechanical. Unlike cubic-bezier easing, springs overshoot, settle, and respond to interruption naturally.

The two values that define a spring:

- **Stiffness** — how fast it moves toward the target
- **Damping** — how quickly oscillation stops

High stiffness + low damping = bouncy. High stiffness + high damping = snappy. Low stiffness + high damping = sluggish.

For menus and panels, a good starting point is stiffness 300, damping 30. For draggable elements that need to feel weighted, stiffness 150, damping 20 lets them coast into place.

Libraries: [Framer Motion](https://www.framer.com/motion/) exposes spring configs directly. [react-spring](https://www.react-spring.dev/) gives lower-level control. For vanilla JS, [motion](https://motion.dev) is the lightest option.

The real power comes when springs are **interruptible** — if a user starts dragging a menu before it finishes animating, the spring should continue from its current velocity, not reset. That responsiveness is what separates physical interfaces from animated ones.
</details>

<details>
<summary>Where Spatial UI Is Heading</summary>

The convergence of spatial computing and AI is producing a new category: interfaces that adapt their layout and density based on what you're doing, not just what you clicked.

Near-term (already shipping in some products):
- Eye-tracking hover states (Vision Pro)
- Gesture-controlled panels
- Context-aware menu depth (fewer options shown when you're deep in a task)

Medium-term:
- Interfaces that infer intent from movement patterns and pre-load the likely next panel
- Shader-driven environmental awareness (dim unrelated UI when you focus on a task)

Long-term:
- Full spatial interfaces that treat 3D space as the canvas, with 2D panels as legacy affordances for precision tasks

For web developers, the practical takeaway now: build for pointer intent, not just pointer events. Track velocity, acceleration, and direction — not just position. The APIs exist today via `pointermove` and `PerformanceObserver`. The interfaces that use them already feel noticeably better.
</details>

<details>
<summary>Getting Started with Spatial UI Today</summary>

You don't need GLSL or a WebXR headset to start building spatial UI. Three entry points ordered by difficulty:

**1. Spring animations** — Install [Framer Motion](https://www.framer.com/motion/) and replace your `transition` props with `type: "spring"`. Immediately physical. Zero shader knowledge required.

**2. Pointer-intent tracking** — Add a `pointermove` listener and compute velocity with a rolling average over the last 5 frames. Feed that into element scale or opacity. Two files, ~30 lines.

**3. Canvas-backed effects** — [Theatre.js](https://www.theatrejs.com/) for timeline-driven 3D scenes, or [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) for declarative Three.js without raw WebGL. Both abstract away the GLSL layer until you're ready to drop down.

Avoid reaching for a full physics engine (Matter.js, Rapier) until springs genuinely fall short — they rarely do for UI. Start with pointer velocity + Framer Motion springs; add complexity only when a specific interaction demands it.
</details>