import { LinkedList } from "./linked-list/LinkedList.js";

export class HashSet {
  #loadFactor = 0.75;
  #capacity = 16;
  #length = 0;
  #buckets = new Array(this.#capacity);

  #expandBuckets() {
    const expandedArr = new Array(this.#capacity * 2);
    for (let i = 0; i < this.#capacity * 2; i++) {
      expandedArr[i] = new LinkedList();
    }

    for (const key of this.keys()) {
      expandedArr[this.#hash(key)].append({ key });
    }

    this.#buckets = expandedArr;
    this.#capacity *= 2;
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  set(key) {
    if (this.#length === 0 && this.#capacity === 16) {
      for (let i = 0; i < this.#capacity; i++) {
        this.#buckets[i] = new LinkedList();
      }
    }

    this.#length++;

    // if the key already exists
    let currentNode = this.#buckets[this.#hash(key)].headNode();
    while (currentNode) {
      if (currentNode.value.key === key) {
        this.#length--;
        return;
      }
      currentNode = currentNode.nextNode;
    }

    // if the key doesn't exist
    this.#buckets[this.#hash(key)].append({ key });

    if (this.#length > this.#loadFactor * this.#capacity) {
      this.#expandBuckets();
    }
  }

  has(key) {
    let currentNode = this.#buckets[this.#hash(key)].headNode();
    while (currentNode) {
      if (currentNode.value.key === key) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  remove(key) {
    let currentNode = this.#buckets[this.#hash(key)].headNode();
    let nodeIndex = 0;

    while (currentNode) {
      if (currentNode.value.key === key) {
        this.#buckets[this.#hash(key)].removeAt(nodeIndex);
        this.#length--;
        return true;
      }
      currentNode = currentNode.nextNode;
      nodeIndex++;
    }
    return false;
  }

  length() {
    return this.#length;
  }

  clear() {
    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets[i].clearNodes();
    }
    this.#length = 0;
  }

  keys() {
    const keysArray = [];

    for (let i = 0; i < this.#capacity; i++) {
      let currentNode = this.#buckets[i].headNode();
      while (currentNode) {
        keysArray.push(currentNode.value.key);
        currentNode = currentNode.nextNode;
      }
    }
    return keysArray;
  }

  toString() {
    let resultString = "{ ";
    for (const key of this.keys()) {
      resultString += `${key}, `;
    }
    return resultString.slice(0, -3) + " }";
  }
}
