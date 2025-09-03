import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export default function Login() {
  const [name, setName] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name });
    navigate("/dashboard");
  };

  return (
    <div>
      <h2>Bienvenido al Login (público)</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
