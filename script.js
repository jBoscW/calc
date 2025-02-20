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
        operate(num1, num2, operation);
        display.textContent = result;
        reset(opPressed)
        }
    else {
        if (opPressed != 'equals')
            operation = opPressed;
    }
}

function operate(a, b, oper) {
    if (parseInt(a) && parseInt(b)) {
        switch (oper) {
            case 'add': 
                result = add(a,b); 
                break;
            case 'subtract': 
                result = subtract(a,b);
                break;
            case 'multiply': 
                result = multiply(a,b);
                break;
            case 'divide': 
                result = divide(a,b);
                break;
            case 'equal': 
                result = operate(a, b, operation);
                break;
        };
    } else {
        result = NaN;
    }
};

// reset num1, num2, result, and operation and reassign 
function reset(opPressed) {
    if (opPressed === 'equal') {
        
    } else {
        num1 = result;
        operation = opPressed;
        num2 = null;
        result = null;
    };
}

//Event Listeners
numbers.forEach(numButton => numButton.addEventListener('click', newDigit));
operators.forEach(opButton => opButton.addEventListener('click', newOperatorPressed));