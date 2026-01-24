import { useState } from "react";

export default function Profile({ setUser }) {
  const [form, setForm] = useState({
    name: "",
    income: "",
    category: "",
    course: "",
    state: ""
  });

  const submit = async () => {
    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setUser(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Student Profile</h2>
      {Object.keys(form).map(k => (
        <input
          key={k}
          placeholder={k}
          className="border p-2 block mt-2"
          onChange={e => setForm({ ...form, [k]: e.target.value })}
        />
      ))}
      <button onClick={submit} className="mt-4 bg-blue-600 text-white px-4 py-2">
        Save Profile
      </button>
    </div>
  );
}
