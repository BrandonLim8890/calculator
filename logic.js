var display_num = '';   // current display number
var num1 = '';
var num2 = '';
var operation = '';
var continuity = true;  // variable allows calculator to keep working after = sign is clicked

function initializeButtons() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach((number) => {
        number.addEventListener('click', (e) => {
            display_num += e.target.innerText;
            display(display_num);
        });
    });

    const clear_button = document.querySelector('.clear');
    clear_button.addEventListener('click', () => {
        display_num = '';
        num1 = '';
        num2 = '';
        operator = '';
        display(display_num);
    });


    const operators = document.querySelectorAll('.operator');
    operators.forEach((operator) => {
        operator.addEventListener('click', (e) => {
            if (num1 && continuity) {   // if the user is doing multiple operations at once eg 1 + 2 + 3.
                num2 = display_num;     // needs to store the display value in the correct place
                operate(operation, num1, num2);
                num1 = display_num;
                num2 = '';
                operation = '';
            }
            num1 = display_num;
            operation = e.target.innerText;
            display_num = '';
            display(display_num);
            continuity = true;          // turns on continuity mode if its the first time a number is inputted
        });
    });

    const equal_button = document.querySelector('.equal');
    equal_button.addEventListener('click', (e) => {
        continuity = false;
        num2 = display_num;
        operate(operation, num1, num2);
        num2 = '';
        num1 = display_num;
    });

}

function display(display_num) {
    const display = document.querySelector('.display span');
    display.textContent = display_num;
}

function add(num1, num2) {
    return parseInt(num1) + parseInt(num2);
}

function subtract(num1, num2) {
    return parseInt(num1) - parseInt(num2);
}

function multiply(num1, num2) {
    return parseInt(num1) * parseInt(num2);
}

function divide(num1, num2) {
    if (num2)
        return 'Unable to divide by 0'
    return parseInt(num1) / parseInt(num2);
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            display_num = add(num1, num2);
            display(display_num);
            break;
        case '-':
            display_num = subtract(num1, num2);
            display(display_num);
            break;
        case '/':
            display_num = divide(num1, num2);
            display(display_num);
            break;
        case 'x':
            display_num = multiply(num1, num2);
            display(display_num);
            break;
        default:
            break;
    }
}

initializeButtons();