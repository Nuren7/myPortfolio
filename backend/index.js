require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api", authRoutes);
app.use("/api/projects", projectRoutes);

/* SERVER */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});