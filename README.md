# 🎓 ScholarAI – Intelligent Scholarship Finder

ScholarAI is a full-stack web application that helps students discover scholarships that truly match their academic and financial profile.  
It combines **strict eligibility filtering**, **automated web scraping**, and **AI-powered SOP generation** into a single platform.

---

## 📌 Problem Statement

Students often miss eligible scholarships due to scattered information, unclear criteria, and lack of guidance in writing SOPs.  
ScholarAI solves this by:
- Collecting scholarship data automatically
- Filtering only **100% eligible** scholarships
- Assisting students with **AI-generated SOPs**

---

## ✨ Key Features

### 🔐 User Authentication
- Register and login system
- Stores academic profile:
  - Income
  - Category
  - Course
  - GPA
- Data persisted using SQLite

---

### 🔍 Strict Scholarship Matching
Scholarships are shown **only if all conditions are satisfied**:

- User income ≤ scholarship income limit  
- User category is allowed  
- Course relevance match  

Eligible scholarships are ranked using:
- Course match score
- AI relevance boost

---

### 📝 AI SOP Generator
- Generates a professional Statement of Purpose
- Personalized using:
  - User profile
  - Selected scholarship details
- Powered by:
  - Google Gemini API
  - OpenAI (fallback)

---

### 🤖 Automated Scholarship Scraper
- Fetches scholarship data from external websites
- Extracts:
  - Scholarship name
  - Income limit
  - Allowed categories
  - Allowed courses
  - Deadline
- Built using:
  - Puppeteer (browser automation)
  - Cheerio (HTML parsing)

---

### 📧 Email Notifications
- Sends email alerts when new matching scholarships are added
- Uses Nodemailer
- Supports Gmail and test mail services

---

## 🏗️ Architecture

The project follows a **Client–Server architecture**:

- **Frontend:** React + Vite  
- **Backend:** Node.js + Express  
- **Database:** SQLite  

---

## 📁 Project Structure

