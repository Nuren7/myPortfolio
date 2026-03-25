import React from 'react'

import {FaHtml5,FaCss3Alt,FaReact,FaNodeJs, FaAngular, FaVuejs, FaPython, FaGithub, FaDocker} from "react-icons/fa";
import {SiJavascript,SiTypescript,SiTailwindcss,SiMongodb,SiNextdotjs, SiHeroku} from "react-icons/si";

function PortfolioScroll() {
  const skills = [
  <FaHtml5 className="text-[#E34F26]" />,
  <FaCss3Alt />, 
  <SiTailwindcss className="text-[#06B6D4]" />,

  <FaReact />,     
  <FaAngular className="text-[#DD0031]" />,    
  <FaVuejs />,
  <FaGithub className="text-[#181717]" />,   
  <FaDocker />,

  <SiNextdotjs className="text-black dark:text-white" />,
  <FaNodeJs />,  

  <FaPython className="text-[#3776AB]" />,   
  <SiJavascript />,
  <SiTypescript className="text-[#3178C6]" />,  

  <SiHeroku />,

  <SiMongodb className="text-[#47A248]" />,
  ];
  
  return (
    <div className='overflow-hidden w-full bg-transparent pt-22 left-0 z-0 animate-slide-In-Up-Slow'>
      <div className='flex w-max whitespace-nowrap animate-infiniteScroll'>
        <div className='flex text-stone-200 shrink-0 text-[300%] gap-10 items-center'>
          {skills.map((Icon, index) => (
            <span key={index}>{Icon}</span>
          ))}
        </div>
      <div className='flex text-stone-200 shrink-0 text-[300%] gap-10 items-center'>
        {skills.map((Icon, index) => (
          <span key={index}>{Icon}</span>
        ))}
      </div>
        

      </div>
    </div>
  )
}

export default PortfolioScroll