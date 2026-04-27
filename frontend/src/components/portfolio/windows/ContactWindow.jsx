import { useState } from "react";
import { useDraggable } from "../hooks/useDraggable";
import RetroWindow from "../windows/RetroWindow";

function ContactWindow() {
  const [openedWindow, setOpenedWindow] = useState(null);
  const { position, handlers } = useDraggable();

  return (
    <div className="folder-container">

      {/* CV LINKS */}
      <a href="/cv.pdf" download className="folder-item">
        <img src="./CV.png" alt="cv_sv" />
        <span className="font-pixelify font-bold">CV_SV</span>
      </a>

      <a href="/cv.pdf" download className="folder-item">
        <img src="./CV.png" alt="cv_eng" />
        <span className="font-pixelify font-bold">CV_ENG</span>
      </a>

      {/* SOCIALS BUTTON */}
      <button
        onClick={() => setOpenedWindow("socials")}
        className="folder-item"
      >
        <img src="./socials.png" alt="socials" />
        <span className="font-pixelify font-bold">Socials</span>
      </button>

      {/* WINDOW */}
      {openedWindow === "socials" && (
        <RetroWindow
          title="Socials"
          onClose={() => setOpenedWindow(null)}
          position={position}
          dragHandlers={handlers}
          noOverlay={true}
        >
          <div className="folder-container">

            {/* EXTERNAL LINKS */}
            <a
              href="https://github.com/Nuren7"
              target="_blank"
              rel="noreferrer"
              className="folder-item"
            >
              <img src="./github.png" alt="github" />
              <span className="font-pixelify font-bold">Github</span>
            </a>

            <a
              href="https://www.linkedin.com/in/nuren-islam/"
              target="_blank"
              rel="noreferrer"
              className="folder-item"
            >
              <img src="./linkedin.png" alt="linkedin" />
              <span className="font-pixelify font-bold">LinkedIn</span>
            </a>

          </div>
        </RetroWindow>
      )}
    </div>
  );
}

export default ContactWindow;