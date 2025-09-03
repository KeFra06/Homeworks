import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          {/* Esta es mi ruta pública */}
          <Route path="/login" element={<Login />} />

          {/* Esta es mi ruta privada */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

