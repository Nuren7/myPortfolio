import { useEffect, useState } from "react";

import { apiFetch } from "../../../config/api";
import { localProjects } from "../../../data/projects";

const useLocalProjects = import.meta.env.VITE_USE_LOCAL_PROJECTS === "true";

const groupProjects = (data) => {
  const grouped = {
    frontend: [],
    fullstack: [],
    backend: [],
  };

  data.forEach((project) => {
    if (grouped[project.type]) grouped[project.type].push(project);
  });

  return grouped;
};

export function useProjects() {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      if (useLocalProjects) {
        setProjects(groupProjects(localProjects));
        return;
      }

      try {
        const data = await apiFetch("/projects");
        setProjects(groupProjects(data.length > 0 ? data : localProjects));
      } catch (err) {
        console.warn(
          "Using local projects because the API is unavailable.",
          err,
        );
        setProjects(groupProjects(localProjects));
      }
    };

    fetchProjects();
  }, []);

  return projects;
}
