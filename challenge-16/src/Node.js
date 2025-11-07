export class Node {
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}

export class Person extends Node {
  constructor(id, name, age) {
    super(id, name, 'person');
    this.age = age;
  }
}

export class City extends Node {
  constructor(id, name) {
    super(id, name, 'city');
  }
}