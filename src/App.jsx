import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import BookRegister from "./pages/BookRegister";
import AdminGate from "./pages/AdminGate";
import AdminLogs from "./pages/AdminLogs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED AREA (TEMP SIMPLE VERSION) */}
        <Route path="/register-book" element={<BookRegister />} />
        <Route path="/admin" element={<AdminGate />} />
        <Route path="/admin-logs/view" element={<AdminLogs />} />

      </Routes>
    </BrowserRouter>
  );
}