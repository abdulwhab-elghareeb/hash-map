import { LinkedList } from "./linked-list/LinkedList.js";

export class HashSet {
  #LOAD_FACTOR = 0.75;
  #capacity = 16;
  #length = 0;
  #buckets = new Array(this.#capacity);

  #expandBuckets() {
    const expandedArr = new Array(this.#capacity * 2);
    this.#populateArray(expandedArr, this.#capacity * 2);

    for (const key of this.keys()) {
      const index = this.#hash(key);
      this.#accessBucket(index, expandedArr).append({ key });
    }

    this.#buckets = expandedArr;
    this.#capacity *= 2;
  }

  #accessBucket(index, buckets = this.#buckets) {
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return buckets[index];
  }

  #populateArray(arr, capacity = this.#capacity) {
    for (let i = 0; i < capacity; i++) {
      arr[i] = new LinkedList();
    }
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
      this.#populateArray(this.#buckets, this.#capacity);
    }

    const index = this.#hash(key);
    this.#length++;

    // if the key already exists
    let currentNode = this.#accessBucket(index).headNode();
    while (currentNode) {
      if (currentNode.value.key === key) {
        this.#length--;
        return;
      }
      currentNode = currentNode.nextNode;
    }

    // if the key doesn't exist
    this.#accessBucket(index).append({ key });

    if (this.#length > this.#LOAD_FACTOR * this.#capacity) {
      this.#expandBuckets();
    }
  }

  has(key) {
    const index = this.#hash(key);
    let currentNode = this.#accessBucket(index).headNode();
    while (currentNode) {
      if (currentNode.value.key === key) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  remove(key) {
    const index = this.#hash(key);
    let currentNode = this.#accessBucket(index).headNode();
    let nodeIndex = 0;

    while (currentNode) {
      if (currentNode.value.key === key) {
        this.#accessBucket(index).removeAt(nodeIndex);
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
    this.#buckets = new Array(this.#capacity);
    this.#populateArray(this.#buckets);
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
