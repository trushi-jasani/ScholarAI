import { useState } from "react";

export default function SOP({ user }) {
  const [scholarshipId, setScholarshipId] = useState("");
  const [sop, setSop] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/sop/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        scholarshipId
      })
    });

    const data = await res.json();
    setSop(data.sop);
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <h2>🤖 AI SOP Generator</h2>
      <p>
        AI generates a complete SOP using your profile and scholarship details.
      </p>

      <input
        placeholder="Enter Scholarship ID"
        value={scholarshipId}
        onChange={e => setScholarshipId(e.target.value)}
      />

      <button onClick={generate}>
        {loading ? "Generating..." : "Generate SOP with AI"}
      </button>

      {sop && (
        <textarea
          rows={14}
          value={sop}
          onChange={e => setSop(e.target.value)}
          style={{ width: "100%", marginTop: "20px" }}
        />
      )}
    </div>
  );
}
