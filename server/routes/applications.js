import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, scholarship_id } = req.body;

  const result = await pool.query(
    "INSERT INTO applications (user_id, scholarship_id, status) VALUES ($1,$2,'Applied') RETURNING *",
    [user_id, scholarship_id]
  );

  res.json(result.rows[0]);
});

router.get("/:userId", async (req, res) => {
  const result = await pool.query(
    `SELECT s.name, a.status, s.deadline
     FROM applications a
     JOIN scholarships s ON a.scholarship_id = s.id
     WHERE a.user_id = $1`,
    [req.params.userId]
  );

  res.json(result.rows);
});

export default router;
