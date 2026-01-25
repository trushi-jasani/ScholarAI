# -*- coding: utf-8 -*-

import psycopg2
import csv
import os

# -----------------------------
# DB connection (EDIT PASSWORD)
# -----------------------------
conn = psycopg2.connect(
    host="localhost",
    database="scholarship_finder",
    user="ai_user",
    password="ai123"
)

cur = conn.cursor()

# -----------------------------
# Fetch users
# -----------------------------
cur.execute("""
    SELECT income, category, course, cgpa
    FROM users
    WHERE income IS NOT NULL
      AND category IS NOT NULL
      AND course IS NOT NULL
      AND cgpa IS NOT NULL
""")
users = cur.fetchall()

# -----------------------------
# Fetch scholarships
# -----------------------------
cur.execute("""
    SELECT income_limit, category_allowed, course_allowed
    FROM scholarships
""")
scholarships = cur.fetchall()

# -----------------------------
# Output CSV path (same folder)
# -----------------------------
BASE_DIR = os.path.dirname(__file__)
csv_path = os.path.join(BASE_DIR, "training_data.csv")

# -----------------------------
# Generate supervised data
# -----------------------------
with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["cgpa", "income", "category", "course", "eligible"])

    for income, category, course, cgpa in users:
        for income_limit, category_allowed, course_allowed in scholarships:

            eligible = int(
                income <= income_limit
                and category in category_allowed
                and course in course_allowed
            )

            writer.writerow([
                float(cgpa),
                int(income),
                category,
                course,
                eligible
            ])

print("✅ training_data.csv generated successfully")

cur.close()
conn.close()
