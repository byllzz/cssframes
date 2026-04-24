import React, { useEffect, useState } from 'react';

export default function TopLoader({ isLoading }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      setWidth(0);
      interval = setInterval(() => {
        setWidth((prev) => {
          if (prev >= 90) return prev;
          return prev + 10;
        });
      }, 100);
    } else {
      // Complete the bar when loading stops
      setWidth(100);
      const timeout = setTimeout(() => setWidth(0), 400); // Reset after finish
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  if (width === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[999] pointer-events-none">
      <div
        className="h-[3px] bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-300 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
