import React, { useState } from "react";


export default function PortfolioCard() {

  const projects = [
    {
      id: 1,
      image: "/prototype1.png",
      title: "King of the ring fight",
      description: "A boxing themed campaign website"
    },
    {
      id: 2,
      image: "/prototype2.png",
      title: "Todo App",
      description: "Simple productivity tool"
    },
    {
      id: 3,
      image: "/prototype3.png",
      title: "Weather App",
      description: "Weather dashboard"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () =>
    setActiveIndex((i) => (i + 1) % projects.length);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length);

  const current = projects[activeIndex];

  return (
    <div className="min-h-screen bg-stone-300 flex flex-col items-center justify-center">

      {/* Carousel */}
      <div className="carousel">

        <div
          className="slider-track"
          style={{
            transform: `translateX(-${activeIndex * 60}%)`
          }}
        >

          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`card ${
                index === activeIndex ? "active" : "side"
              }`}
            >
              <img
                src={project.image}
                alt={project.title}
              />
            </div>
          ))}

        </div>

      </div>

      {/* title + description */}
      <div className="text-center text-white mt-6">

        <h2 className="text-xl font-semibold">
          {current.title}
        </h2>

        <p className="text-gray-200">
          {current.description}
        </p>

      </div>

      {/* arrows */}
      <div className="flex gap-10 mt-5 text-white text-xl">

        <button onClick={prev}>
          ←
        </button>

        <button onClick={next}>
          →
        </button>

      </div>

    </div>
  );
}