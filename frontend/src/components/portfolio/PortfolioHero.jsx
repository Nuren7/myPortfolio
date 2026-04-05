import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PortfolioHero() {
  /* backend */
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("http://localhost:3000/api/projects");
      const data = await res.json();

      const grouped = {
        frontend: [],
        fullstack: [],
        backend: []
      }
      data.forEach(project => {
        if (grouped[project.type]) {
          grouped[project.type].push(project);
        }
      });
      setProjects(grouped);
    };
    fetchProjects();
  }, []);



  const [activeWindow, setActiveWindow] = useState(null);

 
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
          <span className='font-pixelify font-bold'>Frontend</span>
        </button>

        <button onClick={() => setActiveWindow('fullstack')} className="icon-button">
          <img src="./fullstack.png" alt="fullstack" />
          <span className='font-pixelify font-bold'>Fullstack</span>
        </button>

        <button onClick={() => setActiveWindow('backend')} className="icon-button">
          <img src="./backend.png" alt="backend" />
          <span className='font-pixelify font-bold'>Backend</span>
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

              <div className="hover:scale-110 window-controls">
                <button onClick={() => setActiveWindow(null)}>✕</button>
              </div>
            </div>

            {/* CONTENT */}
            {projects && activeWindow && (
            <div className="window-content folder-container">
              {projects[activeWindow]?.map(({ name, link }) => (
                <a 
                  href={link} 
                  key={name} 
                  className="folder-item" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <img src="./folder_icon.png" alt="Folder Icon" />
                  <span className='font-pixelify'>{name}</span>
                </a>
              ))}
             
            </div>
            )}

          </div>
        </div>
      )}
            {/* TASKBAR */}
      <div className="animate-slide-In-Up taskbar">

          {/* START BUTTON */}
          <Link to="/" className="start-button">
            <img src="./windows_logo.png" alt="start" />
            <span className='font-pixelify hover:scale-110'>Start</span>
          </Link>

          {/* CLOCK */}
          <div className="taskbar-clock font-pixelify">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>

        </div>

    </div>
  );
}

export default PortfolioHero;