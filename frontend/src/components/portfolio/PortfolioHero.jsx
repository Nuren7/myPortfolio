import React, { useState, useRef } from 'react';

const projectsData = {
  frontend: [
    { name: 'Portfolio Site', link: '#' },
    { name: 'React Blog', link: '#' },
    { name: 'Landing Page', link: '#' },
  ],
  fullstack: [
    { name: 'E-commerce', link: '#' },
    { name: 'Chat App', link: '#' },
    { name: 'Project Manager', link: '#' },
  ],
  backend: [
    { name: 'API Server', link: '#' },
    { name: 'Auth Service', link: '#' },
    { name: 'Database Design', link: '#' },
  ],
};

function PortfolioHero() {
  const [activeWindow, setActiveWindow] = useState(null);

  // 🔥 Drag state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;

    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  return (
    <div 
      className="hero-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >

      {/* ICONS */}
      <div className="icon-sidebar">
        <button onClick={() => setActiveWindow('frontend')} className="icon-button">
          <img src="./frontend.png" alt="frontend" />
          <span>Frontend</span>
        </button>

        <button onClick={() => setActiveWindow('fullstack')} className="icon-button">
          <img src="./fullstack.png" alt="fullstack" />
          <span>Fullstack</span>
        </button>

        <button onClick={() => setActiveWindow('backend')} className="icon-button">
          <img src="./backend.png" alt="backend" />
          <span>Backend</span>
        </button>
      </div>

      {/* WINDOWS */}
      {activeWindow && (
        <div 
          className="window-overlay"
          onClick={() => setActiveWindow(null)}
        >
          <div 
            className="retro-window"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
          >

            {/* TITLE BAR (DRAG HANDLE) */}
            <div 
              className="window-header"
              onMouseDown={handleMouseDown} 
              style={{ cursor: 'grab' }}
            >
              <span className="window-title">
                {activeWindow === 'frontend' && 'Frontend Projects'}
                {activeWindow === 'fullstack' && 'Fullstack Projects'}
                {activeWindow === 'backend' && 'Backend Projects'}
              </span>

              <div className="window-controls">
                <button onClick={() => setActiveWindow(null)}>✕</button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="window-content folder-container">
              {projectsData[activeWindow].map(({ name, link }) => (
                <a 
                  href={link} 
                  key={name} 
                  className="folder-item" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="./folder_icon.png" alt="Folder Icon" />
                  <span>{name}</span>
                </a>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default PortfolioHero;