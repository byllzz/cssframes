export const animations = [
  {
    id: 'float-anim',
    title: 'Floating',
    category: 'Floating',
    duration: '3s',
    keyframes: `
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    `,
    css: '@keyframes float-anim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }',
    tailwind: 'animate-[float-anim_3s_ease-in-out_infinite]',
  },
  {
    id: 'pulse-soft',
    title: 'Soft Pulse',
    category: 'Buttons',
    duration: '2s',
    keyframes: `
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    `,
    css: '@keyframes pulse-soft { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }',
    tailwind: 'animate-[pulse-soft_2s_ease-in-out_infinite]',
  },
  {
    id: 'slide-up-fade',
    title: 'Slide Up Reveal',
    category: 'Entrances',
    duration: '0.6s',
    keyframes: `
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    `,
    css: '@keyframes slide-up-fade { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }',
    tailwind: 'animate-[slide-up-fade_0.6s_ease-out_forwards]',
  },
  {
    id: 'spin-slow',
    title: 'Gentle Spin',
    category: 'Loaders',
    duration: '8s',
    keyframes: `
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    `,
    css: '@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
    tailwind: 'animate-[spin-slow_8s_linear_infinite]',
  },
  {
    id: 'shake-error',
    title: 'Error Shake',
    category: 'Buttons',
    duration: '0.4s',
    keyframes: `
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    `,
    css: '@keyframes shake-error { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }',
    tailwind: 'animate-[shake-error_0.4s_ease-in-out]',
  },
  {
    id: 'bounce-light',
    title: 'Light Bounce',
    category: 'Transitions',
    duration: '2s',
    keyframes: `
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    `,
    css: '@keyframes bounce-light { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }',
    tailwind: 'animate-[bounce-light_2s_infinite]',
  },
  {
    id: 'blur-in',
    title: 'Blur Reveal',
    category: 'Entrances',
    duration: '1s',
    keyframes: `
      0% { filter: blur(10px); opacity: 0; }
      100% { filter: blur(0); opacity: 1; }
    `,
    css: '@keyframes blur-in { from { filter: blur(10px); opacity: 0; } to { filter: blur(0); opacity: 1; } }',
    tailwind: 'animate-[blur-in_1s_ease-out_forwards]',
  },
  {
    id: 'shimmer-effect',
    title: 'Shimmering',
    category: 'Loaders',
    duration: '2s',
    keyframes: `
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    `,
    css: '.shimmer { background: linear-gradient(90deg, #18181b 25%, #27272a 50%, #18181b 75%); background-size: 200% 100%; animation: shimmer-effect 2s infinite; }',
    tailwind: 'bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 bg-[length:200%_100%] animate-[shimmer-effect_2s_linear_infinite]',
  },
  {
    id: 'zoom-in-out',
    title: 'Breathing Zoom',
    category: 'Floating',
    duration: '4s',
    keyframes: `
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    `,
    css: '@keyframes zoom-in-out { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }',
    tailwind: 'animate-[zoom-in-out_4s_ease-in-out_infinite]',
  },
  {
    id: 'slide-right',
    title: 'Slide In Right',
    category: 'Entrances',
    duration: '0.5s',
    keyframes: `
      0% { transform: translateX(50px); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    `,
    css: '@keyframes slide-right { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }',
    tailwind: 'animate-[slide-right_0.5s_ease-out_forwards]',
  }
];
