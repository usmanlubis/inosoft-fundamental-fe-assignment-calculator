// DOM
const display = document.querySelector(".screen");
const subScreen = document.querySelector(".sub-screen");
const inputs = document.querySelectorAll(".input");

// Init value
let operator = "";
let previousNumber = "";
let currentNumber = "";
let counted = false;

// Functions
function inverseNumber() {
  if (display.textContent === "0") {
    return;
  }
  display.textContent = display.textContent * -1;

  if (operator === "") {
    previousNumber = display.textContent;
  } else {
    currentNumber = display.textContent;
  }
}

function inputDigit(input) {
  updateDisplay(input);
}

function updateDisplay(value) {
  if (counted === true) {
    display.textContent = value;
    counted = false;
  } else {
    if (display.textContent === "0") {
      display.textContent = value;
    } else {
      display.textContent += value;
    }

    if (operator === "") {
      previousNumber = display.textContent;
    } else {
      currentNumber = display.textContent;
    }
  }
}

function updateSubScreen(value) {
  subScreen.textContent = value;
}

function inputOperator(value) {
  if (display.textContent === "0") {
    return;
  }
  updateSubScreen(display.textContent + value);
  display.textContent = "0";

  if (value === "×") {
    operator = "*";
  } else if (value === "÷") {
    operator = "/";
  } else if (value === "+") {
    operator = "+";
  } else {
    operator = "-";
  }
}

function commaOperator() {
  if (display.textContent.includes(".")) {
    return;
  }

  if (display.textContent === "0") {
    updateDisplay("0.");
  } else {
    updateDisplay(".");
  }
}

function resetDisplay() {
  display.textContent = "0";
  subScreen.innerHTML = "&nbsp;"

  if (subScreen.textContent === "") {
    previousNumber = "0";
  } else {
    currentNumber = "0";
  }
}

function resetSubScreen() {
  subScreen.textContent = "0";
  operator = "";
  previousNumber = "";
  currentNumber = "";
  resetDisplay();
}

function countResult() {
  if (subScreen.textContent === "") {
    return;
  }

  let result = eval(previousNumber + operator + currentNumber);
  display.textContent = result;

  previousNumber = "0";
  currentNumber = "0";
  counted = true;
  operator = "";
  
  subScreen.textContent = "0";
}

function percentageOperator() {
  display.textContent = display.textContent / 100;
  if (operator === "") {
    previousNumber = display.textContent;
  } else {
    currentNumber = display.textContent;
  }
}


// Events
inputs.forEach((input) => {
  input.addEventListener("click", (e) => {
    let target = e.target;

    if (target.classList.contains("negative")) {
      inverseNumber();
    } else if (target.classList.contains("substract")) {
      inputOperator("-");
    } else if (target.classList.contains("add")) {
      inputOperator("+");
    } else if (target.classList.contains("multiply")) {
      inputOperator("×");
    } else if (target.classList.contains("divide")) {
      inputOperator("÷");
    } else if (target.classList.contains("equal")) {
      countResult();
    } else if (target.classList.contains("clear")) {
      resetDisplay();
    } else if (target.classList.contains("all-clear")) {
      resetSubScreen();
    } else if (target.classList.contains("comma")) {
      commaOperator();
    } else if (target.classList.contains("percentage")) {
      percentageOperator();
    } else {
      inputDigit(target.textContent);
    }
  });
});

window.addEventListener("keydown", (e) => {
  if (e.key === "-") {
    inputOperator("-");
  } else if (e.key === "+") {
    inputOperator("+");
  } else if (e.key === "*") {
    inputOperator("×");
  } else if (e.key === "/") {
    inputOperator("÷");
  } else if (e.key === "=" || e.key === "Enter") {
    countResult();
  } else if (e.key === "Backspace") {
    resetDisplay();
  } else if (e.key === "Escape") {
    resetSubScreen();
  } else if (e.key === ".") {
    commaOperator();
  } else if (e.key === "%") {
    percentageOperator();
  } else if (e.key >= "0" && e.key <= "9") {
    inputDigit(e.key);
  }
});
