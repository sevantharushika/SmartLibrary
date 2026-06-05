import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={page}>
      <header style={header}>
        <h1>📚 Smart Library System</h1>
        <p>RFID Controlled Library Management</p>
      </header>

      <div style={grid}>
        <Card title="👤 Users" link="/register" />
        <Card title="📚 Books" link="/register-book" />
        <Card title="📖 Catalog" link="/books" />
        <Card title="🔐 Admin Logs" link="/admin-logs" />
      </div>

      {/* BIG SCAN BUTTON */}
      <div style={scanBox}>
        <Link to="/scan" style={{ textDecoration: "none" }}>
          <div style={scanCard}>
            📡 CARD SCAN SYSTEM
          </div>
        </Link>
      </div>
    </div>
  );
}

function Card({ title, link }) {
  return (
    <div style={card}>
      <h3>{title}</h3>
      <Link to={link}>
        <button style={btn}>Open</button>
      </Link>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  padding: "30px",
  fontFamily: "Arial",
};

const header = {
  textAlign: "center",
  marginBottom: 30,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 15,
};

const card = {
  background: "#1e293b",
  padding: 20,
  borderRadius: 12,
};

const btn = {
  marginTop: 10,
  padding: 10,
  width: "100%",
  border: "none",
  borderRadius: 8,
  background: "#3b82f6",
  color: "white",
};

const scanBox = {
  marginTop: 30,
};

const scanCard = {
  background: "#2563eb",
  padding: 30,
  textAlign: "center",
  borderRadius: 15,
  fontSize: 22,
  fontWeight: "bold",
};