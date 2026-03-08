import React from 'react';
import {useState, useEffect, useMemo} from 'react'

function WelcomeLoader({active, pageName}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const greetings = useMemo(() =>  pageName === "Home" ? ["Hello", "As-salamu alaykum", "welcome", pageName] : 
  [pageName]
  );
  const [index, setindex] = useState(0);

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
      }, 300);

      return () =>  clearInterval(interval);

    }, [active, greetings.length]);


  return (
    <div className={`
    fixed inset-0 z-50 flex items-center justify-center
    bg-black
    ${active ? "animate-page-intro" : "animate-page-outro pointer-events-none"}
    `}
    >
    <div className='overflow-hidden'>

      <h1 key={index} className="text-4xl text-stone-200 font-medium font-monteserrat animate-text-in">
        {greetings[index]}
      </h1>

    </div>

    </div>
  )
} 


export default WelcomeLoader