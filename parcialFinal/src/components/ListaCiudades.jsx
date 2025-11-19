import React from "react";

export default function ListaCiudades({ ciudades, seleccionadoId, onSeleccionar, onEliminar }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Ciudades</h3>
      {ciudades.length === 0 && <div className="small">No hay ciudades aún.</div>}
      <div className="city-list">
        {ciudades.map(c => (
          <div key={c.id} className={`city-item ${seleccionadoId === c.id ? 'selected' : ''}`}>
            <div className="left" style={{ cursor: "pointer" }} onClick={() => onSeleccionar(c.id)}>
              <div className="city-name">{c.nombre}</div>
              <div className="small">Zonas: {(c.zonas || []).length}</div>
            </div>
            <div className="actions">
              <button onClick={() => onSeleccionar(c.id)} className="small">
                {seleccionadoId === c.id ? "Seleccionada" : "Seleccionar"}
              </button>
              <button onClick={() => onEliminar(c.id)} className="small">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
