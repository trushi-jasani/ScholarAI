import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  password: "parita31",
  host: "localhost",
  port: 5432,
  database: "scholarship_finder"
});
