import React, { useState } from "react";

export default function FormCiudad({ onAgregarCiudad }) {
  const [nombre, setNombre] = useState("");

  function submit(e) {
    e.preventDefault();
    const t = nombre.trim();
    if (!t) return;
    onAgregarCiudad(t);
    setNombre("");
  }

  return (
    <form onSubmit={submit} className="card">
      <div className="header-bar">
        <h3 style={{ margin: 0 }}>Agregar ciudad</h3>
      </div>
      <div style={{ marginTop: 8 }}>
        <input
          type="text"
          placeholder="Nombre de la ciudad"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit">Agregar</button>
      </div>
    </form>
  );
}
