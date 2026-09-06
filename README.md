<div align="center">

  <a href="https://cssframes.vercel.app/">
    <img src="https://raw.githubusercontent.com/bilalmlkdev/cssframes/main/src/assets/favicon/favicon.svg" alt="cssframes Logo" width="100%" height="120">
  </a>

# cssframes

A place to build, save, and reuse CSS animations - entirely in your browser. <br>
No sign-up, no server, no lost work between sessions.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-black?style=for-the-badge)](https://cssframes.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/bilalmlkdev/cssframes?style=for-the-badge&logo=github&color=yellow)](https://github.com/bilalmlkdev/cssframes.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

</div>

[![cssframes Dashboard](https://raw.githubusercontent.com/bilalmlkdev/cssframes/main/src/assets/homePreview.png)](https://cssframes.vercel.app/)

# Why I built this

I kept reaching for the same handful of CSS animations across projects,
and kept rewriting them from memory or digging through old files to
find the keyframes I liked. So I built cssframes as the place I wished
I already had: browse a library of ready-made animations, preview them
live, and when I make something new, save it right there in the
browser so it's still there next time.

There's no backend, no account, no database. Everything - the library,
your own creations, your preview settings - lives in `localStorage`.
Clone it, open it, and it just works.

# What it does

- **Browse a library** of ready-made CSS keyframe animations, organized
  by category - entrances, exits, text, loaders, and more.
- **Live preview** every animation on a box, circle, text, or icon
  before you commit to it.
- **Create your own** with a visual editor: pick a shape, write or tweak
  the keyframes, adjust the preview background, and see it move in
  real time.
- **Save what you make.** Every animation you create is stored locally
  in your browser, so it's there the next time you open the app -
  no account required.
- **Copy the exact CSS** for anything in the library or anything you've
  made, ready to paste into your own project.

# How it works

1. Browse the library or search for an animation by name.
2. Preview it live against a box, circle, text, or icon.
3. Copy the CSS keyframes straight into your project - or open the
   creator to build your own from scratch.
4. Anything you create is saved locally and shows up in your community
   library on your next visit.

# Design principles

- **Performance first.** Every animation relies on GPU-friendly
  properties - `transform` and `opacity` - instead of layout-triggering
  ones like `width`, `top`, or `margin`.
- **No dependencies to run it.** Pure CSS keyframes, no JavaScript
  animation runtime required in your own project.
- **Nothing to configure.** No API keys, no backend, no environment
  variables - clone it and it runs.

# Animation categories

- **Entrance** - fade, slide, zoom, and reveal animations.
- **Exit** - mirrored versions for elements leaving the screen.
- **Text** - typewriter, glitch, and kinetic text effects.
- **Fading** - opacity-based transitions.
- **Rotating** - spin and rotation-based motion.
- **Bouncing** - spring and bounce feedback.
- **Sliding** - directional movement.
- **Attention** - pulse, shake, and emphasis effects for drawing focus.
- **Loader** - spinners and progress indicators.

# Local, persistent storage

Animations you create through the in-app creator save directly to your
browser's `localStorage` - no backend, no server to run or deploy.

```text
src/utils/communityAnimations.js
```

This is what makes the project genuinely zero-infrastructure: clone
it, run `npm install && npm run dev`, and every feature - including
creating and saving your own animations - works immediately, with
nothing else to configure or host.

# Project structure

```text
cssframes/
├── src/
│   ├── components/       # Reusable UI components
│   ├── data/             # Motion presets & categories
│   ├── utils/            # Local animation storage (localStorage)
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

# Getting started

```bash
git clone https://github.com/bilalmlkdev/cssframes.git
cd cssframes
npm install
npm run dev
```

No environment variables, no API keys, nothing else to set up.

# Performance guidelines

If you're contributing a new animation:

- Prefer `transform` and `opacity` for smooth, GPU-accelerated motion.
- Avoid animating layout-triggering properties such as `width`,
  `height`, `top`, `left`, or `margin`.
- Keep animations short, reusable, and easy to compose with others.
- Include a clear title, duration, and one-line description.

# License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

```text
MIT License

Copyright (c) 2026 Bilal Malik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
