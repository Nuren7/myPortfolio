import React from 'react';
import {useState, useEffect, useMemo} from 'react'

function WelcomeLoader({active, pageName}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const greetings = useMemo(() =>  pageName === "Home" ? ["Hello", "As-salamu alaykum", "welcome", "•"+pageName+"•"] : 
  ["•"+pageName+"•"]
  );
  const [index, setindex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [isMounted, setIsMounted] = useState(false);
  const [hasBeenActive, setHasBeenActive] = useState(false);
  const [visible, setVisible] = useState(false);


    useEffect(() => {
      setIsMounted(true);
    }, []);

    useEffect(() => {
      if (active) {
        setHasBeenActive(true);
        setVisible(true);
      } else if (hasBeenActive) {
        // Start outro, hide after animation
        const timer = setTimeout(() => setVisible(false), 800);
        return () => clearTimeout(timer);
      }
    }, [active, hasBeenActive]);

    useEffect(() => {
      if (!active) return;

      setindex(0);

      const interval = setInterval(() => {
        setindex((prev) => {
          if (prev >= greetings.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 400);

      return () =>  clearInterval(interval);

    }, [active, greetings.length]);


  return (
    visible && (
    <div className={`
    fixed inset-0 z-50 flex items-center justify-center
    bg-neutral-500
    ${active ? "animate-page-intro" : "animate-page-outro pointer-events-none"}
    `}
    >
    <div className='overflow-hidden'>

      <h1 key={index} className="text-4xl text-stone-200 font-light font-monteserrat animate-text-in">
        {greetings[index]}
      </h1>

    </div>

    </div>
    )
  )
} 


export default WelcomeLoader