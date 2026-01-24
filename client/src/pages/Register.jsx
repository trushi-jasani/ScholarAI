import { useState } from "react";

export default function Register({ setUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    income: "",
    category: "",
    course: "",
    state: ""
  });

  const register = async () => {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setUser(data);
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>

      {Object.keys(form).map(k => (
        <input
          key={k}
          placeholder={k}
          onChange={e =>
            setForm({ ...form, [k]: e.target.value })
          }
        />
      ))}

      <button onClick={register}>Create Account</button>
    </div>
  );
}
