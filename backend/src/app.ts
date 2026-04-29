import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import { config } from "./config";

const app = express();

/* CORS */
app.use(
  cors({
    origin: [config.clientUrl, "http://localhost:5173"],
    credentials: true,
  })
);

/*MIDDLEWARE */
app.use(express.json());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/*ROUTES*/
app.use("/api", authRoutes);
app.use("/api/projects", projectRoutes);

/*HEALTH CHECK*/
app.get("/", (_req, res) => {
  res.send("API running");
});

/*GLOBAL ERROR HANDLER*/
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;