const BASE_URL = 'http://localhost:3001/animations';

// GET all animations
export const getAnimations = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// POST new animation
export const createAnimation = async (animation) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(animation),
  });

  return res.json();
};
