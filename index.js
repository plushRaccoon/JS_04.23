// the first task

checkPrompt1();

function checkPrompt1() {
  const NUMBER = +prompt('Enter a number, please', '');

  if (!isInteger(NUMBER) || NUMBER < 0 || (isNaN(NUMBER) && isFinite(NUMBER))) {
    console.log('Incorrect input!');
    checkPrompt1();
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


