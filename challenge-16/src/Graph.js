export class Graph {
  constructor() {
    this.nodes = [];
    this.adjList = new Map();
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjList.set(node.id, []);
  }

  addEdge(node1, node2) {
    // No dirigido: agrega en ambas direcciones
    this.adjList.get(node1.id).push(node2.id);
    this.adjList.get(node2.id).push(node1.id);
  }

  searchNode(id) {
    return this.nodes.find(node => node.id === id);
  }

  getAdjacencies(id) {
    return this.adjList.get(id) || [];
  }

  printGraph() {
    console.log(this.adjList);
  }

  getPeopleInCity(cityName) {
    const city = this.nodes.find(node => node.type === 'city' && node.name === cityName);
    if (!city) return [];

    const adjacentIds = this.getAdjacencies(city.id);
    const people = adjacentIds
      .map(id => this.searchNode(id))
      .filter(node => node && node.type === 'person')
      .map(person => ({ name: person.name, age: person.age }));

    return people;
  }
}