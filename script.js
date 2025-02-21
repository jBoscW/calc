//Initializing variables
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const extras = document.querySelectorAll('.extra');

let num1, num2, operation, result;

//function: basic
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

// function: updateDisplay and extra listeners;
function updateDisplay(num) {
    const numString = num.toString();

    if (numString.length > 10) {
        display.textContent = 'NaN';
    } else {
        display.textContent = num;
    };
}

function extraPressed(event) {
    switch (event.target.id) {
        case 'AC':
            num1 = num2 = result = null;
            operation = null;
            updateDisplay(0);
            break;
        case 'plusMinus': 
            if (num2) {
                num2 = -num2;

            } else if (num1) {
                num1 = -num1
            }
    };
}

// event listener digits and operations
function newDigit(event) {
    const digitPressedString = event.target.dataset.num;
    // wrap an if statement here for the "digit following = case"
    let num1String, num2String; 
    if (num1 != null) num1String = num1.toString();
    if (num2 != null) num2String = num2.toString();
    
    if (!num1) {
        num1 = parseFloat(digitPressedString);
        updateDisplay(num1);
    } else if (num1 && !operation) {
        num1 = parseFloat(num1String + digitPressedString);
        updateDisplay(num1);
    } else if (operation && !num2) {
        num2 = parseFloat(digitPressedString);
        updateDisplay(num2);
    } else {
        num2 = parseFloat(num2String + digitPressedString);
        updateDisplay(num2);
    };
};

function newOperatorPressed(event) {
    const opPressed = event.target.dataset.op

}

function operate(a, b, oper) {

};



//Event Listeners
numbers.forEach(numButton => numButton.addEventListener('click', newDigit));
operators.forEach(opButton => opButton.addEventListener('click', newOperatorPressed));
extras.forEach(extraButton => extraButton.addEventListener('click', extraPressed))