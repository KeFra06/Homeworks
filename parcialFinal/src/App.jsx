import React, { useState, useRef } from "react";
import "./estilos.css";
import FormCiudad from "./components/FormCiudad";
import ListaCiudades from "./components/ListaCiudades";
import PanelZonasVerdes from "./components/PanelZonasVerdes";
import GraficoCiudades from "./components/GraficoCiudades";
import { generarId, contarZonas, alturaMaxima } from "./utils/zonasUtils";
import { Grafo } from "./utils/grafo";

export default function App() {
  
  const [ciudades, setCiudades] = useState([]);
  const [ciudadSeleccionadaId, setCiudadSeleccionadaId] = useState(null);
  const [enlaces, setEnlaces] = useState([]);

  const grafoRef = useRef(new Grafo());

  const [nodosGrafo, setNodosGrafo] = useState([]);

  React.useEffect(() => {
    setNodosGrafo(grafoRef.current.obtenerNodos());
  }, []);

  function agregarCiudad(nombre) {
    const nueva = { id: generarId(), nombre, zonas: [] };
    setCiudades(prev => {
      const siguiente = [...prev, nueva];
      
      grafoRef.current.agregarNodo({ id: nueva.id, nombre: nueva.nombre });
      
      setNodosGrafo(grafoRef.current.obtenerNodos());
      return siguiente;
    });
    setCiudadSeleccionadaId(nueva.id);
  }

  function eliminarCiudad(id) {
    setCiudades(prev => prev.filter(c => c.id !== id));
    setEnlaces(prev => prev.filter(e => e.source !== id && e.target !== id));
    grafoRef.current.eliminarNodo(id);
    
    setNodosGrafo(grafoRef.current.obtenerNodos());
    if (ciudadSeleccionadaId === id) setCiudadSeleccionadaId(null);
  }

  function seleccionarCiudad(id) {
    setCiudadSeleccionadaId(id);
  }

  function actualizarCiudad(ciudadActualizada) {
    setCiudades(prev => prev.map(c => (c.id === ciudadActualizada.id ? ciudadActualizada : c)));
  }

  function agregarEnlace(sourceId, targetId) {
    if (!sourceId || !targetId || sourceId === targetId) return;
    
    const exists = enlaces.some(e =>
      (e.source === sourceId && e.target === targetId) ||
      (e.source === targetId && e.target === sourceId)
    );
    if (exists) return;
    const nuevo = { source: sourceId, target: targetId };
    setEnlaces(prev => {
      const siguiente = [...prev, nuevo];
      grafoRef.current.agregarArista(sourceId, targetId);
      return siguiente;
    });
  }

  const ciudadSeleccionada = ciudades.find(c => c.id === ciudadSeleccionadaId) || null;

  return (
    <div className="root container app-layout">
      <div className="sidebar">
        <h2 className="brand">Red de Ciudades</h2>

        <FormCiudad onAgregarCiudad={agregarCiudad} />
        <div style={{ height: 10 }} />

        <ListaCiudades
          ciudades={ciudades}
          seleccionadoId={ciudadSeleccionadaId}
          onSeleccionar={seleccionarCiudad}
          onEliminar={eliminarCiudad}
        />

        <div style={{ height: 10 }} />
        <div className="card">
          <h3>Conectar</h3>
          <FormCrearEnlace ciudades={ciudades} onCrear={agregarEnlace} />
        </div>

        <div style={{ height: 12 }} />
        <div className="card">
          <h3>Zonas verdes</h3>
          <div className="small">Selecciona una ciudad para ver y editar sus zonas verdes.</div>
          {ciudadSeleccionada && (
            <div style={{ marginTop: 8 }}>
              <div className="small">Altura: <strong>{alturaMaxima(ciudadSeleccionada.zonas || [])}</strong></div>
              <div className="small">Total zonas: <strong>{contarZonas(ciudadSeleccionada.zonas || [])}</strong></div>
            </div>
          )}
        </div>
      </div>

      <div className="main-area">
        <h2 className="page-title">Grafo Interactivo</h2>
        <div className="graph-wrapper">
          <GraficoCiudades nodos={nodosGrafo} enlaces={enlaces} onNodeSelect={seleccionarCiudad} />
        </div>

        <div className="panel-zonas-container" style={{ marginTop: 12 }}>
          <PanelZonasVerdes ciudad={ciudadSeleccionada} onActualizarCiudad={actualizarCiudad} />
        </div>
      </div>
    </div>
  );
}


function FormCrearEnlace({ ciudades, onCrear }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!a || !b) return;
    onCrear(a, b);
    setA("");
    setB("");
  }

  return (
    <form onSubmit={submit}>
      <label>Ciudad A</label>
      <select value={a} onChange={e => setA(e.target.value)}>
        <option value="">-- seleccionar --</option>
        {ciudades.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>

      <label style={{ marginLeft: 8 }}>Ciudad B</label>
      <select value={b} onChange={e => setB(e.target.value)}>
        <option value="">-- seleccionar --</option>
        {ciudades.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>

      <div style={{ marginTop: 8 }}>
        <button type="submit">Crear conexión</button>
      </div>
    </form>
  );
}
