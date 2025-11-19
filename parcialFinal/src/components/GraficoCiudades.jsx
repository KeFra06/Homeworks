import React, { useRef, useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function GraficoCiudades({ nodos = [], enlaces = [], onNodeSelect }) {
  const fgRef = useRef();

  const graphData = {
    nodes: nodos.map(n => ({ id: n.id, nombre: n.nombre })),
    links: enlaces
  };

  const containerRef = useRef();
  const [size, setSize] = useState({ width: 800, height: 400 });

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setSize({ width: Math.max(200, Math.floor(cr.width)), height: Math.max(200, Math.floor(cr.height)) });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!fgRef.current) return;
    const id = setTimeout(() => {
      if (fgRef.current && nodos && nodos.length) fgRef.current.zoomToFit(400);
    }, 350);
    return () => clearTimeout(id);
  }, [nodos, enlaces]);

  const handleNodeCanvasObject = (node, ctx, globalScale) => {
    const label = node.nombre || node.id;
    const fontSize = Math.max(12 / globalScale, 10);
    ctx.font = `600 ${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth + 12, fontSize + 8];

    ctx.beginPath();
    ctx.arc(node.x, node.y, 12, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#0ea5ff';
    ctx.fill();


  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = Math.max(3 / globalScale, 1);
  ctx.strokeStyle = 'rgba(255,255,255,0.95)';
  ctx.fillStyle = '#0f172a';
  ctx.strokeText(label, node.x, node.y);
  ctx.fillText(label, node.x, node.y);

    // pequeño marcador izquierdo
    ctx.beginPath();
    ctx.arc(node.x - bckgDimensions[0] / 2 - 8, node.y, 6, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#0369a1';
    ctx.fill();
  };

  const hasNodes = graphData.nodes && graphData.nodes.length > 0;

  return (
    <div className="graph-card card">
      <div style={{ padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Grafo de ciudades</h3>
        <div className="small">Haz click en un nodo para ver sus zonas</div>
      </div>
      <div style={{ flex: 1, display: 'flex', minHeight: 320, position: 'relative' }}>
        {!hasNodes && (
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div className="small">No hay ciudades. Agrega una ciudad para ver el grafo.</div>
          </div>
        )}
        <div ref={containerRef} className="graph-canvas-area" style={{ flex: 1, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}>
          <ForceGraph2D
            ref={fgRef}
            width={size.width}
            height={size.height}
            graphData={graphData}
            nodeLabel={n => n.nombre || n.id}
            linkWidth={1.8}
            linkColor={() => 'rgba(148,163,184,0.22)'}
            linkCurvature={0.12}
            nodeAutoColorBy="id"
            nodeRelSize={8}
            linkDirectionalParticles={0}
            warmupTicks={100}
            enableNodeDrag={true}
            enableZoomPanInteraction={true}
            onEngineStop={() => { if (fgRef.current && nodos && nodos.length) fgRef.current.zoomToFit(400); }}
            onNodeClick={node => {
              if (fgRef.current && node && typeof node.x === 'number') {
                const distance = 40;
                const distRatio = 1 + distance / Math.hypot(node.x, node.y);
                fgRef.current.centerAt(node.x * distRatio, node.y * distRatio, 400);
                fgRef.current.zoom(1.4, 400);
              }
              if (onNodeSelect && typeof onNodeSelect === 'function' && node && node.id) {
                onNodeSelect(node.id);
              }
            }}
            onNodeDrag={() => {}}
            onNodeDragEnd={(node) => { if (node) { node.fx = node.x; node.fy = node.y; } }}
            nodeCanvasObject={handleNodeCanvasObject}
            style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}
