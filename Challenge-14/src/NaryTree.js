export class TreeNode {
  constructor(value) {
    this.value = value; // {title, link, component}
    this.children = [];
  }

  addChild(childNode) {
    this.children.push(childNode);
  }
}

export class NaryTree {
  constructor() {
    this.root = new TreeNode(null); // Root sin value, solo para agrupar top-level
  }

  // DFS (recursivo) para printing en consola
  dfs(node = this.root, depth = 0) {
    if (node !== null) {
      if (node.value) {
        console.log('  '.repeat(depth) + node.value.title);
      }
      node.children.forEach(child => this.dfs(child, depth + 1));
    }
  }

  // BFS (level by level) para printing en consola, usando queue
  bfs() {
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      if (node.value) {
        console.log(node.value.title);
      }
      node.children.forEach(child => queue.push(child));
    }
  }
}