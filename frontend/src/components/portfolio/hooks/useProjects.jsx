import { useEffect, useState } from "react";

import {apiFetch} from "../../../config/api";

export function useProjects() {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiFetch("/projects");

        const grouped = {
          frontend: [],
          fullstack: [],
          backend: []
        };

        data.forEach(p => {
          if (grouped[p.type]) grouped[p.type].push(p);
        });

        setProjects(grouped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  return projects;
}