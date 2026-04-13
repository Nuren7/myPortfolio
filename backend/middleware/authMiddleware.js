const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // optional but good practice
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Not admin" });
    }

    req.user = decoded; // attach user info if needed

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = { checkAdmin };