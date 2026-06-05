import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebase";
import TopNav from "../components/TopNav";

export default function Books() {
  const [books, setBooks] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    return onValue(ref(db, "Books"), (snap) => {
      setBooks(snap.val() || {});
    });
  }, []);

  const filtered = Object.entries(books).filter(([id, b]) => {
    const q = search.toLowerCase();
    return (
      id.toLowerCase().includes(q) ||
      b.title?.toLowerCase().includes(q) ||
      b.author?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ padding: 20 }}>
      <TopNav />

      <h2>📚 Books Catalog</h2>

      <input
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.map(([id, b]) => (
        <div key={id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h4>{b.title}</h4>
          <p>{b.author}</p>
          <p>Status: {b.status}</p>

          {/* 🔥 NOW YOU CAN SEE WHO HAS IT */}
          {b.borrowedBy && (
            <p>Borrowed By: {b.borrowedBy}</p>
          )}
        </div>
      ))}
    </div>
  );
}