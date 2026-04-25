require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* ROUTES */
app.use("/", authRoutes);
app.use("/projects", projectRoutes);

/* SERVER */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
