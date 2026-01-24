export default function Dashboard({ user }) {
  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>Welcome, {user.name} 👋</h1>
        <div className="user-info">
          {user.course} • {user.category} • Income ₹{user.income}
        </div>
      </div>

      {/* OVERVIEW CARDS */}
      <div style={{ marginTop: "30px" }}>
        <div className="card">
          <h3>🎓 Scholarships</h3>
          <p>
            View AI-recommended scholarships based on your profile
            and apply before deadlines.
          </p>
        </div>

        <div className="card">
          <h3>🤖 SOP Assistant</h3>
          <p>
            Get AI-generated SOP structure and guidance for
            scholarship applications.
          </p>
        </div>

        <div className="card">
          <h3>📄 Applications</h3>
          <p>
            Track all your scholarship applications and their
            current status in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
