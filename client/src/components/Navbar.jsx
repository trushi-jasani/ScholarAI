import { Link, useLocation } from "react-router-dom";

function Navbar({ user, setUser }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span style={{ fontSize: '1.5rem' }}>🎓</span> ScholarAI
      </Link>

      <div className="nav-links">
        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/scholarships" className={isActive("/scholarships")}>Scholarships</Link>
        {user && (
          <>
            <Link to="/matches" className={isActive("/matches")}>Matches</Link>
            <Link to="/sop" className={isActive("/sop")}>SOP</Link>
          </>
        )}
      </div>

      <div className="nav-auth">
        {user ? (
          <>
            <Link to="/profile" className="profile-pill">
              <span style={{ opacity: 0.8 }}>👤</span>
              {user.name}
            </Link>
            <button
              className="logout-icon-btn"
              onClick={() => setUser(null)}
              title="Logout"
            >
              🚪
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={isActive("/login")} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600 }}>
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
