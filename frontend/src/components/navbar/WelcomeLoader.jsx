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

  const isPortfolio = pageName === "Portfolio";

  const fontClass = fontMap[pageName] || "font-monteserrat";

  const [index, setIndex] = useState(0);
  const [hasBeenActive, setHasBeenActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const totalBlocks = 20;
  const filledBlocks = Math.round((progress / 100) * totalBlocks);

      useEffect(() => {
      if (!active || !isPortfolio) return;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(0);

      const t1 = setTimeout(() => setProgress(20), 300);
      const t2 = setTimeout(() => setProgress(80), 1200);
      const t3 = setTimeout(() => setProgress(100), 2000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      }
    }, [active, isPortfolio]);

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
    {isPortfolio ? (
      <div className="text-white font-pixelify">
          <div className="flex justify-between text-xl mb-2">
           <p>LOADING...</p>
            <p>{progress}%</p>
        </div>

        <div className="flex gap-1 border-white border-2 p-1 mt-2">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-4 ${
                i < filledBlocks ? "bg-white rounded-xs" : "bg-transparent"
              }`}
            />
          ))}
       </div>
      </div>
      ) : (
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
    )}
    </div>
  );
}

export default WelcomeLoader;