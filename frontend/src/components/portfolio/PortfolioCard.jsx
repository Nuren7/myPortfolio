import React from 'react'
import { useState } from "react"

function PortfolioCard() {
  const projects = [
    {
      id: 1,
      image: "/images/project1.png",
      title: "Portfolio",
      description: "My personal portfolio site"
    },
    {
      id: 2,
      image: "/images/project2.png",
      title: "Todo App",
      description: "A simple todo app"
    },
    {
      id: 3,
      image: "/images/project3.png",
      title: "Weather App",
      description: "Weather forecast application"
    }
  ];
  const [activeIndex ,setActiveIndex] = useState(0)

  const next = () => {
    setActiveIndex((activeIndex + 1) % projects.length)
  }
  const prev = () => {
    setActiveIndex((activeIndex - 1 + projects.length) % projects.length)
  }

  return (
    <div>

      <button onClick={prev}>prev</button>

      <img src={projects[activeIndex].image} alt={projects[activeIndex].title}/>
      <h2>
        {projects[activeIndex].title}
      </h2>
      <p>
        {projects[activeIndex].description}
      </p>

      <button onClick={next}>next</button>

    </div>

  )
}

export default PortfolioCard