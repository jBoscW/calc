const buttons = document.querySelectorAll('button')

const numbers = buttons.querySelectorAll('.number')
const operators = buttons.querySelectorAll('.operator')
const extras = buttons.querySelectorAll('.extra')


function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
};

function divide(a, b) {
    return b === 0 ? "halt criminal." : a/b;
};

let num1, num2, operation, result;

function operate(a, b, oper) {

};

console.log(NaN + 3)

