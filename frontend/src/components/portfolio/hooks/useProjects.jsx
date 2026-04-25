import { useEffect, useState } from "react";

export function useProjects() {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:3000/projects");
        const data = await res.json();

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