import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import BookRegister from "./pages/BookRegister";
import Books from "./pages/Books";
import Scan from "./pages/Scan";
import UserProfile from "./pages/UserProfile";

import AdminGate from "./pages/AdminGate";
import AdminLogs from "./pages/AdminLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= DASHBOARD ================= */}
        <Route path="/" element={<Dashboard />} />

        {/* ================= ADMIN FUNCTIONS ================= */}
        <Route path="/register" element={<Register />} />
        <Route path="/register-book" element={<BookRegister />} />
        <Route path="/books" element={<Books />} />

        {/* ================= RFID SYSTEM ================= */}
        <Route path="/scan" element={<Scan />} />
        <Route path="/user/:uid" element={<UserProfile />} />

        {/* ================= ADMIN LOGS (PROTECTED) ================= */}
        <Route path="/admin-logs" element={<AdminGate />} />
        <Route path="/admin-logs/view" element={<AdminLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;