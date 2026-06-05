import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
        zIndex: 999,
      }}
    >
      <Link to="/">
        <button
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            background: "#111827",
            color: "white",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          ⬅ Dashboard
        </button>
      </Link>
    </div>
  );
}