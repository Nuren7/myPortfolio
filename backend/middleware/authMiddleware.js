let adminToken = null;

const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== adminToken) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  next();
};

const setAdminToken = (token) => {
  adminToken = token;
};

module.exports = { checkAdmin, setAdminToken };