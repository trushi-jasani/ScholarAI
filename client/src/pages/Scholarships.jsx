import { useEffect, useState } from "react";
import ScholarshipCard from "../components/ScholarshipCard";

export default function Scholarships({ user }) {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/scholarships/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        income: user.income,
        category: user.category,
        course: user.course
      })
    })
      .then(res => res.json())
      .then(setScholarships)
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="dashboard">
      <h2>Recommended Scholarships</h2>

      {scholarships.map(s => (
        <ScholarshipCard key={s.id} s={s} user={user} />
      ))}
    </div>
  );
}
