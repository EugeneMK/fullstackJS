const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');
const addButtons = document.querySelector('.add_buttons')
const addBtnForm = document.addBtnForm;

let previousOperand = 0;
let currentOperand = 0;
let currentOperation = null;
const operations = new Map();
operations.set('+', (a, b) => a + b);
operations.set('-', (a, b) => a - b);
operations.set('*', (a, b) => a * b);
operations.set('/', (a, b) => a / b);

const StrigToFunction = (str) => (new Function(`return (a, b) =>${str}`))();

const clickListener = event => performInput(event.target.textContent);
const keyboardListener = event => performInput(event.key);


const performInput = (keyValue) => {
    console.log(keyValue);

    if (Number.isInteger(+keyValue) | keyValue === '.') {
        currentOperand =
            currentOperand == 0 ? keyValue : currentOperand + keyValue;
        display.textContent = currentOperand;
        return;
    }

    if (keyValue === '\u2190' | keyValue === 'Backspace') {
        currentOperand = currentOperand.slice(0, currentOperand.length - 1);
        display.textContent = currentOperand;
        return;
    }

    if (operations.has(keyValue)) {
        console.log(operations.get(keyValue));
        previousOperand = currentOperand;
        currentOperand = 0;
        currentOperation = keyValue;
        return;
    }

    if (keyValue === '=' | keyValue === 'Enter') {
        const result = operations.get(currentOperation)(+previousOperand, +currentOperand);
        display.textContent = result;
        currentOperand = result;
        previousOperand = 0;

        return;
    }

    if (keyValue === 'c' | keyValue === 'C') {
        currentOperand = 0;
        previousOperand = 0;
        currentOperation = null;
        display.innerHTML = '';
        return;
    }

    if (keyValue === '\u00B1') {
        currentOperand *= -1;
        display.textContent = currentOperand;
        return;
    }

    if (keyValue === 'add') {
        buttons.removeEventListener('click', clickListener);
        document.removeEventListener('keydown', keyboardListener);
        addBtnForm.style.display = 'block';

    }
};

buttons.addEventListener('click', clickListener);
document.addEventListener('keydown', keyboardListener);

addBtnForm.onsubmit = (event) => {
    event.preventDefault();

    const newBtnSymbol = addBtnForm.symbol.value;
    const newBtnExpression = addBtnForm.expression.value;
    operations.set(newBtnSymbol, StrigToFunction(newBtnExpression));

    const newButton = document.createElement('button');
    newButton.textContent = newBtnSymbol;
    addButtons.append(newButton);

    buttons.addEventListener('click', clickListener);
    document.addEventListener('keydown', keyboardListener);
    addBtnForm.style.display = 'none';
};

addBtnForm.cancel.onclick = () => {
    buttons.addEventListener('click', clickListener);
    document.addEventListener('keydown', keyboardListener);
    addBtnForm.style.display = 'none';
};
