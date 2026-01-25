import express from "express";
import { pool } from "../db.js";
import { getMatchesForUser, triggerMatchNotifications } from "../services/matchingService.js";

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  let { name, email, password, income, category, course, state, education_level, cgpa, gpa } = req.body;

  // Trim inputs
  name = name?.trim();
  email = email?.trim();
  password = password?.trim();

  // Basic validation
  if (!name || !email || !password || !course) {
    return res.status(400).json({
      error: "Missing fields",
      message: "Please provide all required fields (Name, Email, Password, Course)"
    });
  }

  try {
    const userResult = await pool.query(
      `INSERT INTO users (name, email, password, income, category, course, state, education_level, cgpa)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        name,
        email,
        password,
        income ? Number(income) : 0,
        category || 'General',
        course,
        state || '',
        education_level || 'Undergraduate',
        (cgpa || gpa) ? Number(cgpa || gpa) : 0
      ]
    );

    const newUser = userResult.rows[0];

    // Trigger immediate match check and notification
    try {
      const matches = await getMatchesForUser(newUser);
      if (matches.length > 0) {
        console.log(`Initial match notification trigger for new user: ${newUser.email}`);
        await triggerMatchNotifications(newUser, matches);
      }
    } catch (matchErr) {
      console.error("Initial Match Error (Non-blocking):", matchErr.message);
    }

    res.json(newUser);
  } catch (err) {
    console.error("Register Error:", err.message);
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({
        error: "Email already exists",
        message: "Email already exists. Please login instead."
      });
    }
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message
    });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  // Trim inputs
  email = email?.trim();
  password = password?.trim();

  console.log(`Login attempt for: ${email}`);

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1) AND password = $2",
      [email, password]
    );

    if (user.rows.length === 0) {
      console.log(`Login failed for: ${email} - No user found or password mismatch`);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log(`Login successful for: ${email}`);
    res.json(user.rows[0]);
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
