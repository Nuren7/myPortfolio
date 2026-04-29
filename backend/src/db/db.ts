import { Pool } from "pg";
import { config } from "../config";

const isProd = process.env.NODE_ENV === "production";

export const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});