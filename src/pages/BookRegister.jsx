import { useState } from "react";
import { ref, set, push } from "firebase/database";
import TopNav from "../components/TopNav";
import { auth, db } from "../firebase/firebase";

export default function BookRegister() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!title) {
      setMessage("⚠️ Book Title is required");
      return;
    }

    try {
      // 🔐 AUTH CHECK
      const user = auth.currentUser;

      console.log("CURRENT USER:", user);

      if (!user) {
        setMessage("❌ Please login first");
        return;
      }

      const newBookRef = push(ref(db, "Books"));

      await set(newBookRef, {
        title,
        author: author || "Unknown",
        status: "AVAILABLE",
        borrowedBy: "",
        createdAt: new Date().toISOString(),
        createdBy: user.email
      });

      setMessage(`✅ Book registered successfully! ID: ${newBookRef.key}`);

      setTitle("");
      setAuthor("");

    } catch (err) {
      console.error(err);
      setMessage("❌ Error registering book");
    }
  };

  return (
    <>
      <TopNav />

      <div style={pageWrapper}>
        <div style={card}>

          <h2 style={titleStyle}>📚 Register New Book</h2>

          <form onSubmit={handleRegister} style={formStyle}>

            <input
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={inputStyle}
            />

            <button type="submit" style={buttonStyle}>
              Register Book
            </button>

          </form>

          {message && (
            <div style={{
              marginTop: "15px",
              padding: "12px",
              borderRadius: "10px",
              textAlign: "center",
              fontWeight: "500",
              background: message.includes("✅") ? "#dcfce7" : "#fee2e2",
              color: message.includes("✅") ? "#166534" : "#991b1b",
            }}>
              {message}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

/* =========================
   STYLES
========================= */

const pageWrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  padding: "20px",
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "#ffffff",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#1e293b",
  fontSize: "22px",
  fontWeight: "700",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  outline: "none",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};