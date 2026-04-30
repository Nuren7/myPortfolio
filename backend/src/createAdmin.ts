import bcrypt from "bcrypt";
import { pool } from "./db/db";

async function createAdmin(password: string) {
  try {
    console.log("Creating admin...");

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO admins (password_hash) VALUES ($1)",
      [hash]
    );

    console.log("Admin created");
  } catch (err) {
    console.error("Failed to create admin:", err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

createAdmin("karina127");