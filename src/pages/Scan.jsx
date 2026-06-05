import { useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";


export default function Scan() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanRef = ref(db, "LatestScan");

    const unsubscribe = onValue(scanRef, async (snap) => {
      const uid = snap.val();

      // ❌ ignore empty OR already processed scans
      if (!uid) return;

      // 🧠 IMPORTANT: clear immediately to prevent re-trigger
      await set(ref(db, "LatestScan"), null);

      // create session
      await set(ref(db, "ActiveSession"), {
        uid,
        lastScan: Date.now(),
      });

      // redirect
      navigate(`/user/${uid}`);
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        background: "#0f172a",
        color: "white",
      }}
    >
      
      
      <h1>📡 Scan Library Card</h1>
      <p>Waiting for RFID scan...</p>

      <Link to="/">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          ⬅ Back to Dashboard
        </button>
      </Link>
    </div>
  );
}