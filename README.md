<div align="center">

  <a href="https://cssframes.vercel.app/">
    <img src="https://raw.githubusercontent.com/bilalmlkdev/cssframes/main/src/assets/favicon/favicon.svg" alt="cssframes Logo" width="100%" height="120">
  </a>

# Cssframes

Open-source motion system for building high-performance UI animations using pure CSS <br> keyframes. Create smooth, production-ready animations without JavaScript runtime overhead.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-black?style=for-the-badge)](https://cssframes.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/bilalmlkdev/cssframes?style=for-the-badge&logo=github&color=yellow)](https://github.com/bilalmlkdev/cssframes.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

</div>

<!-- <p align="center">
  <i>Created by <a href="https://bilalmlkdev.vercel.app" target="_blank">Bilal Malik</a></i><br>
  <i>Follow on Github <a href="https://github.com/bilalmlkdev" target="_blank">bilalmlkdev</a></i>
</p> -->

[![cssframes Dashboard](https://raw.githubusercontent.com/bilalmlkdev/cssframes/main/src/assets/homePreview.png)](https://cssframes.vercel.app/)


# About

**CSSFrames** is an open-source motion system that helps developers build fast, consistent UI animations using **pure CSS keyframes**.

Instead of creating animations from scratch for every project, CSSFrames provides a curated collection of reusable motion presets that work seamlessly with traditional CSS and Tailwind CSS.

Built with performance as the foundation, every animation avoids layout thrashing by relying on GPU-accelerated properties like `transform` and `opacity`. No JavaScript animation runtime, no heavy dependencies, and no unnecessary complexity.

Alongside its animation library, CSSFrames includes a visual preview system, export tools, a Creator Suite for custom animations, and a community platform where developers can publish and discover new motion presets.


# Features

- **40+ production-ready motion presets** for buttons, cards, text, loaders, icons, entrances, and shapes.
- **100% Pure CSS animations** with zero JavaScript runtime.
- **GPU-optimized** using compositor-friendly properties for smooth rendering.
- **Tailwind CSS compatible** with ready-to-use utility classes.
- **Interactive live preview** to test animations before exporting.
- **Creator Suite** for building and customizing your own keyframes.
- **One-click export** for CSS keyframes, Tailwind classes, and animation metadata.
- **Theater Mode** for distraction-free animation previews.
- **Community library** powered by a REST API for sharing animations.
- **Completely open source** under the MIT License.


# How It Works

Using CSSFrames takes only a few steps:

1. Browse the animation library or community collection.
2. Preview animations on different UI components.
3. Customize timing, easing, and playback.
4. Export production-ready CSS or Tailwind utilities.
5. Drop the animation directly into your project.

Every preset is designed to be lightweight, reusable, and easy to integrate into modern frontend applications.



# Design Principles

CSSFrames is built around a simple philosophy:

- **Performance First**
  Every animation is optimized for smooth rendering by avoiding expensive layout calculations.

- **Functional Motion**
  Motion should communicate hierarchy, feedback, and state instead of being decorative.

- **Composable System**
  Animations are reusable building blocks that can be mixed together across projects.

- **Consistent Experience**
  Shared timing, easing, and motion patterns create a unified design language.

---

# Animation Categories

The library is organized into purpose-driven categories for common UI interactions.

- **Buttons** - Hover effects, click feedback, press states, success and error interactions.
- **Loaders** - Spinners, pulse animations, shimmer effects, and progress indicators.
- **Entrances** - Fade, slide, zoom, blur, and staggered reveal animations.
- **Text** - Typewriter effects, kinetic typography, glitch animations, and text reveals.
- **Cards** - Floating, elevation, glow, hover transitions, and shimmer effects.
- **Icons** - Bounce, rotate, stroke drawing, alerts, and floating motion.
- **Shapes** - Morphing blobs, geometric transitions, pulse systems, and rotations.


# Community Animations

Animations created through the in-app creator are saved directly in
your browser's `localStorage` — no backend, no server to run or
deploy. Every visitor's created animations persist for them across
reloads, entirely client-side.

```text
src/utils/communityAnimations.js
```

This keeps the project genuinely zero-infrastructure: clone it, run
`npm install && npm run dev`, and every feature — including creating
and saving your own animations — works immediately with nothing else
to configure or host.


# Project Structure

```text
cssframes/
├── src/
│   ├── components/       # Reusable UI components
│   ├── data/             # Motion presets & categories
│   ├── utils/            # Community animation storage (localStorage)
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

# Performance Guidelines

CSSFrames is built around modern animation best practices.

- Prefer `transform` and `opacity` for smooth GPU-accelerated motion.
- Avoid animating layout-triggering properties such as `width`, `height`, `top`, `left`, or `margin`.
- Keep animations reusable and composable.
- Include meaningful metadata such as duration, easing, and description.
- Provide a preview for every new animation preset.
- Ensure exported animations work with both plain CSS and Tailwind CSS.


# License (MIT)


This project is licensed under the **MIT License**.

```text

MIT License

Copyright (c) 2026 Bilal Malik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software.The above copyright notice and this permission notice shall
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```


