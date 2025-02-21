//Initializing variables
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const extras = document.querySelectorAll('.extra');

let num1, num2, operation, result;

//basic functions
function add(a, b) {
    return a+b;
};

function subtract(a, b) {
    return a-b;
};

function multiply(a, b) {
    return a*b;
};

function divide(a, b) {
    return b === 0 ? "halt criminal." : a/b;
};

// event listener functions
function newDigit(event) {
    const digitPressed = event.target.dataset.num;

    if (display.textContent.length < 10) {    
        if (!num1) {
            display.textContent = digitPressed;
            num1 = parseInt(digitPressed);
        } else if (num1 && !operation) {
            display.textContent += digitPressed;
            num1 = parseInt(display.textContent);
        } else if (operation && !num2) {
            display.textContent = digitPressed;
            num2 = parseInt(digitPressed);
        } else {
            display.textContent += digitPressed;
            num2 = parseInt(display.textContent);
        };
    };
};

function newOperatorPressed(event) {
    const opPressed = event.target.dataset.op

    if (num1 && num2) {
        result = operate(num1, num2, operation);
        display.textContent = result;
        reset(opPressed);
        
    } else if (opPressed !== 'equal') {
        operation = opPressed;
    }
}

function operate(a, b, oper) {
    if (parseInt(a) && parseInt(b)) {
        switch (oper) {
            case 'add': 
                return add(a,b); 
            case 'subtract': 
                return subtract(a,b);
            case 'multiply': 
                return multiply(a,b);
            case 'divide': 
                return divide(a,b);
        };
    } else {
        return NaN;
    }
};

// reset num1, num2, result, and operation and reassign 
function reset(opPressed) {
    num1 = result;
    operation = opPressed;
    num2 = null;
    result = null;
}

//Event Listeners
numbers.forEach(numButton => numButton.addEventListener('click', newDigit));
operators.forEach(opButton => opButton.addEventListener('click', newOperatorPressed));