import React, { useState } from "react";

export default function PortfolioHero() {
  const [active, setActive] = useState("fullstack");

  const images = [
    { key: "frontend", src: "/frontend.png" },
    { key: "fullstack", src: "/fullstack.png" },
    { key: "backend", src: "/backend.png" },
  ];

  const activeIndex = images.findIndex((img) => img.key === active);

  return (
    <div className="portfolioHero">


      <div className="portfolioHero-imageWrapper">
        <div
          className="portfolioHero-track"
          style={{
            transform: `translateY(-${activeIndex * 320}px)`
          }}
        >
          {images.map((img) => (
            <img
              key={img.key}
              src={img.src}
              alt=""
              className="portfolioHero-image"
            />
          ))}
        </div>
      </div>

      {/* BUTTONS */}
      <div className="portfolioHero-buttons">
        {images.map((img) => (
          <div
            key={img.key}
            onMouseEnter={() => setActive(img.key)}
            className={`portfolioHero-btn ${active === img.key ? "active" : ""}`}
          >
            {img.key}
          </div>
        ))}
      </div>

    </div>
  );
}