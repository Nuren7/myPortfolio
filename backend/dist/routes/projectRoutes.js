"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db/db");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
/* GET */
router.get("/", async (_, res) => {
    const result = await db_1.pool.query("SELECT * FROM projects ORDER BY id DESC");
    res.json(result.rows);
});
/* CREATE */
router.post("/", authMiddleware_1.checkAdmin, async (req, res) => {
    const { name, link, description, type } = req.body;
    const result = await db_1.pool.query("INSERT INTO projects (name, link, description, type) VALUES ($1,$2,$3,$4) RETURNING *", [name, link, description, type]);
    res.json(result.rows[0]);
});
/* UPDATE */
router.put("/:id", authMiddleware_1.checkAdmin, async (req, res) => {
    const { id } = req.params;
    const { name, link, description, type } = req.body;
    const result = await db_1.pool.query("UPDATE projects SET name=$1, link=$2, description=$3, type=$4 WHERE id=$5 RETURNING *", [name, link, description, type, id]);
    res.json(result.rows[0]);
});
/* DELETE */
router.delete("/:id", authMiddleware_1.checkAdmin, async (req, res) => {
    await db_1.pool.query("DELETE FROM projects WHERE id=$1", [req.params.id]);
    res.json({ success: true });
});
exports.default = router;
