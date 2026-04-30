"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db/db");
async function createAdmin(password) {
    try {
        console.log("Creating admin...");
        const hash = await bcrypt_1.default.hash(password, 10);
        await db_1.pool.query("INSERT INTO admins (password_hash) VALUES ($1)", [hash]);
        console.log("Admin created");
    }
    catch (err) {
        console.error("Failed to create admin:", err);
    }
    finally {
        await db_1.pool.end();
        process.exit(0);
    }
}
createAdmin("yourPasswordHere");
