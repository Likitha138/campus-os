const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "campus_os",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testDatabaseConnection() {
  let connection;

  try {
    connection = await pool.getConnection();

    console.log("======================================");
    console.log("✅ MySQL database connected successfully");
    console.log(`📁 Database: ${process.env.DB_NAME || "campus_os"}`);
    console.log("======================================");

    connection.release();

    return true;
  } catch (error) {
    console.error("======================================");
    console.error("❌ MySQL connection failed");
    console.error("======================================");
    console.error(error.message);

    return false;
  }
}

module.exports = {
  pool,
  testDatabaseConnection,
};