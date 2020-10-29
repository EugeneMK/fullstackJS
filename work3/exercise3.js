const Calc = function () {
    let historyStorage = [];
    const operations = [
        {
            operator: '+',
            action: (a, b) => a + b
        },
        {
            operator: '-',
            action: (a, b) => a - b 
        }
    ];

    this.operation = function (expressionString) {
        const elements = expressionString.split(' ');
        const operator = elements[1];
        const operand1 = Number(elements[0]);
        const operand2 = Number(elements[2]);

        historyStorage.push({
            operation: operator,
            operands: [operand1, operand2]
        });

        const operation = operations.find(operation => operation.operator == operator);
        return operation ? operation.action(operand1, operand2) : 'No such operation added yet!';
    };

    this.addOperation = function (operator, action) {
        operations.push({operator, action});
    };

    this.history = function () {
        return historyStorage;
    };

    this.clearHistory = function () {
        historyStorage = [];
    };
};