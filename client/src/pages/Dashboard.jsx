import { Link } from "react-router-dom";

export default function Dashboard({ user }) {
  return (
    <div className="dashboard animate-fade-in">
      <header style={{ marginBottom: '40px' }}>
        <h1 className="section-title">Welcome back, {user.name} 👋</h1>
        <p className="section-subtitle">
          {user.course} • {user.category} Student • Income ₹{user.income?.toLocaleString()}
        </p>
      </header>

      <div className="card-grid">
        <Link to="/matches" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="card glass">
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🎓</div>
            <h3>Recommended Matches</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              View individual scholarships hand-picked for your profile by our AI engine.
            </p>
          </div>
        </Link>

        <Link to="/sop" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="card glass">
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🤖</div>
            <h3>AI SOP Assistant</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Generate high-quality, personalized Statements of Purpose using advanced AI.
            </p>
          </div>
        </Link>

        <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="card glass">
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>👤</div>
            <h3>Profile Settings</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Update your academic details and financial info to get better scholarship matches.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
