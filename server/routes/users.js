import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  const { name, email, password, income, category, course, state } = req.body;

  try {
    const user = await pool.query(
      `INSERT INTO users (name,email,password,income,category,course,state)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [name, email, password, income, category, course, state]
    );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2",
    [email, password]
  );

  if (user.rows.length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json(user.rows[0]);
});

export default router;
