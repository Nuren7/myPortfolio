"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = initDb;
const db_1 = require("./db");
async function initDb() {
    await db_1.pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      password TEXT NOT NULL
    );
  `);
    await db_1.pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      name TEXT,
      link TEXT,
      description TEXT,
      type TEXT
    );
  `);
    console.log("Database ready");
}
