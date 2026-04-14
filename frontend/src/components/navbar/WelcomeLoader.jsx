import React, { useState, useEffect, useMemo } from 'react';

function WelcomeLoader({ active, pageName }) {

  // Greetings logic
  const greetings = useMemo(() => {
    return pageName === "Home"
      ? ["Hello", "As-salamu alaykum", "welcome", "•" + pageName + "•"]
      : ["•" + pageName + "•"];
  }, [pageName]);

  // Font mapping per page
  const fontMap = {
    Portfolio: "font-pixelify",
    "About me": "font-serif",
    Contact: "font-mono",
    Home: "font-monteserrat",
  };

  const fontClass = fontMap[pageName] || "font-monteserrat";

  const [index, setIndex] = useState(0);
  const [hasBeenActive, setHasBeenActive] = useState(false);
  const [visible, setVisible] = useState(false);

  // Handle visibility (intro/outro)
  useEffect(() => {
    if (active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasBeenActive(true);
      setVisible(true);
    } else if (hasBeenActive) {
      const timer = setTimeout(() => setVisible(false), 800);
      return () => clearTimeout(timer);
    }
  }, [active, hasBeenActive]);

  // Handle greeting animation
  useEffect(() => {
    if (!active) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(0);

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= greetings.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [active, greetings]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-neutral-500
        ${active ? "animate-page-intro" : "animate-page-outro pointer-events-none"}
      `}
    >
      <div className="overflow-hidden">
        <h1
          key={index}
          className={`
            text-4xl text-stone-200 font-light
            ${fontClass}
            animate-text-in
          `}
        >
          {greetings[index]}
        </h1>
      </div>
    </div>
  );
}

export default WelcomeLoader;