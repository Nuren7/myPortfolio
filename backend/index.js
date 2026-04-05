const express = require("express")

const app = express()

const cors = require("cors")
app.use(cors())

const { Pool } = require("pg")

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "myPortfolio",
  password: "karina127",
  port: 5432,
})


app.get("/api/projects", async (req, res) => {
  try {
  const result = await pool.query("SELECT * FROM projects") 
  res.json(result.rows) 
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: "Server Error" })
  }
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})