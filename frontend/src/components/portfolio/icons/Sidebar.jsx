function Sidebar({ setActiveWindow }) {
  return (
    <div className="icon-sidebar">
        <button onClick={() => setActiveWindow('Frontend')} className="icon-button">
          <img src="./frontend.png" alt="frontend" />
          <span className='font-pixelify font-bold'>Frontend</span>
        </button>

        <button onClick={() => setActiveWindow('Fullstack')} className="icon-button">
          <img src="./fullstack.png" alt="fullstack" />
          <span className='font-pixelify font-bold'>Fullstack</span>
        </button>

        <button onClick={() => setActiveWindow('Backend')} className="icon-button">
          <img src="./backend.png" alt="backend" />
          <span className='font-pixelify font-bold'>Backend</span>
        </button>
    </div>
  );
}

export default Sidebar;