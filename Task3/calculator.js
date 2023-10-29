const display = document.getElementById('display');
const buttons = document.querySelectorAll('input[type="button"]');
let currentInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'C') {
            display.value = '';
            currentInput = '';
        } else if (value === '=') {
            try {
                const result = evaluateExpression(currentInput);
                display.value = result;
                currentInput = result.toString();
            } catch (error) {
                display.value = 'Error';
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

function evaluateExpression(expression) {
    try {
        const operators = ['+', '-', '*', '/'];
        const tokens = expression.match(/[+\-*/]|\d+/g);
        const stack = [];
        let currentOperator = null;

        for (const token of tokens) {
            if (operators.includes(token)) {
                currentOperator = token;
            } else {
                const number = parseFloat(token);
                if (currentOperator === null) {
                    stack.push(number);
                } else if (currentOperator === '+') {
                    stack.push(number);
                } else if (currentOperator === '-') {
                    stack.push(-number);
                } else if (currentOperator === '*') {
                    const prev = stack.pop();
                    stack.push(prev * number);
                } else if (currentOperator === '/') {
                    const prev = stack.pop();
                    stack.push(prev / number);
                }
                currentOperator = null;
            }
        }

        return stack.reduce((acc, num) => acc + num, 0);
    } catch (error) {
        throw new Error('Invalid input');
    }
}