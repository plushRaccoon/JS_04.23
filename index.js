'use strict';

const INPUT = document.querySelector('.input'),
  OUTPUT = document.querySelector('.result'),
  KEYBOARD = document.querySelector('.keyboard'),
  SIGNS = ['+', '÷', '×', '-'];

KEYBOARD.addEventListener('click', (event) => {
  if (!event.target.classList.contains('key')) return;
  readInput(event);
});

let current = '';
let previous = '';
let action = '';
let error = false;

function readInput(event) {
  const TARGET = event.target;
  if (error) {
    clear();
    error = false;
    OUTPUT.textContent = '';
    INPUT.textContent = '';
  }
  if (TARGET.dataset.key === 'number') {
    appendNumber(TARGET.textContent);
    updateDisplay();
  }
  if (TARGET.dataset.key === 'action') {
    chooseAction(TARGET.textContent);
    updateDisplay();
  }
  if (TARGET.dataset.key === 'clear') {
    clear();
    updateDisplay();
  }
  if (TARGET.dataset.key === 'equal') {
    calculate();
    updateDisplay();
  }
  if (TARGET.dataset.key === 'plusmin') {
    changeState();
    updateDisplay();
  }
  if (TARGET.dataset.key === 'del') {
    del();
    updateDisplay();
  }
}

function appendNumber(number) {
  if (!validateInput(number, current)) return;
  if (current.length === 15 && number === '00') {
    current += 0;
  } else {
    current += number;
  }
}

function chooseAction(operation) {
  if (current === '' && action !== '' && previous !== '') {
    action = operation;
  } else if (previous !== '') {
    calculate();
  } else {
    action = operation;
    previous = current;
    current = '';
  }
}

function clear() {
  current = '';
  previous = '';
  action = '';
}

function calculate() {
  let cur = +parseFloat(current),
    prev = +parseFloat(previous);

  if (isNaN(prev) || isNaN(cur)) return;

  let computation = compute(cur, prev);

  if (error) {
    clear();
    current = "You can't divide by zero";
    error = true;
  } else {
    current = computation;
    action = '';
    previous = '';
  }
}

function changeState() {
  const CUR = current.toString();
  if (CUR.includes('-')) {
    current = CUR.replace('-', '');
  } else {
    current = `-${CUR}`;
  }
}

function del() {
  const CUR = current.toString();
  current = CUR.slice(0, -1);
}

function updateDisplay() {
  OUTPUT.style.fontSize = '2.5rem';
  if (current > 10000000000 || OUTPUT.textContent.length > 11) {
    OUTPUT.style.fontSize = '2rem';
    if (current.length > 1000000000000 || OUTPUT.textContent.length > 13) {
      OUTPUT.style.fontSize = '1.5rem';
    }
  } else {
    if (error) {
      OUTPUT.style.fontSize = '1.3rem';
      OUTPUT.textContent = current;
    }
  }
  OUTPUT.textContent = beautifyNumber(current);
  if (current > 10000000000 || OUTPUT.textContent.length > 11) {
    OUTPUT.style.fontSize = '2rem';
    if (current.length > 1000000000000 || OUTPUT.textContent.length > 13) {
      OUTPUT.style.fontSize = '1.5rem';
    }
  }
  if (action !== null) {
    INPUT.textContent = `${beautifyNumber(previous)} ${action}`;
  } else {
    INPUT.textContent = '';
  }
}

function beautifyNumber(number) {
  if (error) return number;
  const stringNumber = number.toString(),
    decimalDigits = stringNumber.split('.')[1];

  let integerDigits, integerDisplay;

  if (
    +number >= Number.MAX_SAFE_INTEGER ||
    +number <= Number.MIN_SAFE_INTEGER
  ) {
    return (+number).toExponential(8);
  } else {
    integerDigits = parseFloat(stringNumber.split('.')[0]);
  }

  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('ru');
  }
  if (decimalDigits != undefined) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function compute(cur, prev) {
  let computation;
  switch (action) {
    case '+':
      computation = prev + cur;
      break;
    case '-':
      computation = prev - cur;
      break;
    case '÷':
      if (cur === 0 || cur === -0) {
        error = true;
        return false;
      } else {
        computation = prev / cur;
      }
      break;
    case '×':
      computation = prev * cur;
      break;
    default:
      return;
  }
  return computation;
}

function validateInput(value, last) {
  let maxLength = last.includes('.') ? 17 : 16;

  if (last.length < maxLength) {
    if (last.includes('.') && value === '.') {
      return false;
    }

    if (SIGNS.includes(value)) {
      if (SIGNS.includes(last)) {
        return false;
      } else {
        return true;
      }
    }
  } else {
    return false;
  }

  return true;
}
