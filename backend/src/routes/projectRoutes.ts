import express from "express";
import { pool } from "../db/db";
import { checkAdmin } from "../middleware/authMiddleware";

const router = express.Router();

/* GET */
router.get("/", async (_, res) => {
  const result = await pool.query("SELECT * FROM projects ORDER BY id DESC");
  res.json(result.rows);
});

/* CREATE */
router.post("/", checkAdmin, async (req, res) => {
  const { name, link, description, type } = req.body;

  const result = await pool.query(
    "INSERT INTO projects (name, link, description, type) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, link, description, type]
  );

  res.json(result.rows[0]);
});

/* UPDATE */
router.put("/:id", checkAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, link, description, type } = req.body;

  const result = await pool.query(
    "UPDATE projects SET name=$1, link=$2, description=$3, type=$4 WHERE id=$5 RETURNING *",
    [name, link, description, type, id]
  );

  res.json(result.rows[0]);
});

/* DELETE */
router.delete("/:id", checkAdmin, async (req, res) => {
  await pool.query("DELETE FROM projects WHERE id=$1", [req.params.id]);
  res.json({ success: true });
});

export default router;