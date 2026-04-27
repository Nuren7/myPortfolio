import {useState} from 'react'
import { Link } from 'react-router-dom';


import RetroWindow from "../windows/RetroWindow";

import { useDraggable } from "../hooks/useDraggable";


function ContactWindow() {

  const [openedWindow, setOpenedWindow] = useState(null)
  const { position, handlers } = useDraggable();

  return (
    <div className="folder-container">
      <a href="/cv.pdf" download className="icon-button">
        <img src="./CV.png" alt="cv_sv" />
        <span className="font-pixelify font-bold">CV_SV</span>
      </a>
       <a href="/cv.pdf" download className="icon-button">
        <img src="./CV.png" alt="cv_eng" />
        <span className="font-pixelify font-bold">CV_ENG</span>
      </a>
      <a className='icon-button' onClick={() => setOpenedWindow('socials')}> 
        <img src='socials.png' alt='socials'/>
        <span className='font-pixelify font-bold'>Socials</span>
      </a>
      {openedWindow === "socials" && (
         <RetroWindow
          title={openedWindow}
          onClose={() => setOpenedWindow(null)}
          position={position}
          dragHandlers={handlers}>
            
          <div className='folder-container'>

            <Link to="https://github.com/Nuren7" className='icon-button'>
              <img src='./github.png' alt='github'/>
              <span className='font-pixelify font-bold'>Github</span>
            </Link>
            
            <Link to="https://www.linkedin.com/in/nuren-islam/" className='icon-button'>
              <img src='./linkedin.png' alt='linkedin'/>
              <span className='font-pixelify font-bold'>Linkedin</span>
            </Link>

          </div>

        </RetroWindow>
      ) }
    </div>
  );
}

export default ContactWindow;