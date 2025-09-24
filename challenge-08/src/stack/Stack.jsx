export default class Stack {
  constructor(items = []) {
    this._items = Array.isArray(items) ? [...items] : [];
  }

  push(item) {
    this._items.push(item);
  }

  pop() {
    return this._items.pop();
  }

  peek() {
    return this._items.length === 0 ? null : this._items[this._items.length - 1];
  }

  isEmpty() {
    return this._items.length === 0;
  }

  size() {
    return this._items.length;
  }

  toArray() {
    return [...this._items];
  }
}
