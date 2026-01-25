import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Scholarships from "./pages/Scholarships";
import SOP from "./pages/SOP";
import Applications from "./pages/Applications";
import Profile from "./pages/Profile";
import ScholarshipDetail from "./pages/ScholarshipDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <main style={{ minHeight: 'calc(100vh - 200px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholarships" element={<Scholarships user={user} />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetail user={user} />} />

          {/* Auth Routes */}
          {!user && (
            <>
              <Route path="/login" element={<Login setUser={setUser} />} />
              <Route path="/register" element={<Register setUser={setUser} />} />
            </>
          )}

          {/* Protected Routes */}
          {user && (
            <>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/matches" element={<Matches user={user} />} />
              <Route path="/sop" element={<SOP user={user} />} />
              <Route path="/applications" element={<Applications user={user} />} />
            </>
          )}

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
