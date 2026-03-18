const express = require("express")

const app = express()

app.get("/api/test", (req, res) => {
  res.json({ message: "backend working" })
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})