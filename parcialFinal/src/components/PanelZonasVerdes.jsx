import React, { useState } from "react";
import NodoZonaVerde from "./NodoZonaVerde";
import { agregarZona, editarZona, contarZonas, alturaMaxima } from "../utils/zonasUtils";
import GraficoZonas from "./GraficoZonas";

export default function PanelZonasVerdes({ ciudad, onActualizarCiudad }) {
  const [nombreRaiz, setNombreRaiz] = useState("");

  if (!ciudad) {
    return (
      <div className="card">
        <h3>Zonas verdes</h3>
        <div className="small">Selecciona una ciudad para ver y editar sus zonas verdes.</div>
      </div>
    );
  }

  function handleAddRaiz(e) {
    e.preventDefault();
    const t = nombreRaiz.trim();
    if (!t) return;
    const nuevas = agregarZona(ciudad.zonas || [], null, t);
    onActualizarCiudad({ ...ciudad, zonas: nuevas });
    setNombreRaiz("");
  }

  function handleAgregarSubzona(parentId, subNombre) {
    const nuevas = agregarZona(ciudad.zonas || [], parentId, subNombre);
    onActualizarCiudad({ ...ciudad, zonas: nuevas });
  }

  function handleEditarZona(zonaId, nuevoNombre) {
    const nuevas = editarZona(ciudad.zonas || [], zonaId, nuevoNombre);
    onActualizarCiudad({ ...ciudad, zonas: nuevas });
  }

  const total = contarZonas(ciudad.zonas || []);
  const altura = alturaMaxima(ciudad.zonas || []);

  return (
    <div className="card">
      <h3>Zonas verdes de: {ciudad.nombre}</h3>
      <div className="small">Altura máxima: <strong>{altura}</strong></div>
      <div className="small">Total de zonas: <strong>{total}</strong></div>

      <hr style={{ margin: "8px 0" }} />

      { (ciudad.zonas || []).length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <GraficoZonas zonas={ciudad.zonas} height={300} />
        </div>
      )}

      <form onSubmit={handleAddRaiz}>
        <input
          type="text"
          placeholder="Nombre zona raíz"
          value={nombreRaiz}
          onChange={(e) => setNombreRaiz(e.target.value)}
        />
        <div style={{ marginTop: 6 }}>
          <button type="submit">Agregar zona (raíz)</button>
        </div>
      </form>

      <div className="arbol-root" style={{ marginTop: 12 }}>
        {(ciudad.zonas || []).length === 0 && <div className="small">No hay zonas aún.</div>}
        {(ciudad.zonas || []).map(z => (
          <NodoZonaVerde key={z.id} zona={z} onAgregarSubzona={handleAgregarSubzona} onEditar={handleEditarZona} />
        ))}
      </div>
    </div>
  );
}
