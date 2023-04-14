function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...rest) {
        return curried(...args, ...rest);
      };
    }
  };
}
class Calculator {
  constructor(num1, num2) {
    if (
      !num1 ||
      !num2 ||
      typeof num1 !== 'number' ||
      (isNaN(num1) && !isFinite(num1)) ||
      typeof num2 !== 'number' ||
      (isNaN(num2) && !isFinite(num2))
    ) {
      throw new Error();
    } else {
      this.num1 = num1;
      this.num2 = num2;
      this.setX = this.setX.bind(this);
      this.setY = this.setY.bind(this);
      this.getSum = this.getSum.bind(this);
      this.getMul = this.getMul.bind(this);
      this.getSub = this.getSub.bind(this);
      this.getDiv = this.getDiv.bind(this);
    }
  }

  setX(value) {
    if (
      (value !== 0 && !value) ||
      typeof value !== 'number' ||
      (isNaN(value) && !isFinite(value))
    ) {
      throw new Error();
    } else {
      this.num1 = value;
    }
  }

  setY(value) {
    if (
      (value !== 0 && !value) ||
      typeof value !== 'number' ||
      (isNaN(value) && !isFinite(value))
    ) {
      throw new Error();
    } else {
      this.num2 = value;
    }
  }

  getSum() {
    return this.num1 + this.num2;
  }

  getMul() {
    return this.num1 * this.num2;
  }

  getSub() {
    return Math.abs(this.num1 - this.num2);
  }

  getDiv() {
    if (this.num2 === 0) {
      throw new Error();
    } else {
      return this.num1 / this.num2;
    }
  }
}

function isNaN(num) {
  return Number.isNaN(num);
}

function isFinite(num) {
  return Number.isFinite(num);
}
