import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h1>HOME PAGE</h1>

      <button onClick={() => navigate("/admin")}>
        Go Admin Login
      </button>

      <br /><br />

      <button onClick={() => navigate("/admin-logs/view")}>
        Go Admin Logs
      </button>
    </div>
  );
}