// the first task

checkNumber();

function checkNumber() {
  const NUMBER = +prompt('Enter a number, please', '');

  if (!isInteger(NUMBER) || NUMBER < 0 || (isNaN(NUMBER) && isFinite(NUMBER))) {
    console.log('Incorrect input!');
    checkNumber();
  } else {
    console.log(`
      Number: ${NUMBER} \n
      Factorial: ${factorializeNumber(NUMBER)} \n
      Square: ${Math.pow(NUMBER, 2)} \n
      isPrime: ${isPrime(NUMBER)} \n
      isEven: ${isEven(NUMBER)} \n
      Delimeters: ${findDelimeters(NUMBER)}
      `);
  }
}

function isInteger(num) {
  return Number.isInteger(num);
}

function isNaN(num) {
  return Number.isNaN(num);
}

function isFinite(num) {
  return Number.isFinite(num);
}

function factorializeNumber(num) {
  let result = num;

  if (num === 0 || num === 1) return 1;
  while (num > 1) {
    num--;
    result *= num;
  }
  return result;
}

function isPrime(num) {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return num > 1;
}

function isEven(num) {
  return num % 2 == 0;
}

function findDelimeters(num) {
  let delimeters = [];

  for (let i = num; i >= 1; i--) {
    if (num % i == 0) {
      delimeters.push(i);
    }
  }

  return delimeters.join(', ');
}

// the second task

checkSymbols();

function checkSymbols() {
  const SYMBOLS = prompt('Type from 1 to 3 symbols, please', '');
  const CONDITION = /^\S{1,3}$/gi;

  if (!SYMBOLS.match(CONDITION) || SYMBOLS === null) {
    console.log('Incorrect input!');
    checkSymbols();
  } else {
    checkMatrixSize(SYMBOLS);
  }
}

function checkMatrixSize(symbols) {
  const SIZE = +prompt('Enter a number, please', '');

  if (
    !isInteger(SIZE) ||
    SIZE < 0 ||
    SIZE > 10 ||
    (isNaN(SIZE) && isFinite(SIZE))
  ) {
    console.log('Incorrect input!');
    checkMatrixSize(symbols);
  } else {
    console.log(`${showMatrix(symbols, SIZE)}`);
  }
}

function showMatrix(symbols, size) {
  const MATRIX = Array(size).fill(Array(size).fill(symbols), 0, size);
  let result = '';

  for (let i = 0; i < MATRIX.length; i++) {
    result += ` ${MATRIX[i].join(' ')} \n`;
  }

  return result;
}
