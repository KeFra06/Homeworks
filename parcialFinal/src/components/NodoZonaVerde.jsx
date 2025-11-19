import React, { useState } from "react";

export default function NodoZonaVerde({ zona, onAgregarSubzona, onEditar }) {
  const [agregando, setAgregando] = useState(false);
  const [nombreNuevo, setNombreNuevo] = useState("");
  const [editando, setEditando] = useState(false);
  const [nombreEdicion, setNombreEdicion] = useState(zona.nombre || "");

  function submitAgregar(e) {
    e.preventDefault();
    const t = nombreNuevo.trim();
    if (!t) return;
    onAgregarSubzona(zona.id, t);
    setNombreNuevo("");
    setAgregando(false);
  }

  function submitEditar(e) {
    e.preventDefault();
    const t = nombreEdicion.trim();
    if (!t) return;
    onEditar(zona.id, t);
    setEditando(false);
  }

  return (
    <div className="arbol-nodo" style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
        <div style={{ flex: 1 }}><strong>{zona.nombre}</strong></div>
        <div className="node-actions">
          <button onClick={() => setAgregando(a => !a)} className="small">Agregar subzona</button>
          <button onClick={() => setEditando(e => !e)} className="small">Editar</button>
        </div>
      </div>

      {editando && (
        <form onSubmit={submitEditar} style={{ marginTop: 6, display: "flex", gap: 8 }}>
          <input value={nombreEdicion} onChange={e => setNombreEdicion(e.target.value)} />
          <button type="submit" className="small">Guardar</button>
        </form>
      )}

      {agregando && (
        <form onSubmit={submitAgregar} style={{ marginTop: 6, display: "flex", gap: 8 }}>
          <input value={nombreNuevo} onChange={e => setNombreNuevo(e.target.value)} placeholder="Nombre subzona" />
          <button type="submit" className="small">Agregar</button>
        </form>
      )}

      {zona.children && zona.children.length > 0 && (
        <div className="arbol-children" style={{ marginTop: 8 }}>
          {zona.children.map(child => (
            <NodoZonaVerde
              key={child.id}
              zona={child}
              onAgregarSubzona={onAgregarSubzona}
              onEditar={onEditar}
            />
          ))}
        </div>
      )}
    </div>
  );
}
