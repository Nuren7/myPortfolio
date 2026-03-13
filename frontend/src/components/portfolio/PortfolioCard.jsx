import React from 'react'
import { useState } from "react"

import Slider from './Slider';

function PortfolioCard() {
  const projects = [
    {
      id: 1,
      image: "/prototype1.png",
      title: "Portfolio",
      description: "My personal portfolio site"
    },
    {
      id: 2,
      image: "/prototype2.png",
      title: "Todo App",
      description: "A simple todo app"
    },
    {
      id: 3,
      image: "/prototype3.png",
      title: "Weather App",
      description: "Weather forecast application"
    }
  ];

  const [activeIndex ,setActiveIndex] = useState(0)

  const next = () => {
    setActiveIndex(i => (i + 1) % projects.length)
  }
  const prev = () => {
    setActiveIndex(i => (i - 1 + projects.length) % projects.length)
  }

  const currentProject = projects[activeIndex]

  return (
    <div>

      <button onClick={prev}>prev</button>

      <Slider 
        projects={projects}
        activeIndex={activeIndex}
      />

      <button  onClick={next}>next</button>

      <div>
         <h2>
        {currentProject.title}
      </h2>
      <p>
        {currentProject.description}
      </p>
      </div>

    </div>

  )
}

export default PortfolioCard