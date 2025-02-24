//Initializing variables
const display = document.querySelector('.display');

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const extras = document.querySelectorAll('.extra');


let num1, num2, operation, result, equalPressed;

//Function: basic
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
    return b === 0 ? "criminal." : a/b;
};

// Function: updateDisplay and extra listeners;
function updateDisplay(num) {
    const numString = num.toString();

    if (num === 'criminal.') {
        display.textContent = num;
        num1 = num2 = result = operation = null;
    } else if ((num / (10 ** 10) >= 1) && numString.length > 10) {
        display.textContent = 'NaN';
    } else {
        display.textContent = num;
    };
};

function extraPressed() {
    switch (this.id) {
        case 'AC':
            num1 = num2 = result = operation = null;
            updateDisplay(0);
            break;
        case 'plusMinus': 
            if (num2) {
                num2 = -num2;
                updateDisplay(num2);
            } else if (num1) {
                num1 = -num1;
                updateDisplay(num1);
            };
            break;
        case 'percentage':
            if (num2) {
                num2 /= 100;
                updateDisplay(num2);
            } else if (num1) {
                num1 /= 100;
                updateDisplay(num1);
            };
            break;
    };
};

// Function: Event Listener Digits And Operations
function newDigit() {
    const digitPressedString = this.dataset.num;

    let num1String, num2String; 
    if (num1 != null) num1String = num1.toString();
    if (num2 != null) num2String = num2.toString();
    
    // this code seemed the most readable? maybe there's smth better
    if ((num1 == null) || equalPressed) {
        num1 = parseFloat(digitPressedString);
        updateDisplay(num1);
        equalPressed = false;
    } else if ((num1 != null) && !operation) {
        num1 = parseFloat(num1String + digitPressedString);
        updateDisplay(num1);
    } else if (operation && (num2 == null)) {
        num2 = parseFloat(digitPressedString);
        updateDisplay(num2);
    } else {
        num2 = parseFloat(num2String + digitPressedString);
        updateDisplay(num2);
    };
};

function newOperatorPressed() {
    const opPressed = this.dataset.op;
    operators.forEach(button => button.className = 'operator');
    
    if (display.textContent !== 'criminal.') {
        // just checking for 'num2' excludes 0.
        if ((num1 != null) && (num2 != null)) {
            result = operate(num1, num2, operation);
            updateDisplay(result);

            num1 = result;
            num2 = result = operation = null;
        } 
        
        // couldn't think of another way of connecting digits to operators (hence equalPressed) 
        // for digit after 0.
        if (opPressed === 'equal') {
            equalPressed = true;
        }
        else {
            operation = opPressed;
            equalPressed = false;
            this.classList.add('colorOperator');
        } 
    };
}

function operate(a, b, oper) {
    if ((parseFloat(a)) != null && parseFloat(b) != null) {
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



//Event Listeners
numbers.forEach(button => button.addEventListener('click', newDigit));
operators.forEach(button => button.addEventListener('click', newOperatorPressed));
extras.forEach(button => button.addEventListener('click', extraPressed))