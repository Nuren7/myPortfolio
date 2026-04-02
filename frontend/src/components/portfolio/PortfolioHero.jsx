import React, { useState } from 'react';

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

  return (
    <div className="hero-container">

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
        <div className="window-overlay">

          <div className="retro-window">

            {/* TITLE BAR */}
            <div className="window-header">
              <span className="window-title">
                {activeWindow === 'frontend' && 'Frontend Projects'}
                {activeWindow === 'fullstack' && 'Fullstack Projects'}
                {activeWindow === 'backend' && 'Backend Projects'}
              </span>

              <div className="window-controls">
                <button onClick={() => setActiveWindow(null)}>✕</button>
              </div>
            </div>

            {/* CONTENT: folders */}
            <div className="window-content folder-container">
              {projectsData[activeWindow].map(({ name, link }) => (
                <a href={link} key={name} className="folder-item" target="_blank" rel="noopener noreferrer">
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