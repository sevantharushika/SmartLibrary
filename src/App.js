import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import BookRegister from "./pages/BookRegister";
import Books from "./pages/Books";
import Scan from "./pages/Scan";
import UserProfile from "./pages/UserProfile";

import AdminGate from "./pages/AdminGate";
import AdminLogs from "./pages/AdminLogs";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* User Registration */}
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />

        {/* Book Registration */}
        <Route
          path="/register-book"
          element={
            <ProtectedRoute>
              <BookRegister />
            </ProtectedRoute>
          }
        />

        {/* Book List */}
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />

        {/* RFID Scan */}
        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <Scan />
            </ProtectedRoute>
          }
        />

        {/* User Profile */}
        <Route
          path="/user/:uid"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin Gate */}
        <Route
          path="/admin-logs"
          element={
            <ProtectedRoute>
              <AdminGate />
            </ProtectedRoute>
          }
        />

        {/* Admin Logs */}
        <Route
          path="/admin-logs/view"
          element={
            <ProtectedRoute>
              <AdminLogs />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;