export class Grafo {
  constructor() {
    this.nodos = [];
    this.adj = {};
  }

  agregarNodo(nodo) {
    if (this.nodos.find(n => n.id === nodo.id)) return;
    this.nodos.push(nodo);
    this.adj[nodo.id] = new Set();
  }

  agregarArista(idA, idB) {
    if (!this.adj[idA] || !this.adj[idB]) return;
    this.adj[idA].add(idB);
    this.adj[idB].add(idA);
  }

  eliminarNodo(id) {
    this.nodos = this.nodos.filter(n => n.id !== id);
    delete this.adj[id];
    for (const k of Object.keys(this.adj)) {
      this.adj[k].delete(id);
    }
  }

  obtenerNodos() {
    return this.nodos.map(n => ({ id: n.id, nombre: n.nombre }));
  }

  obtenerAristas() {
    const seen = new Set();
    const links = [];
    for (const a of Object.keys(this.adj)) {
      for (const b of this.adj[a]) {
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (!seen.has(key)) {
          seen.add(key);
          links.push({ source: a, target: b });
        }
      }
    }
    return links;
  }
}
