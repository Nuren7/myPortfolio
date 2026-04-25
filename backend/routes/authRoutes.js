const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db/db");

router.post("/admin-login", async (req, res) => {
  try {
    const { password } = req.body;
    console.log("Login attempt with password:", password);

    const result = await pool.query("SELECT * FROM admins LIMIT 1");

    if (result.rows.length === 0) {
      console.log("No admin in db");
      return res.json({ success: false });
    }

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.json({ success: false });
    }

    const token = jwt.sign({ role: "admin" }, "testsecret", {
      expiresIn: "1h",
    });
    console.log("Token created:", token);

    res.json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/admin-check", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("No auth header");
    return res.status(403).json({ success: false });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);
  console.log("Secret:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, "testsecret");
    console.log("Decoded:", decoded);
    if (decoded.role !== "admin") {
      console.log("Not admin");
      return res.status(403).json({ success: false });
    }
    res.json({ success: true });
  } catch (err) {
    console.log("Verify error:", err.message);
    res.status(403).json({ success: false });
  }
});

module.exports = router;
