"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const config_1 = require("./config");
const app = (0, express_1.default)();
/* CORS */
app.use((0, cors_1.default)({
    origin: [config_1.config.clientUrl, "http://localhost:5173"],
    credentials: true,
}));
/*MIDDLEWARE */
app.use(express_1.default.json());
app.use((req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
/*ROUTES*/
app.use("/api", authRoutes_1.default);
app.use("/api/projects", projectRoutes_1.default);
/*HEALTH CHECK*/
app.get("/", (_req, res) => {
    res.send("API running");
});
/*GLOBAL ERROR HANDLER*/
app.use((err, _req, res, _next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});
exports.default = app;
