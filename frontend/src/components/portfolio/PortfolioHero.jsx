import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PortfolioHero() {

  const [projects, setProjects] = useState({});
  const [activeWindow, setActiveWindow] = useState(null);

 const [password, setPassword] = useState("");
 const [isAuthenticated, setIsAuthenticated] = useState(
  !!localStorage.getItem("token")
  );

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

 /* FETCH */
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("http://localhost:3000/api/projects");
      const data = await res.json();

      const grouped = {
        frontend: [],
        fullstack: [],
        backend: []
      };

      data.forEach(project => {
        if (grouped[project.type]) {
          grouped[project.type].push(project);
        }
      });

      setProjects(grouped);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
  const verifyAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/admin-check", {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();

      setIsAuthenticated(data.success);
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    }
  };

  verifyAuth();
}, []);

/* DRAG */
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

/* Login */
  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Wrong password")
      setPassword("");
    }
  };

  /* Logout */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setActiveWindow(null);
  }

  /* UI */
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

      {/* ADMIN BUTTON */}
      <button
        onClick={() => setActiveWindow('admin')}
        className="admin-icon-button">
        <img src="./admin.png" alt="admin" />
          <span className='font-pixelify font-bold'>Admin</span>
      </button>

      {/* ADMIN CONTROLS */}
        {isAuthenticated && (
          <Link 
          to="/admin"
           className='token-icon-button'>
            <img src="./token.png" alt="token" />
              <span className='font-pixelify font-bold'>Token</span>
          </Link>
        )}

      {/* WINDOW */}
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

            {/* HEADER */}
            <div
              className="window-header"
              onMouseDown={handleMouseDown}
            >
              <span>
                {activeWindow === 'admin'
                  ? 'Admin Login'
                  : `${activeWindow} Projects`}
              </span>
              
              <div className="flex items-center gap-2">
                <div className="hover:scale-110 window-controls">
                  <button onClick={() => setActiveWindow(null)}>✕</button>
                </div>
              </div>

            </div>

            {/* CONTENT */}
            <div className="window-content">

              {/* ADMIN VIEW */}
              {activeWindow === 'admin' ? (
                <div>
                  {!isAuthenticated ? (
                    <div className='flex gap-4'>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className='font-pixelify'
                      />
                      <button 
                        className="font-pixelify hover:scale-110 cursor-pointer border px-2 py-1" 
                        onClick={handleLogin}>
                        Login
                      </button>
                    </div>
                  ) : (
                    <div className='font-pixelify'>
                      <p>Welcome Admin 👤 </p>
                      <p>Here is your token ꄗ!</p>
                      <p>Click the token icon to access the admin panel</p>
                      <p>Or else, click the logout button</p>
                      <button 
                        className="font-pixelify hover:scale-110 cursor-pointer border px-2 py-1" 
                        onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* PROJECTS VIEW */
                <div className="folder-container">
                  {projects[activeWindow]?.map(({ name, link }) => (
                    <a
                      href={link}
                      key={name}
                      className="folder-item font-pixelify"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="./folder_icon.png" alt="Folder" />
                      <span>{name}</span>
                    </a>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* TASKBAR */}
      <div className="taskbar animate-slide-In-Up">
        <Link to="/" className="start-button">
          <img src="./windows_logo.png" alt="start" />
          <span className='hover:scale-110 font-pixelify font-bold'>Start</span>
        </Link>

        <div className="taskbar-clock font-pixelify">
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>

    </div>
  );
}

export default PortfolioHero;