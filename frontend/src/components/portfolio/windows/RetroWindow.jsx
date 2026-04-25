function RetroWindow({ title, children, onClose, position, dragHandlers }) {
  return (
    <div
      className="window-overlay"
      onClick={onClose}
      onMouseMove={dragHandlers.onMouseMove}
      onMouseUp={dragHandlers.onMouseUp}
    >
      <div
        className="retro-window"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: `translate(${position.x}px, ${position.y}px)`, zIndex: 1000, background: 'white' }}
      >
        <div
          className="window-header"
          onMouseDown={dragHandlers.onMouseDown}
        >
          <span className="font-pixelify">{title}</span>
          <div className="hover:scale-110 window-controls">
              <button onClick={(onClose)}>✕</button>
          </div>
        </div>

        <div className="window-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default RetroWindow;