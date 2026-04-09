let adminToken = null;

const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const cors = require("cors");
const { Pool } = require("pg");

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "myPortfolio",
  password: "karina127",
  port: 5432,
});

/* ---------------- AUTH ---------------- */

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

    const token = Math.random().toString(36).substr(2);
    adminToken = token;

    res.json({ success: true, token });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------- MIDDLEWARE ---------------- */

const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  console.log("Frontend token:", token);
  console.log("Server token:", adminToken);

  if (token !== adminToken) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
};

/* ---------------- GET ---------------- */

app.get("/api/projects", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

/* ---------------- CREATE ---------------- */

app.post("/api/projects", checkAdmin, async (req, res) => {
  try {
    const { name, link, description, type } = req.body;

    if (!name || !link || !description || !type) {
      return res.status(400).json({ error: "All fields required" });
    }

    const result = await pool.query(
      "INSERT INTO projects (name, link, description, type) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, link, description, type]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------- UPDATE ---------------- */

app.put("/api/projects/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, link, description, type } = req.body;

    if (!name || !link || !description || !type) {
      return res.status(400).json({ error: "All fields required" });
    }

    const result = await pool.query(
      "UPDATE projects SET name=$1, link=$2, description=$3, type=$4 WHERE id=$5 RETURNING *",
      [name, link, description, type, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------- DELETE ---------------- */

app.delete("/api/projects/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM projects WHERE id=$1", [id]);

    res.json({ success: true });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------- SERVER ---------------- */

app.listen(3000, () => {
  console.log("Server running on port 3000");
});