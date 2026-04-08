export const animations = [
  {
    id: 'float-anim',
    title: 'Floating',
    category: 'floating',
    duration: '3s',
    keyframes: `
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    `,
    css: '.float { animation: float 3s ease-in-out infinite; }',
    tailwind: 'still not available',
  },

];
