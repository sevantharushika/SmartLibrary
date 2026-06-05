import { useEffect, useState } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { db } from "../firebase/firebase";
import { useParams } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function UserProfile() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState({});

  // ================= LOAD USER + BOOKS =================
  useEffect(() => {
    const userRef = ref(db, `Users/${uid}`);
    const booksRef = ref(db, "Books");

    const unsubUser = onValue(userRef, (snap) => {
      setUser(snap.val());
    });

    const unsubBooks = onValue(booksRef, (snap) => {
      setBooks(snap.val() || {});
    });

    return () => {
      unsubUser();
      unsubBooks();
    };
  }, [uid]);

  // ================= BORROW BOOK =================
  const borrowBook = async (bookId) => {
    await set(ref(db, `Books/${bookId}`), {
      ...books[bookId],
      status: "BORROWED",
      borrowedBy: uid
    });

    await push(ref(db, "Logs"), {
      uid: uid,
      name: user?.name || "Unknown User",   // ✅ FIXED
      bookId: bookId,
      action: "BORROW",
      time: new Date().toLocaleString()
    });
  };

  // ================= RETURN BOOK =================
  const returnBook = async (bookId) => {
    await set(ref(db, `Books/${bookId}`), {
      ...books[bookId],
      status: "AVAILABLE",
      borrowedBy: ""
    });

    await push(ref(db, "Logs"), {
      uid: uid,
      name: user?.name || "Unknown User",   // ✅ FIXED
      bookId: bookId,
      action: "RETURN",
      time: new Date().toLocaleString()
    });
  };

  // ================= LOADING =================
  if (!user) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <TopNav />

      {/* USER INFO */}
      <h2>👤 {user.name}</h2>
      <p>{user.studentId}</p>
      <p>{user.department}</p>

      <hr />

      {/* BOOK LIST */}
      <h3>📚 Books</h3>

      {Object.entries(books).map(([id, book]) => (
        <div
          key={id}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            marginBottom: 10,
            borderRadius: 8
          }}
        >
          <h4>{book.title}</h4>
          <p>Author: {book.author}</p>
          <p>Status: <b>{book.status}</b></p>

          {/* SHOW WHO BORROWED */}
          {book.borrowedBy && (
            <p style={{ fontSize: 12, opacity: 0.7 }}>
              Borrowed By: {book.borrowedBy}
            </p>
          )}

          {/* ACTION BUTTONS */}
          {book.status !== "BORROWED" ? (
            <button onClick={() => borrowBook(id)}>
              Borrow
            </button>
          ) : (
            book.borrowedBy === uid && (
              <button onClick={() => returnBook(id)}>
                Return
              </button>
            )
          )}
        </div>
      ))}
    </div>
  );
}