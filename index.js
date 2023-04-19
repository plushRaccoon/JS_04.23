class Stack {
  constructor(stackSize = 10) {
    if (
      typeof stackSize !== 'number' ||
      stackSize <= 0 ||
      !Number.isInteger(stackSize) ||
      !Number.isFinite(stackSize) ||
      Number.isNaN(stackSize)
    ) {
      throw new Error('Invalid limit value');
    } else {
      this.stackSize = stackSize;
      this.stack = new Array(stackSize);
      this.push = this.push.bind(this);
      this.pop = this.pop.bind(this);
      this.peek = this.peek.bind(this);
      this.isEmpty = this.isEmpty.bind(this);
      this.toArray = this.toArray.bind(this);
      this.topElementIdx = 0;
    }
  }

  push(elem) {
    if (this.topElementIdx === this.stackSize) {
      throw new Error('Limit exceeded');
    } else {
      this.stack[this.topElementIdx] = elem;
      this.topElementIdx++;
    }
  }

  pop() {
    if (this.topElementIdx === 0) {
      throw new Error('Empty stack');
    } else {
      let current = this.stack[this.topElementIdx - 1];
      this.stack[this.topElementIdx - 1] = undefined;
      this.topElementIdx--;
      return current;
    }
  }

  peek() {
    if (this.topElementIdx === 0) {
      return null;
    } else {
      return this.stack[this.topElementIdx - 1];
    }
  }

  isEmpty() {
    return this.topElementIdx === 0;
  }

  toArray() {
    if (this.topElementIdx === 0) {
      return [];
    } else {
      let arr = [];
      for (let i = 0; i < this.topElementIdx; i++) {
        arr[i] = this.stack[i];
      }
      return arr;
    }
  }

  static fromIterable(iterable) {
    if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Not iterable');
    } else {
      let newStackSize = 0;
      for (let item of iterable) {
        newStackSize++;
      }
      let newStack = new Stack(newStackSize);
      for (let item of iterable) {
        newStack.push(item);
      }
      return newStack;
    }
  }
}

class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.append = this.append.bind(this);
    this.prepend = this.prepend.bind(this);
    this.find = this.find.bind(this);
    this.toArray = this.toArray.bind(this);
    this.head = null;
    this.tail = null;
  }

  prepend(elem) {
    const newNode = new LinkedListNode(elem, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
  }

  append(elem) {
    const newNode = new LinkedListNode(elem);
    if (!this.head || !this.tail) {
      this.tail = newNode;
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  find(elem) {
    if (!this.head) {
      return null;
    }
    let currentNode = this.head;

    function iterator(node) {
      if (!node) {
        return null;
      } else {
        if (node.value === elem) {
          return node.value;
        } else {
          currentNode = node.next;
          return iterator(currentNode);
        }
      }
    }

    return iterator(currentNode);
  }

  toArray() {
    if (!this.head) {
      return [];
    } else {
      let arr = [];
      let index = 0;
      let currentNode = this.head;
      while (currentNode) {
        arr[index] = currentNode.value;
        index++;
        currentNode = currentNode.next;
      }
      return arr;
    }
  }

  static fromIterable(iterable) {
    if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Not iterable');
    } else {
      const newLL = new LinkedList();
      for (let item of iterable) {
        newLL.append(item);
      }
      return newLL;
    }
  }
}
