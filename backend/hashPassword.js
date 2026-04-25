const bcrypt = require("bcrypt");
const pool = require("./db/db");

(async () => {
  const password = "karina127"; 
  const hashed = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashed);

  // Insert into database
  try {
    await pool.query(
      "CREATE TABLE IF NOT EXISTS admins (id SERIAL PRIMARY KEY, password TEXT NOT NULL)",
    );
    await pool.query("DELETE FROM admins"); 
    await pool.query("INSERT INTO admins (password) VALUES ($1)", [hashed]);
    console.log("Admin user created successfully");
  } catch (err) {
    console.error("Error creating admin:", err);
  } finally {
    pool.end();
  }
})();
