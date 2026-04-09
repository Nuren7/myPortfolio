const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const pool = require("../db/db");
const { setAdminToken, checkAdmin } = require("./middleware/authmiddleware");

/* LOGIN */
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

    const token = Math.random().toString(36).substr(2);
    setAdminToken(token);

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* CHECK */
router.get("/admin-check", checkAdmin, (req, res) => {
  res.json({ success: true });
});

module.exports = router;