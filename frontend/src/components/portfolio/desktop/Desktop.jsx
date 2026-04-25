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
        className="contact-icon-button"
        onClick={() => setActiveWindow("Contact")}
      >
        <img src="./contact.png" />
        <span className="font-pixelify font-bold">Contact</span>
      </button>

      <button
        className="admin-icon-button"
        onClick={() => setActiveWindow("admin")}
      >
        <img src="./admin.png" />
        <span className="font-pixelify font-bold">Admin</span>
      </button>

       {/*TOKEN*/}
        {isAuthenticated && (
        <Link to="/admin" className="token-icon-button">
          <img src="./token.png" />
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
          {activeWindow === "admin" && (
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
    </div>
  );
}

export default Desktop;