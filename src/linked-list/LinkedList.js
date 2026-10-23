import { Node } from "./Node.js";

export class LinkedList {
  #head = null;
  #size = 0;

  append(value) {
    const node = new Node(value, null);

    if (!this.#head) {
      this.#head = node;
    } else {
      let curr = this.#head;
      while (curr.nextNode) {
        curr = curr.nextNode;
      }
      curr.nextNode = node;
    }

    this.#size++;
  }

  prepend(value) {
    this.#head = new Node(value, this.#head);
    this.#size++;
  }

  size() {
    return this.#size;
  }

  head() {
    return this.#head ? this.#head.value : undefined;
  }

  headNode() {
    return this.#head || undefined;
  }

  tail() {
    if (this.#size === 0) return;

    let curr = this.#head;
    while (curr.nextNode) {
      curr = curr.nextNode;
    }
    return curr.value;
  }

  at(index) {
    if (index < 0 || index >= this.#size) return;

    let curr = this.#head;
    for (let i = 0; i < index; i++) {
      curr = curr.nextNode;
    }
    return curr.value;
  }

  pop() {
    if (!this.#head) return;

    const tempHead = this.#head;
    this.#head = this.#head.nextNode;
    this.#size--;
    return tempHead.value;
  }

  contains(value) {
    let curr = this.#head;
    while (curr) {
      if (curr.value === value) return true;
      curr = curr.nextNode;
    }
    return false;
  }

  findIndex(value) {
    let curr = this.#head;
    let currentIndex = 0;

    while (curr) {
      if (curr.value === value) return currentIndex;
      curr = curr.nextNode;
      currentIndex++;
    }
    return -1;
  }

  toString() {
    if (!this.#head) return "";
    let curr = this.#head;
    let resultString = "";

    while (curr) {
      resultString += `( ${curr.value} ) -> `;
      curr = curr.nextNode;
    }
    resultString += "null";
    return resultString;
  }

  insertAt(index, ...values) {
    if (index > this.#size || index < 0) throw RangeError("Index out of range");

    if (index === 0) {
      // if the index is 0 then prepend values in reversed order
      for (let i = values.length - 1; i >= 0; i--) {
        this.prepend(values[i]);
      }
      return;
    }

    if (index === this.#size) {
      values.forEach((value) => this.append(value));
      return;
    }

    let curr = this.#head;
    // stopping in index - 1 so we can link the new node with the one before it
    for (let i = 0; i < index - 1; i++) {
      curr = curr.nextNode;
    }

    values.forEach((value) => {
      let prev = curr;
      curr = new Node(value, curr.nextNode);
      prev.nextNode = curr;
      this.#size++;
    });
  }

  removeAt(index) {
    if (index >= this.#size || index < 0)
      throw RangeError("Index out of range");

    if (index === 0) {
      this.#head = this.#head.nextNode;
    } else {
      let curr = this.#head;
      for (let i = 0; i < index - 1; i++) {
        curr = curr.nextNode;
      }
      curr.nextNode = curr.nextNode.nextNode;
    }
    this.#size--;
  }

  clearNodes() {
    this.#head.nextNode = null;
    this.#head = null;
    this.#size = 0;
  }
}
