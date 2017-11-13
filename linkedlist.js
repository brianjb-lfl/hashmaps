'use strict';

class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }
  
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    
    return this._find(index).value;
  }
  

  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error('Index error');
    }

    const newNode = {
      value
    };

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    }
    else {
      const node = this._find(index - 1);
      newNode.next = node.next;
      node.next = newNode;
    }

    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (index === 0) {
      this.head = this.head.next;
    }
    else {
      const node = this._find(index - 1);
      node.next = node.next.next;
    }

    this.length--;
  }

  _find(index) {
    let node = this.head;
    for (let i=0; i<index; i++) {
      node = node.next;
    }
    return node;
  }

}

exports.LinkedList = LinkedList;