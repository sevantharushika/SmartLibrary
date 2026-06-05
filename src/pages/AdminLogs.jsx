import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebase";
import TopNav from "../components/TopNav";

export default function AdminLogs() {
  const [logs, setLogs] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const logsRef = ref(db, "Logs");

    return onValue(logsRef, (snap) => {
      setLogs(snap.val() || {});
    });
  }, []);

  // 🔥 convert + sort
  const sortedLogs = Object.entries(logs)
    .map(([id, log]) => ({ id, ...log }))
    .sort((a, b) => new Date(b.time) - new Date(a.time));

  // 🔍 SMART SEARCH FILTER
  const filteredLogs = sortedLogs.filter((log) => {
    const q = search.toLowerCase();

    return (
      log.uid?.toLowerCase().includes(q) ||
      log.name?.toLowerCase().includes(q) ||
      log.action?.toLowerCase().includes(q) ||
      log.time?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={page}>
      <h1>🔐 Admin Logs</h1>
      <p style={{ opacity: 0.6 }}>
        Search by UID, Name, Action or Time
      </p>
      <TopNav />

      {/* 🔍 SEARCH BOX */}
      <input
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={input}
      />

      {/* TABLE */}
      <div style={{ overflowX: "auto" }}>
        <table style={table}>
          <thead>
            <tr style={headRow}>
              <th>UID</th>
              <th>Action</th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: "15px", opacity: 0.6 }}>
                  No logs found
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} style={row}>
                  <td>{log.uid}</td>

                  <td
                    style={{
                      color:
                        log.action === "BORROW"
                          ? "#22c55e"
                          : log.action === "RETURN"
                          ? "#ef4444"
                          : "#60a5fa",
                      fontWeight: "bold",
                    }}
                  >
                    {log.action}
                  </td>

                  <td>{log.name || "-"}</td>
                  <td>{log.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  padding: "20px",
  fontFamily: "Arial",
  background: "#0b1220",
  color: "white",
  minHeight: "100vh",
};

const input = {
  width: "100%",
  maxWidth: "400px",
  padding: "10px",
  margin: "15px 0",
  borderRadius: "8px",
  border: "1px solid #1f2937",
  background: "#111827",
  color: "white",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "10px",
  background: "#111827",
  borderRadius: "10px",
  overflow: "hidden",
};

const headRow = {
  background: "#1f2937",
};

const row = {
  borderBottom: "1px solid #1f2937",
};