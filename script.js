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

function newOperator(event) {
    const opPressed = event.target.dataset.op

    if (num1 && num2){
        switch (opPressed) {
            case 'add':
                console.log(1);
                break;
            case 'subtract':
                console.log(2);
                break;
            case 'multiply':
                console.log(3);
                break;
            case 'divide':
                console.log(4);
                break;
            case 'equal':
                console.log(5);
                break
        }
    }
    else {
        operation = opPressed;
    }
}

function operate(a, b, oper) {
    // add here
    return result;
};

 


//Event Listeners
numbers.forEach(numButton => numButton.addEventListener('click', newDigit));
operators.forEach(opButton => opButton.addEventListener('click', newOperator));