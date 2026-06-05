import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function AdminGate() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCheck = () => {
    console.log("clicked"); // debug

    if (password.trim() === "admin123") {
      navigate("/admin-logs/view");
    } else {
      alert("Wrong password");
    }
  };

  return (
    
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial",
      }}
    >
        <TopNav />
      <div style={{ textAlign: "center" }}>
        <h2>🔐 Admin Access</h2>

        <input
          type="password"
          value={password}
          placeholder="Enter admin password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            width: "220px",
            borderRadius: "8px",
            border: "none",
            marginTop: "10px",
          }}
        />

        <br />

        <button
          onClick={handleCheck}
          style={{
            marginTop: "15px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}