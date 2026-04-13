# CSSFrames - Animations using pure CSS keyframes

<!-- ![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Stars](https://img.shields.io/badge/stars-⭐_open_source-yellow)
![Tailwind](https://img.shields.io/badge/tailwind-compatible-38bdf8)
![Performance](https://img.shields.io/badge/60FPS-optimized-blue)
![GPU](https://img.shields.io/badge/GPU-accelerated-purple) -->


##  Overview

CSSFrames is an **open-source motion standard** for building high-performance UI animations using pure CSS keyframes.

It provides a curated system of **pre-engineered motion presets** designed to replace inconsistent, ad-hoc animation usage across modern web apps.

No JavaScript runtime. No animation libraries. No layout thrashing.
Just **GPU-optimized, compositor-friendly motion primitives**.

---

##  Vision

The web lacks a unified motion standard.

Every product reinvents:
- easing curves
- animation timing
- micro-interactions
- loading states

CSSFrames exists to solve this fragmentation by providing a **shared motion language for developers and designers**.

---

##  Core Philosophy

###  Motion is Functional
Animations are not decoration—they communicate system state.

###  Performance First
Every animation is designed to:
- avoid layout shifts
- avoid paint recalculations
- stay GPU composited

###  Composable System
Animations are modular building blocks, not one-off effects.

###  Design Consistency
All motion follows a unified visual rhythm system.

---

##  Core Principles

### GPU-First Architecture
Animations rely on:
- `transform`
- `opacity`
- compositor-friendly properties only

### Zero Runtime Cost
No JS animation engines. No requestAnimationFrame loops.

### Tailwind Native
Works via:
- arbitrary values
- plugin extensions
- direct class injection

### Developer-Centric
Built for real production apps, not demo sandboxes.

---

##  Features

###  Live Interactive Preview Grid
Test animations in real-time on:
- Text
- Boxes
- Circles
- Icons
- UI cards

###  Community Motion Ecosystem
Developers can:
- create presets
- fork existing motion styles
- publish community animations

###  Instant Export System
Each animation provides:
- CSS `@keyframes`
- Tailwind animation class
- duration + easing metadata

###  Theater Mode
Focused preview environment with:
- adjustable speed
- background switching
- element switching

###  Creator Suite
Built-in editor for:
- creating keyframes
- testing motion live
- publishing to community library

###  Smart Preview Engine
Automatically maps animation type to:
- icon motion
- text motion
- UI element motion

###  Open Source
Fully MIT licensed for:
- commercial apps
- SaaS products
- personal projects

---

##  System Architecture

CSSFrames is structured into three layers:

### 1. Motion Presets Layer
Predefined animation objects:
- buttons
- loaders
- entrances
- cards
- icons
- shapes

### 2. Rendering Engine
React-based preview system:
- live CSS injection
- dynamic keyframe binding
- preview type mapping

### 3. Export Layer
Generates production-ready output:
- CSS keyframes
- Tailwind classes
- duration configs

---

##  How It Works

### Step 1 — Select Motion
Browse curated or community animations.

### Step 2 — Preview
Test motion on real UI elements instantly.

### Step 3 — Export

You receive:

```css
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

```

##  Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- JavaScript (ES6+)

### UI & Icons
- Lucide React
- Custom UI components
- Monaco Editor (code editing experience)

### Animation System
- Native CSS3 Keyframes
- GPU-composited transforms
- Dynamic style injection

### Code Tools
- Prettier (formatting)
- Prism.js (syntax highlighting)

### Deployment
- Vercel
- Static-first architecture


##  Animation Categories

CSSFrames includes curated motion presets across:

### Buttons
- micro-interaction feedback
- hover + click states
- error responses

### Loaders
- skeleton shimmer
- pulse rings
- spin systems

### Entrances
- slide, fade, blur reveals
- staggered motion

### Text
- typewriter effects
- glitch systems
- reveal animations

### Cards
- glow systems
- floating motion
- shimmer sweeps

### Icons
- float dynamics
- stroke draw animations
- alert motion

### Shapes
- morphing blobs
- geometric transitions
- pulse glow systems



##  Roadmap

### Phase 1 — Core System
- Preview engine
- Animation presets
- Creator mode

### Phase 2 — Ecosystem
- Local favorites storage
- User accounts
- Community submissions approval system

### Phase 3 — Developer Tools
- Framer Motion export
- Figma plugin
- VS Code extension

### Phase 4 — Platform
- Public API
- CDN delivery of presets
- Marketplace for motion packs


## 🤝 Contributing

We welcome contributions from developers and motion designers.

### Workflow
```bash
git checkout -b motion/add-new-animation

Guidelines
Keep animations GPU-friendly
Avoid layout-triggering properties
Ensure Tailwind compatibility
Provide both CSS + metadata
Pull Requests

Include:

animation preview
performance notes
category classification
```



```md id="license-section"
## 📜 License

MIT License
Free for personal and commercial use.

No restrictions. No royalties. No limits.
```

<!-- ##  Contact

- Project Lead: your-handle
- Email: your-email@domain.com
- Website: cssframes.io (optional placeholder) -->


##  Closing Statement

> “Standardizing the way the web moves.”

CSSFrames is not a library.
It is an attempt to define a **shared motion language for the web**.
