let adminToken = null;

const express = require("express")

const app = express()

const bcrypt = require("bcrypt");
app.use(express.json());

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

/* Post */
app.post("/api/admin-login", async (req, res) => {
  try {
    const { password } = req.body;

    const result = await pool.query("SELECT * FROM admins LIMIT 1");

    if (result.rows.length === 0) {
      return res.json({ success: false });
    }

    const admin = result.rows[0];

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.json({ success: false });
    }
  const token = Math.random ().toString(36).substr(2);

  adminToken = token;

  res.json({ success: true, token });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/* GET */

app.get("/api/projects", async (req, res) => {
  try {
  const result = await pool.query("SELECT * FROM projects") 
  res.json(result.rows) 
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ error: "Server Error" })
  }
})

app.get("/api/admin-check", async (req, res) => {
  const token = req.headers.authorization;

  if (token !== adminToken) {
    return res.status(403).json({ success: false });
  }

    res.json({ success: true });
})


app.listen(3000, () => {
  console.log("Server running on port 3000")
})