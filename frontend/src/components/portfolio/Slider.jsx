import React from "react";

export default function Slider({ projects, activeIndex }) {
  return (
    <div className="w-[900px] h-[420px] overflow-hidden flex items-center">

      <div
        className="flex gap-6 transition-transform duration-500"
        style={{
          transform: `translateX(-${activeIndex * 320}px)`
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex-shrink-0 transition-all duration-500
              ${index === activeIndex
                ? "scale-100 opacity-100"
                : "scale-75 opacity-40"}
            `}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-[600px] h-[360px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

    </div>
  );
}