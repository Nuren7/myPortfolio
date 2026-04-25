function ProjectsWindow({ projects }) {
  return (
    <div className="folder-container">
      {projects?.map(({ name, link }) => (
        <a
          key={name}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="folder-item"
        >
          <img src="./folder_icon.png" />
          <span className="font-pixelify">{name}</span>
        </a>
      ))}
    </div>
  );
}

export default ProjectsWindow;