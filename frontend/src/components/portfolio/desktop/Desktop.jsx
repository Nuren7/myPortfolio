import { useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../icons/Sidebar";
import RetroWindow from "../windows/RetroWindow";
import ProjectsWindow from "../windows/ProjectsWindow";
import AdminWindow from "../windows/AdminWindow";
import ContactWindow from "../windows/ContactWindow";

import { useProjects } from "../hooks/useProjects";
import { useAuth } from "../hooks/useAuth";
import { useDraggable } from "../hooks/useDraggable";

function Desktop() {
  const [activeWindow, setActiveWindow] = useState(null);

  const projects = useProjects();
  const { isAuthenticated, login, logout } = useAuth();
  const { position, handlers } = useDraggable();

  return (
    <div className="hero-container">

      {/* LEFT SIDEBAR */}
      <Sidebar setActiveWindow={setActiveWindow} />

      {/* EXTRA ICONS */}
      <button
        className="icon-base contact-icon-button icon-button"
        onClick={() => setActiveWindow("Contact")}
      >
        <img src="/contact.png" />
        <span className="font-pixelify font-bold">Contact</span>
      </button>

      <button
        className="icon-base admin-icon-button icon-button"
        onClick={() => setActiveWindow("Admin")}
      >
        <img src="/admin.png" />
        <span className="font-pixelify font-bold">Admin</span>
      </button>

       {/*TOKEN*/}
        {isAuthenticated && (
        <Link to="/admin" className="icon-base token-icon-button icon-button">
          <img src="/token.png" />
            <span className="font-pixelify font-bold">Token</span>
        </Link>
        )}

      {/* WINDOWS */}
      {activeWindow && (
        <RetroWindow
          title={activeWindow}
          onClose={() => setActiveWindow(null)}
          position={position}
          dragHandlers={handlers}
        >
          {activeWindow === "Admin" && (
            <AdminWindow
              isAuthenticated={isAuthenticated}
              login={login}
              logout={logout}
            />
          )}


          {activeWindow === "Contact" && <ContactWindow />}

          {["Frontend", "Backend", "Fullstack"].includes(activeWindow) && (
            <ProjectsWindow
              projects={projects[activeWindow.toLowerCase()]}
            />
          )}
        </RetroWindow>
      )}
      
      {/* TASKBAR */}
      <div className="taskbar animate-slide-In-Up">
        <Link to="/" className="start-button">
          <img src="/windows_logo.png" alt="start" />
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

export default Desktop;