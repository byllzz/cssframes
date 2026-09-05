export const animations = [
  //  ENTRANCE (10)
  {
    id: "fade-in-soft",
    title: "Fade In Soft",
    category: "Entrance",
    duration: "0.8s",
    keyframes: `@keyframes fade-in-soft {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}`,
    css: `animation: fade-in-soft 0.8s ease forwards;`,
    desc: "Soft upward fade entrance.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
  {
    id: "zoom-in",
    title: "Zoom In",
    category: "Entrance",
    duration: "0.6s",
    keyframes: `@keyframes zoom-in {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}`,
    css: `animation: zoom-in 0.6s ease-out forwards;`,
    desc: "Scale-based entrance.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
  {
    id: "slide-up",
    title: "Slide Up",
    category: "Entrance",
    duration: "0.7s",
    keyframes: `@keyframes slide-up {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}`,
    css: `animation: slide-up 0.7s ease forwards;`,
    desc: "Slides upward into view.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
  {
    id: "flip-in",
    title: "Flip In",
    category: "Entrance",
    duration: "0.9s",
    keyframes: `@keyframes flip-in {
  from { transform: rotateX(90deg); opacity: 0; }
  to { transform: rotateX(0); opacity: 1; }
}`,
    css: `animation: flip-in 0.9s ease forwards;`,
    desc: "3D flip entrance.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },

  //  TEXT (7)
  {
    id: "text-fade",
    title: "Text Fade",
    category: "Text",
    duration: "1s",
    keyframes: `@keyframes text-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}`,
    css: `animation: text-fade 1s ease forwards;`,
    desc: "Simple fade for text.",
    type: "text",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
  {
    id: "typewriter",
    title: "Typewriter",
    category: "Text",
    duration: "2s",
    keyframes: `@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}`,
    css: `animation: typewriter 2s steps(20) forwards;`,
    desc: "Typing effect.",
    type: "text",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },

  //  FADING (6)
  {
    id: "fade-out",
    title: "Fade Out",
    category: "Fading",
    duration: "0.6s",
    keyframes: `@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}`,
    css: `animation: fade-out 0.6s ease forwards;`,
    desc: "Basic fade out.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
  {
    id: "pulse-fade",
    title: "Pulse Fade",
    category: "Fading",
    duration: "1.5s",
    keyframes: `@keyframes pulse-fade {
  0%,100% { opacity: 1; }
  50% { opacity: 0.4; }
}`,
    css: `animation: pulse-fade 1.5s ease infinite;`,
    desc: "Breathing opacity effect.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },

  //  ROTATING (6)
  {
    id: "spin",
    title: "Spin",
    category: "Rotating",
    duration: "1s",
    keyframes: `@keyframes spin {
  to { transform: rotate(360deg); }
}`,
    css: `animation: spin 1s linear infinite;`,
    desc: "Continuous rotation.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
  {
    id: "flip-rotate",
    title: "Flip Rotate",
    category: "Rotating",
    duration: "1.2s",
    keyframes: `@keyframes flip-rotate {
  0% { transform: rotateY(0); }
  100% { transform: rotateY(360deg); }
}`,
    css: `animation: flip-rotate 1.2s ease infinite;`,
    desc: "3D spin.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },

  //  BOUNCING (6)
  {
    id: "bounce",
    title: "Bounce",
    category: "Bouncing",
    duration: "1s",
    keyframes: `@keyframes bounce {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}`,
    css: `animation: bounce 1s ease infinite;`,
    desc: "Classic bounce.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
  {
    id: "soft-bounce",
    title: "Soft Bounce",
    category: "Bouncing",
    duration: "1.4s",
    keyframes: `@keyframes soft-bounce {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}`,
    css: `animation: soft-bounce 1.4s ease infinite;`,
    desc: "Gentle bounce.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },

  //  LOADER (6)
  {
    id: "spinner",
    title: "Spinner",
    category: "Loader",
    duration: "1s",
    keyframes: `@keyframes spinner {
  to { transform: rotate(360deg); }
}`,
    css: `animation: spinner 1s linear infinite;`,
    desc: "Basic loader.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
  {
    id: "dots-loader",
    title: "Dots Loader",
    category: "Loader",
    duration: "1.2s",
    keyframes: `@keyframes dots-loader {
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.4); }
}`,
    css: `animation: dots-loader 1.2s ease infinite;`,
    desc: "Dot pulsing loader.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },

  //  SLIDING (5)
  {
    id: "slide-left",
    title: "Slide Left",
    category: "Sliding",
    duration: "0.6s",
    keyframes: `@keyframes slide-left {
  from { transform: translateX(40px); }
  to { transform: translateX(0); }
}`,
    css: `animation: slide-left 0.6s ease forwards;`,
    desc: "Slide from right.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },

  //  ATTENTION (5)
  {
    id: "shake",
    title: "Shake",
    category: "Attention",
    duration: "0.5s",
    keyframes: `@keyframes shake {
  0%,100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  75% { transform: translateX(6px); }
}`,
    css: `animation: shake 0.5s ease infinite;`,
    desc: "Attention grabber.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
  {
    id: "wiggle",
    title: "Wiggle",
    category: "Attention",
    duration: "0.7s",
    keyframes: `@keyframes wiggle {
  0%,100% { transform: rotate(0); }
  50% { transform: rotate(6deg); }
}`,
    css: `animation: wiggle 0.7s ease infinite;`,
    desc: "Playful rotation.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },

  //  EXIT (4)
  {
    id: "slide-down-out",
    title: "Slide Down Out",
    category: "Exit",
    duration: "0.7s",
    keyframes: `@keyframes slide-down-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(40px); opacity: 0; }
}`,
    css: `animation: slide-down-out 0.7s ease forwards;`,
    desc: "Exit downward.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
  {
    id: "zoom-out",
    title: "Zoom Out",
    category: "Exit",
    duration: "0.6s",
    keyframes: `@keyframes zoom-out {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(0.8); opacity: 0; }
}`,
    css: `animation: zoom-out 0.6s ease forwards;`,
    desc: "Scale exit.",
    type: "box",
    creator: {
      name: "Bilal Malik",
      github: "https://github.com/bilalmlkdev",
      twitter: "https://twitter.com/bilalmlkdev",
    },
  },
];
