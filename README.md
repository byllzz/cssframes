# <a href="https://cssframes.vercel.app" target="_blank">CSSFrames - Animations using Pure CSS Keyframes</a>

**CSSFrames** is an open-source motion system for building high-performance UI animations using pure CSS keyframes.
It provides a curated library of **pre-engineered motion presets** designed to replace inconsistent, ad-hoc animation usage across modern web apps.
Built for **performance, consistency, and developer speed** - with no JavaScript animation runtime, no animation libraries, and no layout thrashing.

<p align="left">
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-9B72FF.svg?style=flat" />
  </a>
  <img src="https://img.shields.io/badge/Repository%20Status-Active-9B72FF.svg?style=flat" />
  <img src="https://img.shields.io/badge/Website%20Status-Online-9B72FF.svg?style=flat" />
  <a href="https://github.com/byllzz">
    <img src="https://img.shields.io/badge/Author-Bilal%20Malik-9B72FF.svg?style=flat" />
  </a>
  <a href="https://github.com/byllzz/cssframes/releases">
    <img src="https://img.shields.io/badge/Latest%20Release-19%20April%202026-9B72FF.svg" />
  </a>
</p>

<br />

[![Visit CSSFrames](https://img.shields.io/badge/View-CSSFrames-9B72FF?style=flat)](https://cssframes.vercel.app)

<img width="100%" alt="CSSFrames Preview" src="./src/assets/homePreview.png" />
<img width="100%" alt="CSSFrames Preview" src="./src/assets/appPreview.png" />

⭐ **Star the repo if you like it — it helps the project grow.**

---

## Features

<p align="left">
✔️ Pure CSS Keyframe Animations<br>
✔️ GPU-Friendly Motion Primitives<br>
✔️ Zero JavaScript Animation Runtime<br>
✔️ Tailwind-Compatible Animation System<br>
✔️ Curated Motion Presets<br>
✔️ Live Interactive Preview Grid<br>
✔️ Creator Suite for Building Custom Presets<br>
✔️ Instant Export to CSS @keyframes<br>
✔️ Theater Mode for Focused Previewing<br>
✔️ Community Motion Ecosystem<br>
✔️ Persistent Community Submissions via REST API<br>
✔️ Performance-First Architecture<br>
✔️ Open Source MIT License<br>
✔️ Designed for Production UI Work
</p>

---

## How It Works

- Choose a motion preset from the library or community collection.
- Preview the animation instantly on different UI elements.
- Export production-ready output as:
  - CSS `@keyframes`
  - Tailwind animation classes
  - duration and easing metadata
- Use the generated motion in your app with minimal setup.
- All animations rely on compositor-friendly properties like `transform` and `opacity`.

---

## Core Philosophy

- **Motion is Functional**
  Animations are not decoration. They communicate state, hierarchy, and feedback.

- **Performance First**
  Every animation is built to avoid layout shifts, avoid paint recalculations, and stay GPU composited.

- **Composable System**
  Animations are modular building blocks, not one-off effects.

- **Design Consistency**
  All motion follows a unified rhythm and timing system.

---

## System Architecture

CSSFrames is structured into four layers:

### 1. Motion Presets Layer
Predefined animation objects for buttons, loaders, entrances, cards, icons, and shapes.

### 2. Rendering Engine
React-based preview system with live CSS injection, dynamic keyframe binding, and preview type mapping.

### 3. Export Layer
Generates production-ready output — CSS keyframes, Tailwind classes, and duration configs.

### 4. Community API Layer
A persistent REST API built with Express and hosted on Railway. Handles storing and retrieving community-submitted animations so submissions survive page reloads and are shared across all users.

---

## Animation Categories

### Buttons
- micro-interaction feedback
- hover and click states
- error responses

### Loaders
- skeleton shimmer
- pulse rings
- spin systems

### Entrances
- slide, fade, and blur reveals
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
- stroke-draw animations
- alert motion

### Shapes
- morphing blobs
- geometric transitions
- pulse glow systems

---

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- JavaScript (ES6+)

### UI & Icons
- Lucide React
- Custom UI components
- Monaco Editor

### Animation System
- Native CSS3 keyframes
- GPU-composited transforms
- Dynamic style injection

### Backend (Community API)
- Express.js
- JSON Server (data store)
- Hosted on Railway

### Code Tools
- Prettier
- Prism.js

### Deployment
- Vercel (frontend)
- Railway (backend API)

---

## Installation & Setup

### Requirements
- Node.js
- Browser (Chrome / Edge / Firefox)
- Tailwind CSS knowledge
- A basic understanding of CSS keyframes

### Clone and run the frontend

```bash
git clone https://github.com/byllzz/cssframes.git
cd cssframes
npm install
npm run dev
```

### Run the backend API locally

The community submissions API lives in the `server/` folder and runs as a separate process.

```bash
cd server
npm install
npm start
```

The API will be available at `http://localhost:3001/animations`.

### Environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3001
```

For production, set `VITE_API_URL` to your deployed Railway API URL in your Vercel environment variables.

---

## Backend Architecture

The backend is a lightweight Express server that persists community animations to a `db.json` file. It is deployed as a separate service on Railway so data survives across frontend redeployments.

```
server/
├── db.json       ← persistent data store
├── server.js     ← Express API with CORS
└── package.json
```
### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/animations` | Fetch all community animations |
| `POST` | `/animations` | Submit a new community animation |
| `DELETE` | `/animations/:id` | Delete an animation by ID |

### Deploying the backend to Railway

1. Push your repo to GitHub (the `server/` folder must be included).
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub repo.
3. Set the **Root Directory** to `server`.
4. Set the **Start Command** to `node server.js`.
5. Add environment variable: `PORT = 3001`.
6. Generate a public domain under Settings → Networking.
7. Copy the Railway URL and add it to Vercel as `VITE_API_URL`.

---

## Project Structure
```
cssframes/
├── src/
│   ├── api/
│   │   └── animations.js       ← API calls (GET, POST)
│   ├── components/
│   │   ├── layout/             ← Navbar, Sidebar, Footer, TopLoader
│   │   ├── models/             ← PreviewModal, CreatorModal, SharePanel
│   │   ├── pages/              ← Home, About
│   │   └── ui/                 ← GridContent, CommunityGrid
│   ├── data/
│   │   ├── animations.js       ← static local animation presets
│   │   └── animationCategories.js
│   ├── App.jsx                 ← routing, state, data fetching
│   └── main.jsx
├── server/
│   ├── db.json                 ← community submissions store
│   ├── server.js               ← Express API
│   └── package.json
└── package.json
```

## Guidelines

- Keep animations GPU-friendly.
- Avoid layout-triggering properties.
- Ensure Tailwind compatibility.
- Provide both CSS and metadata.
- Include preview examples when possible.

---

## Contributing

We welcome contributions from developers and motion designers.

```bash
git checkout -b motion/your-feature-name
```

1. Fork the repository.
2. Create your feature branch.
3. Commit your changes with a clear message.
4. Push to your branch and open a pull request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
