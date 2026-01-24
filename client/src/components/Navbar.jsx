import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setUser }) {
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">AI Scholarship Finder</span>
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Home</Link>
        <Link to="/scholarships">Scholarships</Link>
        <Link to="/sop">SOP Assistant</Link>
        <Link to="/applications">Applications</Link>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
