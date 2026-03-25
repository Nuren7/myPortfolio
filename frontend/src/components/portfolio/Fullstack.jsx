import React, { useState } from 'react';

function Fullstack() {
  const projects = [
    {
      id: 1,
      image: "/frontend.png",
      title: "King of the ring fight",
      description: "A boxing themed campaign website"
    },
    {
      id: 2,
      image: "/fullstack.png",
      title: "Todo App",
      description: "Simple productivity tool"
    },
    {
      id: 3,
      image: "/backend.png",
      title: "Weather App",
      description: "Weather dashboard"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () =>
    setActiveIndex((i) => (i + 1) % projects.length);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <div className="flex flex-col">

      <section>

        <div className="flex w-full items-start justify-between gap-10 pt-10">

        <div className='ml-36'>
          <div className="carousel flex flex-col items-center">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="card">
                  <img
                    src={project.image}
                    alt={project.title}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-50 mt-1">
            <button onClick={prev} className="cursor-pointer text-2xl">
              ←
            </button>
            <button onClick={next} className="cursor-pointer text-2xl">
              →
            </button>
          </div>
        </div>

        <div className="pr-55 pt-20">
          <h3 className="project-title">
            Full <br /> <div className='translate-y-[-50%] translate-x-[40%]'>stack</div>
          </h3>
        </div>

       </div>
        </section>
      
          <section className='flex items-center justify-center w-full'>

      <div className='grey-dividerFull'/>
      
    </section>


  </div>
  );
}

export default Fullstack;