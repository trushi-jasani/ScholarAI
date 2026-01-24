export default function ScholarshipCard({ s, user }) {
  const daysLeft = Math.ceil(
    (new Date(s.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const apply = async () => {
    await fetch("http://localhost:5000/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        scholarship_id: s.id
      })
    });

    alert("Application submitted!");
  };

  return (
    <div className="card">
      <h3>{s.name}</h3>
      <p>Match Score: {s.matchscore}%</p>

      <div className={`deadline ${daysLeft <= 7 ? "red" : "green"}`}>
        {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"}
      </div>

      <div className="ai-box">
        🤖 {s.ai_reason}
      </div>

      <button onClick={apply}>Apply</button>
    </div>
  );
}
