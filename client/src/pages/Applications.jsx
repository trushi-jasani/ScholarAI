import { useEffect, useState } from "react";

export default function Applications({ user }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/applications/${user.id}`)
      .then(res => res.json())
      .then(setApps);
  }, [user]);

  return (
    <div className="dashboard">
      <h2>My Applications</h2>

      {apps.length === 0 && <p>No applications yet.</p>}

      {apps.map((a, i) => (
        <div key={i} className="card">
          <h3>{a.name}</h3>
          <p>Status: {a.status}</p>
        </div>
      ))}
    </div>
  );
}
