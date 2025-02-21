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
    return b === 0 ? "halt criminal." : a/b;
};

// Function: updateDisplay and extra listeners;
function updateDisplay(num) {
    const numString = num.toString();

    // if (numString.length > 100) {
    //     display.textContent = 'NaN';
    // } else {
        display.textContent = num;
    // };
};

function extraPressed(event) {
    switch (event.target.id) {
        case 'AC':
            reset('AC')
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
    
    if (!num1 || equalPressed) {
        num1 = parseFloat(digitPressedString);
        updateDisplay(num1);

        equalPressed = false;
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

function newOperatorPressed() {
    const opPressed = this.dataset.op;
    const clearShine = [
        () => operators.forEach(button => button.className = 'operator'), 
    ];
    clearShine[0]();
    
    if (num1 && num2) {
        result = operate(num1, num2, operation);
        updateDisplay(result);
        reset(); 
    } 
    
    if (opPressed === 'equal') {
        equalPressed = true;
        clearShine[0]();
    }
    else {
        operation = opPressed;
        equalPressed = false;

        clearShine[0]();
        this.classList.add('colorOperator');
    } 
}

function operate(a, b, oper) {
    if (parseFloat(a) && parseFloat(b)) {
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

function reset(AC = false) {
    AC ? (num1 = null) : (num1 = result);

    num2 = result = operation = null; 
}


//Event Listeners
numbers.forEach(button => button.addEventListener('click', newDigit));
operators.forEach(button => button.addEventListener('click', newOperatorPressed));
extras.forEach(button => button.addEventListener('click', extraPressed))