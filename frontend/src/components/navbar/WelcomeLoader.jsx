import React from 'react';
import {useState, useEffect} from 'react'

function WelcomeLoader({active, pageName}) {
  const greetings = pageName === "Home" ? ["Hello", "As-salamu alaykum", "welcome", pageName] : 
  [pageName];
  const [index, setindex] = useState(0);

    useEffect(() => {
      if (!active) return;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setindex(0);

      const interval = setInterval(() => {
        setindex((prev) => {
          if (prev >= greetings.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 150);

      return () =>  clearInterval(interval);

    }, [active, greetings.length]);


  return (
    <div className={`
    fixed inset-0 z-50 flex items-center justify-center
    bg-black text-4xl text-white font-bold
    transition-opacity duration-500 ease-out pointer-events-none
    ${active ? "opacity-100" : "opacity-0"}
    `}
    >
      <h1>{greetings[index]}</h1>

    </div>
  )
} 


export default WelcomeLoader