import React, { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

function flattenZonas(zonas) {
  const nodes = [];
  const links = [];
  function rec(list, parentId = null, depth = 0) {
    for (const z of list) {
      nodes.push({ id: z.id, nombre: z.nombre, depth });
      if (parentId) links.push({ source: parentId, target: z.id });
      if (z.children && z.children.length) rec(z.children, z.id, depth + 1);
    }
  }
  rec(zonas, null, 0);
  return { nodes, links };
}

export default function GraficoZonas({ zonas = [], height = 300 }) {
  const fgRef = useRef();
  const { nodes, links } = flattenZonas(zonas || []);

  useEffect(() => {
    if (!fgRef.current) return;
    const id = setTimeout(() => {
      if (fgRef.current && nodes && nodes.length) {
        try { fgRef.current.zoomToFit(40); } catch (e) { void e; }
      }
    }, 120);
    return () => clearTimeout(id);
  }, [nodes, links]);

  const nodeCanvasObject = (node, ctx, globalScale) => {
    const label = node.nombre || node.id;
    const depth = node.depth || 0;
    const size = 6 + (3 - Math.min(depth, 3)) * 3; 
    ctx.beginPath();
    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
    const colors = ["#06b6d4", "#60a5fa", "#7c3aed", "#f97316"];
    ctx.fillStyle = colors[depth % colors.length];
    ctx.fill();

    const fontSize = Math.max(10, 12 / globalScale);
    ctx.font = `600 ${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, node.x, node.y);
  };

  return (
    <div style={{ border: "1px solid #e6e6e6", borderRadius: 6, overflow: "hidden", height }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={{ nodes, links }}
        nodeLabel={n => n.nombre || n.id}
        nodeRelSize={6}
        linkWidth={1.6}
        linkColor={() => 'rgba(100,116,139,0.18)'}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.2}
        nodeCanvasObject={nodeCanvasObject}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
