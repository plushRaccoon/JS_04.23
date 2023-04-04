checkPrompt();

function createPrompt() {
  return +prompt("Enter a number, please", "");
}

function checkPrompt() {
  const PROMPT = createPrompt();

  if (
    !Number.isInteger(PROMPT) ||
    PROMPT < 0 ||
    (Number.isNaN(PROMPT) && Number.isFinite(PROMPT))
  ) {
    console.log("Incorrect input!");
    checkPrompt();
  } else {
    console.log(`
      Number: ${PROMPT} \n
      Factorial: ${factorializePrompt(PROMPT)} \n
      Square: ${Math.pow(PROMPT, 2)} \n
      isPrime: ${isPrime(PROMPT)} \n
      isEven: ${isEven(PROMPT)} \n
      Delimeters: ${findDelimeters(PROMPT)}
      `);
  }
}

function factorializePrompt(num) {
  if (num < 0) {
    return -1;
  } else if (num == 0) {
    return 1;
  } else {
    return num * factorializePrompt(num - 1);
  }
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

  return delimeters.join(", ");
}
