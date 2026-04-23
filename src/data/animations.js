export const animations = [
  // BUTTONS
  {
    id: 'split-sheen',
    title: 'Split Sheen',
    category: 'Buttons',
    duration: '2.4s',
    keyframes: `@keyframes split-sheen {
  0% { transform: translateX(-10px) skewX(-6deg); opacity: 0.85; filter: brightness(1); }
  50% { transform: translateX(10px) skewX(6deg); opacity: 1; filter: brightness(1.2); }
  100% { transform: translateX(-10px) skewX(-6deg); opacity: 0.85; filter: brightness(1); }
}`,
    css: `@keyframes split-sheen {
  0% { transform: translateX(-10px) skewX(-6deg); opacity: 0.85; filter: brightness(1); }
  50% { transform: translateX(10px) skewX(6deg); opacity: 1; filter: brightness(1.2); }
  100% { transform: translateX(-10px) skewX(-6deg); opacity: 0.85; filter: brightness(1); }
}`,
    desc: 'A polished lateral shimmer for high-end interaction states.',
    type: 'box',
  },
  {
    id: 'elastic-pop',
    title: 'Elastic Pop',
    category: 'Buttons',
    duration: '0.9s',
    keyframes: `@keyframes elastic-pop {
  0% { transform: scale(0.88); }
  45% { transform: scale(1.08); }
  65% { transform: scale(0.97); }
  82% { transform: scale(1.02); }
  100% { transform: scale(1); }
}`,
    css: `@keyframes elastic-pop {
  0% { transform: scale(0.88); }
  45% { transform: scale(1.08); }
  65% { transform: scale(0.97); }
  82% { transform: scale(1.02); }
  100% { transform: scale(1); }
}`,
    desc: 'Bouncy but controlled feedback for clicks, taps, and confirmations.',
    type: 'box',
  },
  {
    id: 'border-orbit',
    title: 'Border Orbit',
    category: 'Buttons',
    duration: '3s',
    keyframes: `@keyframes border-orbit {
  0%, 100% { border-radius: 18px 28px 20px 30px; transform: rotate(0deg); }
  25% { border-radius: 30px 18px 28px 20px; transform: rotate(3deg); }
  50% { border-radius: 22px 32px 18px 26px; transform: rotate(0deg); }
  75% { border-radius: 28px 20px 30px 18px; transform: rotate(-3deg); }
}`,
    css: `@keyframes border-orbit {
  0%, 100% { border-radius: 18px 28px 20px 30px; transform: rotate(0deg); }
  25% { border-radius: 30px 18px 28px 20px; transform: rotate(3deg); }
  50% { border-radius: 22px 32px 18px 26px; transform: rotate(0deg); }
  75% { border-radius: 28px 20px 30px 18px; transform: rotate(-3deg); }
}`,
    desc: 'Morphing corners that give a button a living, crafted feel.',
    type: 'box',
  },
  {
    id: 'tilt-float',
    title: 'Tilt Float',
    category: 'Buttons',
    duration: '2.6s',
    keyframes: `@keyframes tilt-float {
  0%, 100% { transform: translateY(0) rotateX(0deg) rotateZ(0deg); }
  50% { transform: translateY(-8px) rotateX(6deg) rotateZ(1deg); }
}`,
    css: `@keyframes tilt-float {
  0%, 100% { transform: translateY(0) rotateX(0deg) rotateZ(0deg); }
  50% { transform: translateY(-8px) rotateX(6deg) rotateZ(1deg); }
}`,
    desc: 'A floating lift with just enough 3D tilt to feel expensive.',
    type: 'box',
  },

  // LOADERS

  {
    id: 'orbit-rotor',
    title: 'Orbit Rotor',
    category: 'Loaders',
    duration: '1.4s',
    keyframes: `@keyframes orbit-rotor {
  from { transform: rotate(0deg) scale(1); }
  to { transform: rotate(360deg) scale(1); }
}`,
    css: `@keyframes orbit-rotor {
  from { transform: rotate(0deg) scale(1); }
  to { transform: rotate(360deg) scale(1); }
}`,
    desc: 'A clean continuous spin for polished loading states.',
    type: 'icon',
  },
  {
    id: 'radar-breath',
    title: 'Radar Breath',
    category: 'Loaders',
    duration: '2.2s',
    keyframes: `@keyframes radar-breath {
  0% { transform: scale(0.72); opacity: 0.15; filter: blur(0px); }
  50% { transform: scale(1.12); opacity: 1; filter: blur(0px); }
  100% { transform: scale(1.45); opacity: 0; filter: blur(1px); }
}`,
    css: `@keyframes radar-breath {
  0% { transform: scale(0.72); opacity: 0.15; filter: blur(0px); }
  50% { transform: scale(1.12); opacity: 1; filter: blur(0px); }
  100% { transform: scale(1.45); opacity: 0; filter: blur(1px); }
}`,
    desc: 'Expanding pulse energy that works well for waiting states.',
    type: 'circle',
  },
  {
    id: 'soft-orbit',
    title: 'Soft Orbit',
    category: 'Loaders',
    duration: '3.2s',
    keyframes: `@keyframes soft-orbit {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-7px) rotate(90deg); }
  50% { transform: translateY(0) rotate(180deg); }
  75% { transform: translateY(7px) rotate(270deg); }
}`,
    css: `@keyframes soft-orbit {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-7px) rotate(90deg); }
  50% { transform: translateY(0) rotate(180deg); }
  75% { transform: translateY(7px) rotate(270deg); }
}`,
    desc: 'Gentle orbital motion with a drifting rhythm.',
    type: 'icon',
  },
  {
    id: 'pulse-stack',
    title: 'Pulse Stack',
    category: 'Loaders',
    duration: '1.8s',
    keyframes: `@keyframes pulse-stack {
  0%, 100% { transform: scale(0.96); opacity: 0.55; }
  40% { transform: scale(1.08); opacity: 1; }
  70% { transform: scale(1); opacity: 0.8; }
}`,
    css: `@keyframes pulse-stack {
  0%, 100% { transform: scale(0.96); opacity: 0.55; }
  40% { transform: scale(1.08); opacity: 1; }
  70% { transform: scale(1); opacity: 0.8; }
}`,
    desc: 'A layered heartbeat style loader with a refined cadence.',
    type: 'circle',
  },
  {
    id: 'drift-spark',
    title: 'Drift Spark',
    category: 'Loaders',
    duration: '2.8s',
    keyframes: `@keyframes drift-spark {
  0%, 100% { transform: translateX(-8px) translateY(0) rotate(0deg); opacity: 0.75; }
  25% { transform: translateX(0) translateY(-6px) rotate(10deg); opacity: 1; }
  50% { transform: translateX(8px) translateY(0) rotate(0deg); opacity: 0.8; }
  75% { transform: translateX(0) translateY(6px) rotate(-10deg); opacity: 1; }
}`,
    css: `@keyframes drift-spark {
  0%, 100% { transform: translateX(-8px) translateY(0) rotate(0deg); opacity: 0.75; }
  25% { transform: translateX(0) translateY(-6px) rotate(10deg); opacity: 1; }
  50% { transform: translateX(8px) translateY(0) rotate(0deg); opacity: 0.8; }
  75% { transform: translateX(0) translateY(6px) rotate(-10deg); opacity: 1; }
}`,
    desc: 'An airy drifting loader that feels less robotic than a spinner.',
    type: 'icon',
  },

  // ENTRANCES
  {
    id: 'glass-rise',
    title: 'Glass Rise',
    category: 'Entrances',
    duration: '0.8s',
    keyframes: `@keyframes glass-rise {
  0% { transform: translateY(24px) scale(0.98); opacity: 0; filter: blur(10px); }
  60% { transform: translateY(-2px) scale(1.01); opacity: 1; filter: blur(0px); }
  100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0px); }
}`,
    css: `@keyframes glass-rise {
  0% { transform: translateY(24px) scale(0.98); opacity: 0; filter: blur(10px); }
  60% { transform: translateY(-2px) scale(1.01); opacity: 1; filter: blur(0px); }
  100% { transform: translateY(0) scale(1); opacity: 1; filter: blur(0px); }
}`,
    desc: 'A sharp, modern entrance that feels like frosted glass resolving.',
    type: 'box',
  },
  {
    id: 'cascade-unveil',
    title: 'Cascade Unveil',
    category: 'Entrances',
    duration: '1.1s',
    keyframes: `@keyframes cascade-unveil {
  0% { transform: translateY(36px) skewY(8deg); opacity: 0; clip-path: inset(0 0 100% 0); }
  65% { transform: translateY(0) skewY(0deg); opacity: 1; clip-path: inset(0 0 0 0); }
  100% { transform: translateY(0) skewY(0deg); opacity: 1; clip-path: inset(0 0 0 0); }
}`,
    css: `@keyframes cascade-unveil {
  0% { transform: translateY(36px) skewY(8deg); opacity: 0; clip-path: inset(0 0 100% 0); }
  65% { transform: translateY(0) skewY(0deg); opacity: 1; clip-path: inset(0 0 0 0); }
  100% { transform: translateY(0) skewY(0deg); opacity: 1; clip-path: inset(0 0 0 0); }
}`,
    desc: 'A layered reveal with a crisp unveiling feel.',
    type: 'box',
  },
  {
    id: 'focus-bloom',
    title: 'Focus Bloom',
    category: 'Entrances',
    duration: '1.2s',
    keyframes: `@keyframes focus-bloom {
  0% { transform: scale(0.9); opacity: 0; filter: blur(14px) brightness(0.9); }
  55% { transform: scale(1.03); opacity: 1; filter: blur(2px) brightness(1.08); }
  100% { transform: scale(1); opacity: 1; filter: blur(0px) brightness(1); }
}`,
    css: `@keyframes focus-bloom {
  0% { transform: scale(0.9); opacity: 0; filter: blur(14px) brightness(0.9); }
  55% { transform: scale(1.03); opacity: 1; filter: blur(2px) brightness(1.08); }
  100% { transform: scale(1); opacity: 1; filter: blur(0px) brightness(1); }
}`,
    desc: 'Feels like a camera pulling into perfect focus.',
    type: 'box',
  },
  {
    id: 'slide-ink',
    title: 'Slide Ink',
    category: 'Entrances',
    duration: '0.7s',
    keyframes: `@keyframes slide-ink {
  0% { transform: translateX(-28px) rotate(-4deg); opacity: 0; }
  70% { transform: translateX(2px) rotate(0deg); opacity: 1; }
  100% { transform: translateX(0) rotate(0deg); opacity: 1; }
}`,
    css: `@keyframes slide-ink {
  0% { transform: translateX(-28px) rotate(-4deg); opacity: 0; }
  70% { transform: translateX(2px) rotate(0deg); opacity: 1; }
  100% { transform: translateX(0) rotate(0deg); opacity: 1; }
}`,
    desc: 'A crisp lateral entry with a slight handwritten energy.',
    type: 'box',
  },
  {
    id: 'lift-snap',
    title: 'Lift Snap',
    category: 'Entrances',
    duration: '0.55s',
    keyframes: `@keyframes lift-snap {
  0% { transform: translateY(18px) scale(0.92); opacity: 0; }
  75% { transform: translateY(-2px) scale(1.02); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}`,
    css: `@keyframes lift-snap {
  0% { transform: translateY(18px) scale(0.92); opacity: 0; }
  75% { transform: translateY(-2px) scale(1.02); opacity: 1; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}`,
    desc: 'A quick, snappy entrance that works well for cards and modals.',
    type: 'box',
  },

  // TEXT

  {
    id: 'reveal-stagger',
    title: 'Reveal Stagger',
    category: 'Text',
    duration: '1.1s',
    keyframes: `@keyframes reveal-stagger {
  0% { transform: translateY(120%) skewY(8deg); opacity: 0; letter-spacing: 0.08em; }
  70% { transform: translateY(-2%) skewY(0deg); opacity: 1; letter-spacing: 0.01em; }
  100% { transform: translateY(0) skewY(0deg); opacity: 1; letter-spacing: 0; }
}`,
    css: `@keyframes reveal-stagger {
  0% { transform: translateY(120%) skewY(8deg); opacity: 0; letter-spacing: 0.08em; }
  70% { transform: translateY(-2%) skewY(0deg); opacity: 1; letter-spacing: 0.01em; }
  100% { transform: translateY(0) skewY(0deg); opacity: 1; letter-spacing: 0; }
}`,
    desc: 'A cinematic text reveal with a clean editorial finish.',
    type: 'text',
  },
  {
    id: 'neon-flicker',
    title: 'Neon Flicker',
    category: 'Text',
    duration: '1.6s',
    keyframes: `@keyframes neon-flicker {
  0%, 100% { opacity: 1; text-shadow: 0 0 0 rgba(255,255,255,0); }
  10% { opacity: 0.6; }
  18% { opacity: 1; text-shadow: 0 0 8px rgba(255,255,255,0.2); }
  27% { opacity: 0.75; }
  35% { opacity: 1; text-shadow: 0 0 18px rgba(255,255,255,0.35); }
  48% { opacity: 0.85; }
  60% { opacity: 1; }
}`,
    css: `@keyframes neon-flicker {
  0%, 100% { opacity: 1; text-shadow: 0 0 0 rgba(255,255,255,0); }
  10% { opacity: 0.6; }
  18% { opacity: 1; text-shadow: 0 0 8px rgba(255,255,255,0.2); }
  27% { opacity: 0.75; }
  35% { opacity: 1; text-shadow: 0 0 18px rgba(255,255,255,0.35); }
  48% { opacity: 0.85; }
  60% { opacity: 1; }
}`,
    desc: 'A moody neon text effect with controlled instability.',
    type: 'text',
  },
  {
    id: 'typewave',
    title: 'Type Wave',
    category: 'Text',
    duration: '2.1s',
    keyframes: `@keyframes typewave {
  0% { transform: translateY(8px); opacity: 0; filter: blur(6px); }
  40% { transform: translateY(0); opacity: 1; filter: blur(1px); }
  100% { transform: translateY(0); opacity: 1; filter: blur(0px); }
}`,
    css: `@keyframes typewave {
  0% { transform: translateY(8px); opacity: 0; filter: blur(6px); }
  40% { transform: translateY(0); opacity: 1; filter: blur(1px); }
  100% { transform: translateY(0); opacity: 1; filter: blur(0px); }
}`,
    desc: 'A soft text rise that feels fluid rather than mechanical.',
    type: 'text',
  },
  {
    id: 'scramble-glow',
    title: 'Scramble Glow',
    category: 'Text',
    duration: '1.4s',
    keyframes: `@keyframes scramble-glow {
  0% { transform: translateX(-4px); opacity: 0; filter: blur(8px); }
  20% { transform: translateX(3px); opacity: 0.7; filter: blur(4px); }
  45% { transform: translateX(-2px); opacity: 1; filter: blur(1px); }
  70% { transform: translateX(1px); opacity: 1; filter: blur(0px); }
  100% { transform: translateX(0); opacity: 1; filter: blur(0px); }
}`,
    css: `@keyframes scramble-glow {
  0% { transform: translateX(-4px); opacity: 0; filter: blur(8px); }
  20% { transform: translateX(3px); opacity: 0.7; filter: blur(4px); }
  45% { transform: translateX(-2px); opacity: 1; filter: blur(1px); }
  70% { transform: translateX(1px); opacity: 1; filter: blur(0px); }
  100% { transform: translateX(0); opacity: 1; filter: blur(0px); }
}`,
    desc: 'A glitch-lite reveal for futuristic headings.',
    type: 'text',
  },
  {
    id: 'ink-rise',
    title: 'Ink Rise',
    category: 'Text',
    duration: '0.95s',
    keyframes: `@keyframes ink-rise {
  0% { transform: translateY(18px) scale(0.96); opacity: 0; filter: saturate(0.8); }
  70% { transform: translateY(-1px) scale(1.01); opacity: 1; filter: saturate(1); }
  100% { transform: translateY(0) scale(1); opacity: 1; filter: saturate(1); }
}`,
    css: `@keyframes ink-rise {
  0% { transform: translateY(18px) scale(0.96); opacity: 0; filter: saturate(0.8); }
  70% { transform: translateY(-1px) scale(1.01); opacity: 1; filter: saturate(1); }
  100% { transform: translateY(0) scale(1); opacity: 1; filter: saturate(1); }
}`,
    desc: 'An elegant editorial rise that looks good on hero text.',
    type: 'text',
  },

  // CARDS

  {
    id: 'depth-breathe',
    title: 'Depth Breathe',
    category: 'Cards',
    duration: '4.5s',
    keyframes: `@keyframes depth-breathe {
  0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 10px 30px rgba(0,0,0,0.18); }
  50% { transform: translateY(-8px) scale(1.01); box-shadow: 0 18px 45px rgba(0,0,0,0.28); }
}`,
    css: `@keyframes depth-breathe {
  0%, 100% { transform: translateY(0) scale(1); box-shadow: 0 10px 30px rgba(0,0,0,0.18); }
  50% { transform: translateY(-8px) scale(1.01); box-shadow: 0 18px 45px rgba(0,0,0,0.28); }
}`,
    desc: 'A calm floating card animation with a premium shadow rhythm.',
    type: 'box',
  },
  {
    id: 'sheen-pass',
    title: 'Sheen Pass',
    category: 'Cards',
    duration: '2.3s',
    keyframes: `@keyframes sheen-pass {
  0% { transform: translateX(-20px) skewX(-8deg); opacity: 0.2; }
  50% { transform: translateX(0) skewX(0deg); opacity: 1; }
  100% { transform: translateX(20px) skewX(8deg); opacity: 0.2; }
}`,
    css: `@keyframes sheen-pass {
  0% { transform: translateX(-20px) skewX(-8deg); opacity: 0.2; }
  50% { transform: translateX(0) skewX(0deg); opacity: 1; }
  100% { transform: translateX(20px) skewX(8deg); opacity: 0.2; }
}`,
    desc: 'A moving highlight effect that reads as polished and tactile.',
    type: 'box',
  },
  {
    id: 'stack-lift',
    title: 'Stack Lift',
    category: 'Cards',
    duration: '3.8s',
    keyframes: `@keyframes stack-lift {
  0%, 100% { transform: translateY(0) rotateX(0deg); }
  33% { transform: translateY(-4px) rotateX(2deg); }
  66% { transform: translateY(-10px) rotateX(5deg); }
}`,
    css: `@keyframes stack-lift {
  0%, 100% { transform: translateY(0) rotateX(0deg); }
  33% { transform: translateY(-4px) rotateX(2deg); }
  66% { transform: translateY(-10px) rotateX(5deg); }
}`,
    desc: 'A layered lift that makes cards feel like physical objects.',
    type: 'box',
  },
  {
    id: 'edge-glow',
    title: 'Edge Glow',
    category: 'Cards',
    duration: '2.8s',
    keyframes: `@keyframes edge-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.03), 0 10px 25px rgba(0,0,0,0.2); }
  50% { box-shadow: 0 0 0 8px rgba(255,255,255,0.05), 0 18px 40px rgba(0,0,0,0.28); }
}`,
    css: `@keyframes edge-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.03), 0 10px 25px rgba(0,0,0,0.2); }
  50% { box-shadow: 0 0 0 8px rgba(255,255,255,0.05), 0 18px 40px rgba(0,0,0,0.28); }
}`,
    desc: 'A soft border glow that makes surfaces feel alive.',
    type: 'box',
  },
  {
    id: 'tilt-drift',
    title: 'Tilt Drift',
    category: 'Cards',
    duration: '5s',
    keyframes: `@keyframes tilt-drift {
  0%, 100% { transform: translateY(0) rotateZ(0deg); }
  25% { transform: translateY(-5px) rotateZ(-1deg); }
  50% { transform: translateY(-10px) rotateZ(0.5deg); }
  75% { transform: translateY(-4px) rotateZ(1deg); }
}`,
    css: `@keyframes tilt-drift {
  0%, 100% { transform: translateY(0) rotateZ(0deg); }
  25% { transform: translateY(-5px) rotateZ(-1deg); }
  50% { transform: translateY(-10px) rotateZ(0.5deg); }
  75% { transform: translateY(-4px) rotateZ(1deg); }
}`,
    desc: 'A restrained motion curve with a bit of personality.',
    type: 'box',
  },

  // ICONS

  {
    id: 'icon-orbit',
    title: 'Icon Orbit',
    category: 'Icons',
    duration: '2.4s',
    keyframes: `@keyframes icon-orbit {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-8px) rotate(8deg) scale(1.03); }
  50% { transform: translateY(0) rotate(0deg) scale(1); }
  75% { transform: translateY(6px) rotate(-8deg) scale(0.98); }
}`,
    css: `@keyframes icon-orbit {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
  25% { transform: translateY(-8px) rotate(8deg) scale(1.03); }
  50% { transform: translateY(0) rotate(0deg) scale(1); }
  75% { transform: translateY(6px) rotate(-8deg) scale(0.98); }
}`,
    desc: 'A light orbital drift for UI icons and small illustrations.',
    type: 'icon',
  },
  {
    id: 'stroke-draw',
    title: 'Stroke Draw',
    category: 'Icons',
    duration: '1.7s',
    keyframes: `@keyframes stroke-draw {
  0% { opacity: 0; transform: scale(0.92); stroke-dashoffset: 120; }
  60% { opacity: 1; transform: scale(1.02); stroke-dashoffset: 24; }
  100% { opacity: 1; transform: scale(1); stroke-dashoffset: 0; }
}`,
    css: `@keyframes stroke-draw {
  0% { opacity: 0; transform: scale(0.92); stroke-dashoffset: 120; }
  60% { opacity: 1; transform: scale(1.02); stroke-dashoffset: 24; }
  100% { opacity: 1; transform: scale(1); stroke-dashoffset: 0; }
}`,
    desc: 'A crisp outline-drawing effect that feels engineered.',
    type: 'icon',
  },
  {
    id: 'ring-shake',
    title: 'Ring Shake',
    category: 'Icons',
    duration: '0.95s',
    keyframes: `@keyframes ring-shake {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(14deg); }
  40% { transform: rotate(-14deg); }
  60% { transform: rotate(10deg); }
  80% { transform: rotate(-8deg); }
}`,
    css: `@keyframes ring-shake {
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(14deg); }
  40% { transform: rotate(-14deg); }
  60% { transform: rotate(10deg); }
  80% { transform: rotate(-8deg); }
}`,
    desc: 'Alert-style motion with enough personality to feel intentional.',
    type: 'icon',
  },
  {
    id: 'float-glow',
    title: 'Float Glow',
    category: 'Icons',
    duration: '3.1s',
    keyframes: `@keyframes float-glow {
  0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
  50% { transform: translateY(-7px) scale(1.04); filter: drop-shadow(0 0 12px rgba(255,255,255,0.25)); }
}`,
    css: `@keyframes float-glow {
  0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
  50% { transform: translateY(-7px) scale(1.04); filter: drop-shadow(0 0 12px rgba(255,255,255,0.25)); }
}`,
    desc: 'A luminous float that works well for hero icons and badges.',
    type: 'icon',
  },
  {
    id: 'pulse-rotate',
    title: 'Pulse Rotate',
    category: 'Icons',
    duration: '2.1s',
    keyframes: `@keyframes pulse-rotate {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(8deg) scale(1.08); }
}`,
    css: `@keyframes pulse-rotate {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(8deg) scale(1.08); }
}`,
    desc: 'A tiny spin with a pulse that gives icons more presence.',
    type: 'icon',
  },

  // SHAPES

  {
    id: 'liquid-blob',
    title: 'Liquid Blob',
    category: 'Shapes',
    duration: '7s',
    keyframes: `@keyframes liquid-blob {
  0%, 100% { border-radius: 44% 56% 65% 35% / 48% 40% 60% 52%; transform: scale(1) rotate(0deg); }
  33% { border-radius: 58% 42% 48% 52% / 38% 58% 42% 62%; transform: scale(1.02) rotate(4deg); }
  66% { border-radius: 36% 64% 58% 42% / 58% 42% 58% 42%; transform: scale(0.98) rotate(-4deg); }
}`,
    css: `@keyframes liquid-blob {
  0%, 100% { border-radius: 44% 56% 65% 35% / 48% 40% 60% 52%; transform: scale(1) rotate(0deg); }
  33% { border-radius: 58% 42% 48% 52% / 38% 58% 42% 62%; transform: scale(1.02) rotate(4deg); }
  66% { border-radius: 36% 64% 58% 42% / 58% 42% 58% 42%; transform: scale(0.98) rotate(-4deg); }
}`,
    desc: 'An organic morphing blob for abstract UI energy.',
    type: 'circle',
  },
  {
    id: 'square-round',
    title: 'Square Round',
    category: 'Shapes',
    duration: '3.4s',
    keyframes: `@keyframes square-round {
  0%, 100% { border-radius: 8px; transform: rotate(0deg); }
  50% { border-radius: 50%; transform: rotate(90deg); }
}`,
    css: `@keyframes square-round {
  0%, 100% { border-radius: 8px; transform: rotate(0deg); }
  50% { border-radius: 50%; transform: rotate(90deg); }
}`,
    desc: 'A smooth geometric transition from crisp to soft.',
    type: 'box',
  },
  {
    id: 'breath-orb',
    title: 'Breath Orb',
    category: 'Shapes',
    duration: '2.5s',
    keyframes: `@keyframes breath-orb {
  0%, 100% { transform: scale(0.96); filter: brightness(1) saturate(1); }
  50% { transform: scale(1.08); filter: brightness(1.15) saturate(1.08); }
}`,
    css: `@keyframes breath-orb {
  0%, 100% { transform: scale(0.96); filter: brightness(1) saturate(1); }
  50% { transform: scale(1.08); filter: brightness(1.15) saturate(1.08); }
}`,
    desc: 'A living pulse for circles and abstract visual markers.',
    type: 'circle',
  },
  {
    id: 'hex-spin',
    title: 'Hex Spin',
    category: 'Shapes',
    duration: '4.2s',
    keyframes: `@keyframes hex-spin {
  0%, 100% { transform: rotate(0deg) scale(1); border-radius: 22% 78% 26% 74% / 45% 42% 58% 55%; }
  50% { transform: rotate(180deg) scale(1.04); border-radius: 60% 40% 68% 32% / 32% 60% 40% 68%; }
}`,
    css: `@keyframes hex-spin {
  0%, 100% { transform: rotate(0deg) scale(1); border-radius: 22% 78% 26% 74% / 45% 42% 58% 55%; }
  50% { transform: rotate(180deg) scale(1.04); border-radius: 60% 40% 68% 32% / 32% 60% 40% 68%; }
}`,
    desc: 'A rotating, morphing shape with an abstract-tech feel.',
    type: 'box',
  },
  {
    id: 'pulse-core',
    title: 'Pulse Core',
    category: 'Shapes',
    duration: '1.9s',
    keyframes: `@keyframes pulse-core {
  0% { transform: scale(0.9); opacity: 0.7; }
  40% { transform: scale(1.1); opacity: 1; }
  70% { transform: scale(0.98); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
}`,
    css: `@keyframes pulse-core {
  0% { transform: scale(0.9); opacity: 0.7; }
  40% { transform: scale(1.1); opacity: 1; }
  70% { transform: scale(0.98); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
}`,
    desc: 'A core pulse for abstract components and UI emblems.',
    type: 'circle',
  },

  // demo

];
