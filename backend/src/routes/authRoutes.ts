import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/db";
import { config } from "../config";

const router = express.Router();

/* LOGIN */
router.post("/admin-login", async (req, res) => {
  const { password } = req.body;

  const result = await pool.query("SELECT * FROM admins LIMIT 1");

  if (!result.rows.length) {
    return res.status(404).json({ success: false });
  }

  const admin = result.rows[0];

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    return res.status(401).json({ success: false });
  }

  const token = jwt.sign({}, config.jwtSecret, { expiresIn: "1h" });

  res.json({ success: true, token });
});

export default router;