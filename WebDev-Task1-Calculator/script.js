const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const equalsBtn = document.querySelector(".equals");

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let shouldResetScreen = false;

// Number Buttons
numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (display.value === "Error") {
            display.value = "";
        }

        if (shouldResetScreen) {
            display.value = "";
            shouldResetScreen = false;
        }

        // Prevent multiple decimals
        if (
            button.textContent === "." &&
            display.value.includes(".")
        ) {
            return;
        }

        display.value += button.textContent;
    });
});

// Operator Buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (display.value === "") return;

        // Operator chaining
        if (
            firstNumber !== "" &&
            currentOperator !== "" &&
            !shouldResetScreen
        ) {
            calculate();
        }

        firstNumber = display.value;
        currentOperator = button.textContent;
        shouldResetScreen = true;
    });
});

// Equals
equalsBtn.addEventListener("click", () => {

    if (
        firstNumber === "" ||
        currentOperator === "" ||
        display.value === ""
    ) {
        return;
    }

    secondNumber = display.value;
    calculate();
});

// Clear
clearBtn.addEventListener("click", () => {
    display.value = "";
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
});

// Delete
deleteBtn.addEventListener("click", () => {

    if (display.value === "Error") {
        display.value = "";
        return;
    }

    display.value = display.value.slice(0, -1);
});

// Function Calculate
function calculate() {

    secondNumber = display.value;

    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);

    let result;

    switch (currentOperator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "×":
            result = num1 * num2;
            break;

        case "÷":

            if (num2 === 0) {
                display.value = "Error";
                firstNumber = "";
                secondNumber = "";
                currentOperator = "";
                return;
            }

            result = num1 / num2;
            break;

        default:
            return;
    }

    result = Number(result.toFixed(10));

    display.value = result;

    firstNumber = result.toString();
    currentOperator = "";
    shouldResetScreen = true;
}
