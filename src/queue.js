const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */

class LinkedList {
  constructor(value, next) {
    this.nodesList = null;
    this.head = null;
    this.lastNode = null;
  }

  push (value) {
    const listNode = {
      value,
      next: null
    }
    if (!this.lastNode) {
      this.nodesList = listNode;
      this.head = listNode;
    } else {
      this.lastNode.next = listNode;
    }
    this.lastNode = listNode;
    return listNode;
  }
  
  shift () {
    // {value: 1, next: {value: 2 next: null}}
    let value = this.head.value;
    this.head = this.head.next;
    this.nodesList = this.head;
    return value
  }
}

class Queue {
  constructor(){
    this.list = new LinkedList();
    this.tail = null;
    this.head = null;
  }

  getUnderlyingList() {
    return this.list.nodesList;
  }

  enqueue(value) {
    this.list.push(value);
    this.tail = this.list.lastNode;
  }

  dequeue() {
    let value = this.list.shift();
    this.head = this.list.head;
    return value
  }
}

module.exports = {
  Queue
};
