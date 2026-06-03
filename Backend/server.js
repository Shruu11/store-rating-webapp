import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import pool from "./src/config/database.js";

const PORT = process.env.PORT || 5000;

// Database Connection
try {
  const client = await pool.connect();

  console.log("✅ Database Connected");

  client.release();
} catch (error) {
  console.log("❌ Database Error:", error.message);
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});