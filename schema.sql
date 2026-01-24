CREATE DATABASE scholarship_finder;
\c scholarship_finder;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  income INT,
  category TEXT,
  course TEXT,
  state TEXT
);

CREATE TABLE scholarships (
  id SERIAL PRIMARY KEY,
  name TEXT,
  income_limit INT,
  category_allowed TEXT[],
  course_allowed TEXT[],
  deadline DATE
);

CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  scholarship_id INT REFERENCES scholarships(id),
  status TEXT
);
INSERT INTO scholarships
(name, income_limit, category_allowed, course_allowed, deadline)
VALUES
('MYSY', 300000, ARRAY['General','OBC','SC','ST'], ARRAY['Engineering'], '2026-09-15'),
('Reliance Foundation UG', 250000, ARRAY['General','OBC'], ARRAY['Engineering'], '2026-08-30'),
('NSDL Shiksha Sahyog', 300000, ARRAY['SC','ST','OBC'], ARRAY['Engineering'], '2026-07-20');
