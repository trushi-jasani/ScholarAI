import { useEffect, useState } from "react";
import ScholarshipCard from "../components/ScholarshipCard";

export default function Scholarships({ user }) {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        let res;
        if (user) {
          // Fetch ALL scholarships but with AI SCORES for logged in user
          res = await fetch("http://localhost:5000/api/scholarships/all-scored", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
              email: user.email,
              name: user.name,
              income: user.income,
              category: user.category,
              course: user.course,
              education_level: user.education_level,
              gpa: user.gpa
            })
          });
        } else {
          // Guest mode: fetch standard list
          res = await fetch("http://localhost:5000/api/scholarships");
        }

        const data = await res.json();
        if (Array.isArray(data)) setScholarships(data);
        else if (data.rows) setScholarships(data.rows);
        else setScholarships([]);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchScholarships();
  }, [user]);

  return (
    <div className="dashboard animate-fade-in">
      <h2 className="section-title">All Scholarships</h2>
      <p className="section-subtitle">Explore a comprehensive database of global funding opportunities.</p>

      <div className="card-grid">
        {scholarships.length > 0 ? (
          scholarships.map(s => (
            <ScholarshipCard key={s.id} s={s} user={user} />
          ))
        ) : (
          <p>No scholarships found.</p>
        )}
      </div>
    </div>
  );
}
