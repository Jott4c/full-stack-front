import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

export default function MyRoute() {
  const token = localStorage.getItem("authToken");

  return (
    <Routes>
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
