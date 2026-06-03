import pg from "pg";
import dotEnv from "dotenv";

dotEnv.config();

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const connectDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Database connected!");
    console.log(res.rows[0]);
  } catch (error) {
    console.error("DB connection failed: ", error.message);
  }
};

export default pool;
