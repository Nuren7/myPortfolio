import { useEffect, useState } from "react";


function Admin() {
  // eslint-disable-next-line no-unused-vars
  const [projects, setProjects] = useState([]);
  const [grouped, setGrouped] = useState({
    frontend: [],
    fullstack: [],
    backend: [],
  });

  const [editMode, setEditMode] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const token = localStorage.getItem("token");

  const emptyProject = {
    name: "",
    link: "",
    description: "",
    type: "frontend",
  };

  const [formData, setFormData] = useState(emptyProject);

  /* GROUP PROJECTS */
  const groupProjects = (data) => {
    const groupedData = {
      frontend: [],
      fullstack: [],
      backend: [],
    };

    data.forEach((p) => {
      if (groupedData[p.type]) {
        groupedData[p.type].push(p);
      }
    });

    setGrouped(groupedData);
  };

  /* FETCH */
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/projects");
      const data = await res.json();

      setProjects(data);      
      groupProjects(data);      
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, []);

  /* OPEN EDIT */
  const handleEditClick = (project) => {
    setActiveProject(project);
    setFormData({
      name: project.name || "",
      link: project.link || "",
      description: project.description || "",
      type: project.type || "frontend",
    });
    setIsAdding(false);
    setShowModal(true);
  };

  /* OPEN ADD */
  const handleAddClick = () => {
    setFormData(emptyProject);
    setIsAdding(true);
    setShowModal(true);
  };

  /* SAVE (ADD OR EDIT) */
  const handleSave = async () => {
    try {
      const url = isAdding
        ? "http://localhost:3000/api/projects"
        : `http://localhost:3000/api/projects/${activeProject.id}`;
      const method = isAdding ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Save failed:", data);
        alert(data.error || "Save failed");
        return;
      }

      setShowModal(false);
      setFormData(emptyProject);
      setActiveProject(null);

      fetchProjects();
    } catch (err) {
      console.error("Save error:", err);
      alert("Unable to save project. Check console for details.");
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Delete failed:", data);
        alert(data.error || "Delete failed");
        return;
      }

      fetchProjects();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Unable to delete project. Check console for details.");
    }
  };

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="admin-header">
        <h1 className="font-pixelify">Admin Panel</h1>

        <div className="flex gap-3">
          {editMode ? (
            <span className="font-pixelify text-red-500">Edit Mode</span>
          ) : (
            <span className="font-pixelify text-green-500">View Mode</span>
          )}
          <button className="cursor-pointer hover:scale-110 gap-2" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Exit" : "Edit"}
          </button>

          <button className="cursor-pointer hover:scale-110" onClick={handleAddClick}>Add</button>
        </div>
      </div>

      {/* PROJECT ROWS */}
      {["frontend", "fullstack", "backend"].map((type) => (
        <div key={type} className="project-row">
          <h2 className="row-title">{type}</h2>

          <div className="row-content">
            {grouped[type]?.map((project) => (
              <div key={project.id} className="project-card cursor-pointer hover:scale-105">
                <img src="./folder_icon.png" alt="folder" />
                <span>{project.name}</span>

                {editMode && (
                  <div className="actions">
                    <button className="cursor-pointer hover:scale-110" onClick={() => handleEditClick(project)}>
                      ✎
                    </button>
                    <button className="cursor-pointer hover:scale-110" onClick={() => handleDelete(project.id)}>
                      🗑
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* MODAL */}
      {showModal && (
        <div className="window-overlay">
          <div className="retro-window">

            {/* HEADER */}
            <div className="window-header window-controls">
              <span>
                {isAdding ? "Add Project" : "Edit Project"}
              </span>
              <button className="cursor-pointer hover:scale-110" onClick={() => setShowModal(false)}>✕</button>
            </div>

            {/* CONTENT */}
            <div className="window-content modal-form">

              <input
                placeholder="Title"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                placeholder="Link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />

              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              >
                <option value="frontend">Frontend</option>
                <option value="fullstack">Fullstack</option>
                <option value="backend">Backend</option>
              </select>

              {/* BUTTONS */}
              <div className="modal-buttons">
                <button  className="cursor-pointer hover:scale-110 border-2" onClick={handleSave}>Done</button>

                <button
                  className="cursor-pointer hover:scale-110 border-2"
                  onClick={() => {
                    setShowModal(false);
                    setFormData(emptyProject);
                    setActiveProject(null);
                  }}
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;