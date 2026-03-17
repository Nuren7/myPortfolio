import React, { useState } from "react";

function PortfolioHero() {
  const [active, setActive] = useState("fullstack");
  const [prev, setPrev] = useState(null);

  const handleHover = (type) => {
    if (type !== active) {
      setPrev(active);
      setActive(type);
    }
  };

  const images = {
    frontend: "/prototype1.png",
    fullstack: "/prototype2.png",
    backend: "/prototype3.png",
  };

  return (
    <div className="hero">

      <div className="hero-image-wrapper">
        {prev && (
          <img
            src={images[prev]}
            className="hero-image slide-out"
            alt=""
          />
        )}

        <img
          key={active}
          src={images[active]}
          className="hero-image slide-in"
          alt=""
        />
      </div>

     
      <div className="hero-buttons">
        <div
          onMouseEnter={() => handleHover("frontend")}
          className={`hero-btn ${active === "frontend" ? "active" : ""}`}
        >
          Frontend
        </div>

        <div
          onMouseEnter={() => handleHover("fullstack")}
          className={`hero-btn ${active === "fullstack" ? "active" : ""}`}
        >
          Fullstack
        </div>

        <div
          onMouseEnter={() => handleHover("backend")}
          className={`hero-btn ${active === "backend" ? "active" : ""}`}
        >
          Backend
        </div>
      </div>
    </div>
  );
}

export default PortfolioHero;