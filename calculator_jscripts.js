document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;

    const updateDisplay = (value) => {
        display.textContent = value;
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (value === null) {
                if (button.classList.contains('clear')) {
                    currentInput = '0';
                    operator = null;
                    previousInput = null;
                }
                updateDisplay(currentInput);
                return;
            }

            if (button.classList.contains('operator')) {
                if (operator && previousInput !== null) {
                    currentInput = evaluate(previousInput, currentInput, operator);
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            } else if (value === '=') {
                if (operator && previousInput !== null) {
                    currentInput = evaluate(previousInput, currentInput, operator);
                    operator = null;
                    previousInput = null;
                }
            } else {
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
            }
            updateDisplay(currentInput);
        });
    });

    const evaluate = (a, b, operator) => {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return b.toString();
        }
    };
});
