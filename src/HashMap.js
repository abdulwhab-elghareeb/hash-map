import { LinkedList } from "./linked-list/LinkedList.js";

export class HashMap {
  loadFactor = 0.75;
  capacity = 16;
  buckets = new Array(this.capacity);

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    // 1- if the bucket is empty
    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append({ key, value });
      return;
    }

    // 2- if the key exists
    let currentNode = this.buckets[index].headNode();
    while (currentNode) {
      if (currentNode.value.key === key) {
        currentNode.value.value = value;
        return;
      }
      currentNode = currentNode.nextNode;
    }

    // 3- key doesn't exist
    this.buckets[index].append({ key, value });
  }
}
