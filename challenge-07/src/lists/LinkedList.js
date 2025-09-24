class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  peek(index = 0) {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;
    let i = 0;
    while (current && i < index) {
      current = current.next;
      i++;
    }
    return current;
  }

  size() {
    return this.length;
  }

  remove(index = 0) {
    if (index < 0 || index >= this.length) return null;
    let removed = null;
    if (index === 0) {
      removed = this.head;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
    } else {
      const prev = this.peek(index - 1);
      removed = prev.next;
      prev.next = removed.next;
      if (removed === this.tail) this.tail = prev;
    }
    this.length--;
    if (removed) removed.next = null;
    return removed;
  }

  print() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }
}

export default LinkedList;

