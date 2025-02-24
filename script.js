//Initializing variables
const display = document.querySelector('.display');

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const extras = document.querySelectorAll('.extra');
const dot = document.querySelector('#dot');

let num1, num2, operation, result, equalPressed, dotPressed;

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
    if (num === 'criminal.') {
        display.textContent = num;
        num1 = num2 = result = operation = null;
    } else {
        const numString = num.toString();

        const intPart = numString.split('.')[0];
        const intLength = intPart ? intPart.length : 0;
        const decPart = numString.split('.')[1];
        const decLength = decPart ? decPart.length : 0;
        

        // the dot counts as one btw
        if ((intLength + decLength) > 9 && intLength < 9 && numString.length > 9) {
            const decimalShown = 9 - intLength;
            const shown = Math.floor(num * 10**decimalShown) / (10**decimalShown);
            if (shown.toString().length > 10) 
                shown = NaN;
            display.textContent = shown;
        } else if (intLength <= 10 && numString.length <= 10) {
            display.textContent = num;
        } else {
            display.textContent = 'NaN';
        };
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
    // check if it's the first digit or not
    if ((num1 == null) || equalPressed) {
        num1 = dotHelper1(digitPressedString);
        updateDisplay(num1);
        equalPressed = false;
    } else if ((num1 != null) && !operation) {
        num1 = dotHelper2(num1String, digitPressedString);
        updateDisplay(num1);
    } else if (operation && (num2 == null)) {
        num2 = dotHelper1(digitPressedString);
        updateDisplay(num2);
    } else {
        num2 = dotHelper2(num2String, digitPressedString);
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

//for the first digit;
function dotHelper1(numPressed) {
    let numUpdate; 

    if (dotPressed) {
        numUpdate = parseFloat('0.' + numPressed);
    } else {
        numUpdate = parseFloat(numPressed); 
    }

    dotPressed = false;
    return numUpdate;
}

//for the second digit onwards;
function dotHelper2(numString, numPressed) {
    let numUpdate;

    if (!numString.includes('.') && dotPressed) {
        numUpdate = parseFloat(numString + '.' + numPressed);
    } else {
        numUpdate = parseFloat(numString + numPressed);
    }

    dotPressed = false;
    return numUpdate;
}


//Event Listeners
numbers.forEach(button => button.addEventListener('click', newDigit));
operators.forEach(button => button.addEventListener('click', newOperatorPressed));
extras.forEach(button => button.addEventListener('click', extraPressed))
dot.addEventListener('click', () => {
    dotPressed = true;
})