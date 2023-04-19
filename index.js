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
    return [...this.stack].filter((i) => i || i == 0);
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
