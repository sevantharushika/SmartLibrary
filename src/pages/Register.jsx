import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebase/firebase";
import { page, card, button } from "../styles/ui";
import TopNav from "../components/TopNav";

export default function Register() {
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const latestRef = ref(db, "LatestScan");

    const unsubscribe = onValue(latestRef, (snapshot) => {
      setUid(snapshot.val() || "");
    });

    return () => unsubscribe();
  }, []);

  const registerUser = async (e) => {
    e.preventDefault();

    if (!uid) {
      alert("No RFID scanned yet!");
      return;
    }

    try {
      await set(ref(db, `Users/${uid}`), {
        name,
        studentId,
        department,
        status: "OUT",
      });

      alert("User Registered");

      setName("");
      setStudentId("");
      setDepartment("");
    } catch (error) {
      console.error(error);
      alert("Firebase write failed");
    }
  };

  return (
    <div style={page}>
      <div style={{ ...card, maxWidth: "500px", margin: "0 auto" }}>
        <h2>🆔 RFID User Registration</h2>
        <TopNav />

        {/* RFID display */}
        <div
          style={{
            padding: "10px",
            background: "#f1f5f9",
            borderRadius: "8px",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          UID: {uid || "Waiting for scan..."}
        </div>

        <form onSubmit={registerUser} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />

          <input
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />

          <input
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />

          <button style={button} type="submit">
            Register User
          </button>
        </form>
      </div>
    </div>
  );
}