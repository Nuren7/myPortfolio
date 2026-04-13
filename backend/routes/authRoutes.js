const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db/db");

router.post("/admin-login", async (req, res) => {
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

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/admin-check", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(403).json({ success: false });
  }
});

module.exports = router;
