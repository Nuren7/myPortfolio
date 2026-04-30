function ProjectsWindow({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="folder-container">
        <p className="font-pixelify">No projects found.</p>
        <p className="font-pixelify">Backend is deployed on Render FREE</p>
        <p className="font-pixelify">And might be deactive due to innactivity</p>
        <p className="font-pixelify">Please contact me trough my socials</p>
      </div>
    );
  }

  return (
    <div className="folder-container">
      {projects.map((project) => (
        <a
          key={project.id || project.name}
          href={project.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="folder-item"
        >
          <img src="/folder_icon.png" alt="folder" />
          <span className="font-pixelify">{project.name}</span>
        </a>
      ))}
    </div>
  );
}

export default ProjectsWindow;