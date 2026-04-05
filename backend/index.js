const express = require("express")

const app = express()

const projectsData = {
  frontend: [
    { name: 'Portfolio Site', link: '#' },
    { name: 'React Blog', link: '#' },
    { name: 'Landing Page', link: '#' },
  ],
  fullstack: [
    { name: 'E-commerce', link: '#' },
    { name: 'Chat App', link: '#' },
    { name: 'Project Manager', link: '#' },
  ],
  backend: [
    { name: 'API Server', link: '#' },
    { name: 'Auth Service', link: '#' },
    { name: 'Database Design', link: '#' },
  ],
};

app.get("http://localhost:3000/api/projects", (req, res) => {
  res.json(projectsData)
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})