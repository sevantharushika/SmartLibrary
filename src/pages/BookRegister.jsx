import { useState } from "react";
import { ref, set, push } from "firebase/database";
import { db } from "../firebase/firebase";
import TopNav from "../components/TopNav";

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
      // Firebase auto generates unique ID
      const newBookRef = push(ref(db, "Books"));

      await set(newBookRef, {
        title,
        author: author || "Unknown",
        status: "AVAILABLE",
        borrowedBy: "",
        createdAt: new Date().toISOString(),
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

      <div
        style={{
          minHeight: "100vh",
          background: "#f4f7fc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            background: "#fff",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#1e293b" }}>
            📚 Register New Book
          </h2>

          <form
            onSubmit={handleRegister}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "14px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Register Book
            </button>
          </form>

          {message && (
            <div
              style={{
                marginTop: "20px",
                padding: "12px",
                borderRadius: "10px",
                textAlign: "center",
                fontWeight: "500",
                background: message.includes("✅") ? "#dcfce7" : "#fee2e2",
                color: message.includes("✅") ? "#166534" : "#991b1b",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};