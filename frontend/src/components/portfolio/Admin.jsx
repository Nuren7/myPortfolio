import { useEffect, useState } from "react";
import { apiFetch } from "../../config/api";

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

  /* FETCH (GET) */
  const fetchProjects = async () => {
    try {
      const data = await apiFetch("/projects");

      setProjects(data);
      groupProjects(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
     
    fetchProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  /* SAVE (POST / PUT) */
  const handleSave = async () => {
    try {
      const endpoint = isAdding
        ? "/projects"
        : `/projects/${activeProject.id}`;

      const method = isAdding ? "POST" : "PUT";

      await apiFetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      setShowModal(false);
      setFormData(emptyProject);
      setActiveProject(null);

      fetchProjects();
    } catch (err) {
      console.error("Save error:", err);
      alert("Unable to save project.");
    }
  };

  /* DELETE */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await apiFetch(`/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProjects();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Unable to delete project.");
    }
  };

  return (
    <div className="admin-container w-full min-h-screen bg-stone-300">
      {/* HEADER */}
      <div className="admin-header">
        <h1 className="font-pixelify">Admin Panel</h1>

        <div className="flex gap-3">
          {editMode ? (
            <span className="font-pixelify text-red-500">Edit Mode</span>
          ) : (
            <span className="font-pixelify text-green-500">View Mode</span>
          )}
          <button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Exit" : "Edit"}
          </button>

          <button onClick={handleAddClick}>Add</button>
        </div>
      </div>

      {/* PROJECT ROWS */}
      {["frontend", "fullstack", "backend"].map((type) => (
        <div key={type} className="project-row">
          <h2 className="row-title">{type}</h2>

          <div className="row-content">
            {grouped[type]?.map((project) => (
              <div key={project.id} className="project-card">
                <img src="/folder_icon.png" alt="folder" />
                <span>{project.name}</span>

                {editMode && (
                  <div className="actions">
                    <button onClick={() => handleEditClick(project)}>
                      ✎
                    </button>
                    <button onClick={() => handleDelete(project.id)}>
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
            <div className="window-header window-controls">
              <span>{isAdding ? "Add Project" : "Edit Project"}</span>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

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

              <div className="modal-buttons">
                <button onClick={handleSave}>Done</button>

                <button
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