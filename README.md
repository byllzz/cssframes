<p align="center">
  <a href="https://cssframes.vercel.app/">
    <img src="./src/assets/homePreview.png" alt="CSSFrames Preview">
  </a>
</p>

<h1 align="center">CSSFrames</h1>

<p align="center">
  A modern, open-source motion system for building high-performance UI animations using pure CSS keyframes. Create smooth, production-ready animations without JavaScript runtime overhead.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/Status-Active-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/Website-Online-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/React-Vite-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/Tailwind-v4-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/Express-API-9B26FF?style=flat"/>
  <img src="https://img.shields.io/badge/Deploy-Vercel%2FRailway-9B26FF?style=flat"/>
</p>

<p align="center">
  <a href="https://cssframes.vercel.app/">Live Demo</a> •
  <a href="https://github.com/byllzz/cssframes/issues/new">Report Bug</a> •
  <a href="https://github.com/byllzz/cssframes/issues/new">Request Feature</a>
</p>

---

# About

**CSSFrames** is an open-source motion system that helps developers build fast, consistent UI animations using **pure CSS keyframes**.

Instead of creating animations from scratch for every project, CSSFrames provides a curated collection of reusable motion presets that work seamlessly with traditional CSS and Tailwind CSS.

Built with performance as the foundation, every animation avoids layout thrashing by relying on GPU-accelerated properties like `transform` and `opacity`. No JavaScript animation runtime, no heavy dependencies, and no unnecessary complexity.

Alongside its animation library, CSSFrames includes a visual preview system, export tools, a Creator Suite for custom animations, and a community platform where developers can publish and discover new motion presets.

---

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

---

# How It Works

Using CSSFrames takes only a few steps:

1. Browse the animation library or community collection.
2. Preview animations on different UI components.
3. Customize timing, easing, and playback.
4. Export production-ready CSS or Tailwind utilities.
5. Drop the animation directly into your project.

Every preset is designed to be lightweight, reusable, and easy to integrate into modern frontend applications.

---

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

---

# Tech Stack

CSSFrames is powered by a modern frontend and backend stack.

### Frontend

- React
- Vite
- Tailwind CSS v4
- JavaScript (ES6+)
- Lucide React
- Monaco Editor
- Prism.js

### Backend

- Express.js
- JSON Server

### Deployment

- Vercel (Frontend)
- Railway (Community API)

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,js,express,vercel" />
</p>

---
# Getting Started

Run CSSFrames locally in just a few steps.

## Prerequisites

Make sure you have the following installed:

- Node.js (Latest LTS recommended)
- npm or Yarn
- A modern web browser

## Installation

```bash
git clone https://github.com/byllzz/cssframes.git
cd cssframes
npm install
npm run dev
```

The development server will start at:

```text
http://localhost:5173
```

---

# Community API

The community animation library runs as a separate Express server located inside the `server/` directory.

```bash
cd server
npm install
npm start
```

The API will be available at:

```text
http://localhost:3001/animations
```

---

# Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:3001
```

For production deployments, replace the value with your Railway backend URL inside your Vercel environment variables.

---

# Backend Overview

The backend is intentionally lightweight and only handles community animation storage.

### Responsibilities

- Store community-submitted animations
- Fetch animation collections
- Delete existing submissions
- Persist data using `db.json`
- Expose a simple REST API

### Directory

```text
server/
├── db.json
├── server.js
└── package.json
```

---

# API Endpoints

### Get All Animations

```http
GET /animations
```

Returns every community animation.

### Submit Animation

```http
POST /animations
```

Adds a new animation to the collection.

### Delete Animation

```http
DELETE /animations/:id
```

Removes an animation by its ID.

---

# Deploying the Backend

Deploying the API to Railway takes only a few minutes.

1. Push the repository to GitHub.
2. Create a new Railway project.
3. Select **Deploy from GitHub**.
4. Set the **Root Directory** to `server`.
5. Use the start command:

```bash
node server.js
```

6. Add the following environment variable:

```env
PORT=3001
```

7. Generate a public Railway domain.
8. Copy the generated URL.
9. Add it to Vercel as:

```env
VITE_API_URL=https://your-railway-url
```

---

# Project Structure

```text
cssframes/
├── src/
│   ├── api/              # API utilities
│   ├── components/       # Reusable UI components
│   ├── data/             # Motion presets & categories
│   ├── App.jsx
│   └── main.jsx
│
├── server/               # Community REST API
│   ├── db.json
│   ├── server.js
│   └── package.json
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

---


# Contributing

Contributions are always welcome, whether you're fixing bugs, improving documentation, or creating new motion presets.

## Development Workflow

```bash
# Fork the repository

git checkout -b motion/your-feature-name

# Make your changes

git commit -m "feat: add new motion preset"

git push origin motion/your-feature-name
```

Open a Pull Request with a clear description of your changes and include previews whenever possible.

### Contribution Guidelines

- Follow the existing code style.
- Keep animations GPU-friendly.
- Test animations before submitting.
- Include animation metadata and preview examples.
- Write clear, descriptive commit messages.

---

# Author

<img src="https://github.com/byllzz.png" width="90" alt="Bilal Malik"/>

## Bilal Malik

[![GitHub](https://img.shields.io/badge/GitHub-byllzz-9B26FF?style=flat&logo=github&logoColor=white)](https://github.com/byllzz)
[![X](https://img.shields.io/badge/X-@bilalmlkdev-9B26FF?style=flat&logo=x&logoColor=white)](https://x.com/bilalmlkdev)
[![Portfolio](https://img.shields.io/badge/Portfolio-bilalmlkdev.vercel.app-9B26FF?style=flat&logo=vercel&logoColor=white)](https://bilalmlkdev.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Bilal%20Malik-9B26FF?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bilalmlkdev/)
[![Email](https://img.shields.io/badge/Email-bilalmlkdev@gmail.com-9B26FF?style=flat&logo=gmail&logoColor=white)](mailto:bilalmlkdev@gmail.com)

If you enjoyed this project, consider giving it a ⭐ on GitHub. It helps others discover the project and motivates future improvements.

<p align="right">
  <a href="#texturae">⬆ Back to Top</a>
</p>

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
# Support the Project

If CSSFrames helped you, consider giving the repository a ⭐ on GitHub.
Your support helps the project reach more developers and motivates future improvements.


© 2026 CSSFRAMES. Licensed under the MIT License.
