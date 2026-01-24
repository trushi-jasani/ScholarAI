import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Scholarships from "./pages/Scholarships";
import SOP from "./pages/SOP";
import Applications from "./pages/Applications";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {/* NOT LOGGED IN ROUTES */}
      {!user && (
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      {/* LOGGED IN ROUTES */}
      {user && (
        <>
          <Navbar setUser={setUser} />

          <Routes>
            {/* THIS FIXES WHITE SCREEN */}
            <Route path="/" element={<Navigate to="/dashboard" />} />

            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/scholarships" element={<Scholarships user={user} />} />
            <Route path="/sop" element={<SOP user={user} />} />
            <Route path="/applications" element={<Applications user={user} />} />

            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
