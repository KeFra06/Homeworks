import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <h2>Estás en el Dashboard (privado)</h2>
      {}
      <div>Usuario Logueado: {user?.name}</div>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
