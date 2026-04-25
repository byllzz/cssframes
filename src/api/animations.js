// const BASE_URL = 'http://localhost:3001/animations';


// export const getAnimations = async () => {
//   const res = await fetch(BASE_URL);
//   return res.json();
// };

// export const createAnimation = async (animation) => {
//   const res = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(animation),
//   });

//   return res.json();
// };

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/animations`
  : 'http://localhost:3001/animations';

// GET all animations
export const getAnimations = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.json();
};

// POST new animation
export const createAnimation = async (animation) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animation),
  });
  if (!res.ok) throw new Error(`Failed to create: ${res.status}`);
  return res.json();
};
