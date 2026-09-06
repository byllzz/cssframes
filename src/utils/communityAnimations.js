// src/utils/communityAnimations.js
//
// Community-created animations, persisted locally in the browser.
// This replaced an earlier json-server backend that had to run as a
// separate process and was never actually deployed — every "created"
// animation disappeared on refresh in production. localStorage gives
// every visitor genuine, working persistence with zero infrastructure.

const STORAGE_KEY = 'cssframes_community_animations';

export function getStoredCommunityAnimations() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read community animations:', err);
    return [];
  }
}

export function saveCommunityAnimation(animation) {
  const existing = getStoredCommunityAnimations();
  const withId = {
    ...animation,
    id: animation.id || `community-${Date.now()}`,
    isCommunity: true,
  };
  const updated = [withId, ...existing];

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save community animation:', err);
  }

  return withId;
}
