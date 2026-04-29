"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db/db");
const config_1 = require("../config");
const router = express_1.default.Router();
/* LOGIN */
router.post("/admin-login", async (req, res) => {
    const { password } = req.body;
    const result = await db_1.pool.query("SELECT * FROM admins LIMIT 1");
    if (!result.rows.length) {
        return res.status(404).json({ success: false });
    }
    const admin = result.rows[0];
    const match = await bcrypt_1.default.compare(password, admin.password);
    if (!match) {
        return res.status(401).json({ success: false });
    }
    const token = jsonwebtoken_1.default.sign({}, config_1.config.jwtSecret, { expiresIn: "1h" });
    res.json({ success: true, token });
});
exports.default = router;
