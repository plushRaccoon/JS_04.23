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

function isNaN(num) {
  return Number.isNaN(num);
}

function isFinite(num) {
  return Number.isFinite(num);
}

function isInteger(num) {
  return Number.isInteger(num);
}

class Car {
  #brand = '';
  #model = '';
  #yearOfManufacturing = 1950;
  #maxSpeed = 100;
  #maxFuelVolume = 20;
  #fuelConsumption = 1;
  #damage = 1;
  #currentFuelVolume = 0;
  #isStarted = false;
  #health = 100;
  #mileage = 0;

  constructor() {}

  get brand() {
    return this.#brand;
  }
  set brand(value) {
    if (
      typeof value !== 'string' ||
      value.trim().length < 1 ||
      value.trim().length > 50
    ) {
      throw new Error('Invalid brand name');
    } else {
      this.#brand = value.trim();
    }
  }

  get model() {
    return this.#model;
  }
  set model(value) {
    if (
      typeof value !== 'string' ||
      value.trim().length < 1 ||
      value.trim().length > 50
    ) {
      throw new Error('Invalid model name');
    } else {
      this.#model = value.trim();
    }
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }
  set yearOfManufacturing(value) {
    if (
      typeof value !== 'number' ||
      value < 1950 ||
      value > new Date().getFullYear() ||
      !isInteger(value) ||
      isNaN(value) ||
      !isFinite(value)
    ) {
      throw new Error('Invalid year of manufacturing');
    } else {
      this.#yearOfManufacturing = value;
    }
  }

  get maxSpeed() {
    return this.#maxSpeed;
  }
  set maxSpeed(value) {
    if (
      typeof value !== 'number' ||
      value < 100 ||
      value > 330 ||
      !isInteger(value) ||
      isNaN(value) ||
      !isFinite(value)
    ) {
      throw new Error('Invalid max speed');
    } else {
      this.#maxSpeed = value;
    }
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }
  set maxFuelVolume(value) {
    if (
      typeof value !== 'number' ||
      value < 20 ||
      value > 100 ||
      !isInteger(value) ||
      isNaN(value) ||
      !isFinite(value)
    ) {
      throw new Error('Invalid max fuel volume');
    } else {
      this.#maxFuelVolume = value;
    }
  }

  get fuelConsumption() {
    return this.#fuelConsumption;
  }
  set fuelConsumption(value) {
    if (
      typeof value !== 'number' ||
      value < 1 ||
      !isInteger(value) ||
      isNaN(value) ||
      !isFinite(value)
    ) {
      throw new Error('Invalid fuel consumption');
    } else {
      this.#fuelConsumption = value;
    }
  }

  get damage() {
    return this.#damage;
  }
  set damage(value) {
    if (
      typeof value !== 'number' ||
      value < 1 ||
      value > 5 ||
      !isInteger(value) ||
      isNaN(value) ||
      !isFinite(value)
    ) {
      throw new Error('Invalid damage');
    } else {
      this.#damage = value;
    }
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }

  get isStarted() {
    return this.#isStarted;
  }

  get health() {
    return this.#health;
  }

  get mileage() {
    return this.#mileage;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('Car has already started');
    } else {
      this.#isStarted = true;
    }
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error("Car hasn't started yet");
    } else {
      this.#isStarted = false;
    }
  }

  fillUpGasTank(fuelLiter) {
    if (
      typeof fuelLiter !== 'number' ||
      fuelLiter <= 0 ||
      !isInteger(fuelLiter) ||
      isNaN(fuelLiter) ||
      !isFinite(fuelLiter)
    ) {
      throw new Error('Invalid fuel amount');
    } else if (this.#currentFuelVolume + fuelLiter > this.#maxFuelVolume) {
      throw new Error('Too much fuel');
    } else if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    } else {
      this.#currentFuelVolume += fuelLiter;
    }
  }

  drive(speed, hours) {
    let wayLength = speed * hours;
    let fuelNeeds = Math.floor((wayLength * this.#fuelConsumption) / 100);
    let healthNeeds = Math.floor((wayLength * this.#damage) / 100);
    if (
      typeof speed !== 'number' ||
      speed <= 0 ||
      !isInteger(speed) ||
      isNaN(speed) ||
      !isFinite(speed)
    ) {
      throw new Error('Invalid speed');
    } else if (
      typeof hours !== 'number' ||
      hours <= 0 ||
      !isInteger(hours) ||
      isNaN(hours) ||
      !isFinite(hours)
    ) {
      throw new Error('Invalid duration');
    } else if (speed > this.#maxSpeed) {
      throw new Error("Car can't go this fast");
    } else if (!this.#isStarted) {
      throw new Error('You have to start your car first');
    } else if (fuelNeeds > this.#currentFuelVolume) {
      throw new Error("You don't have enough fuel");
    } else if (healthNeeds > this.#health) {
      throw new Error('Your car won’t make it');
    } else {
      this.#currentFuelVolume -= fuelNeeds;
      this.#health -= healthNeeds;
      this.#mileage += wayLength;
    }
  }

  repair() {
    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    } else if (this.#currentFuelVolume < this.#maxFuelVolume) {
      throw new Error('You have to fill up your gas tank first');
    } else {
      this.#health = 100;
    }
  }

  getFullAmount() {
    if (this.#currentFuelVolume === this.#maxFuelVolume) {
      return 0;
    } else {
      return this.#maxFuelVolume - this.#currentFuelVolume;
    }
  }
}
