const express = require("express");
const router = express.Router();

const pool = require("../db/db");
const { checkAdmin } = require("./middleware/authMiddleware");

/* GET */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY id DESC");
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
});

/* CREATE */
router.post("/", checkAdmin, async (req, res) => {
  try {
    const { name, link, description, type } = req.body;

    if (!name || !link || !description || !type) {
      return res.status(400).json({ error: "All fields required" });
    }

    const result = await pool.query(
      "INSERT INTO projects (name, link, description, type) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, link, description, type],
    );

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

/* UPDATE */
router.put("/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, link, description, type } = req.body;

    const result = await pool.query(
      "UPDATE projects SET name=$1, link=$2, description=$3, type=$4 WHERE id=$5 RETURNING *",
      [name, link, description, type, id],
    );

    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

/* DELETE */
router.delete("/:id", checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM projects WHERE id=$1", [id]);

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
