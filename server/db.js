import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "*",
  password: "*",
  host: "*",
  port: 0,
  database: "*"
});
