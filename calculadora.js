const display = document.querySelector(".display");
const displayResult = document.querySelector(".display-result");
let numbers = [];
let actualNumber = "";
let operations = "";
let displayAll = "";


addDigit = (digit) => {
    if(displayAll.length < 20){
        actualNumber += digit;
        displayAll += digit;
    }
    display.value = displayAll;
}

const parseAndPush = () => {
    const parsedValue = parseFloat(actualNumber);
    if(!Number.isNaN(parsedValue)){
        numbers.push(parsedValue);
    }
    actualNumber = "";    
}

const addSquareRootOperation = () => {
    parseAndPush();
    let operationResult = Math.round(Math.sqrt(numbers[0]) * 1000 + Number.EPSILON)/1000;
    
    if(Number.isNaN(operationResult)){
        display.value = "error";
    }
    else
    {
        display.value = operationResult;
        actualNumber = operationResult.toString();
    }

    numbers = [];
    operations = "";
}

const addComma = () => {
    if(!actualNumber.includes(".")){
        addDigit(".");
    }
}

const addOperation = (operation) => {
    displayAll += operation;

    if(operation === "×"){
        operation = "*"
    }
    if(operation === "÷"){
        operation = "/"
    }

    parseAndPush();

    if(numbers.length === 2){
        getResult(operations);
    }
    operations = operation;
    
    display.value = displayAll;
}

const getResult = (operation) => {
    let operationResult = 0;

    if(operation === "="){
        parseAndPush();
        operation = operations;
    }

    switch(operation) 
    {
        case "+":
            operationResult = numbers[0] + numbers[1];
        break;
        case "-":
            operationResult = numbers[0] - numbers[1];
        break;
        case "*":
            operationResult = numbers[0] * numbers[1];
        break;
        case "/":
            operationResult = numbers[0] / numbers[1];
        break;    
    }

    numbers = [];
    operationResult = Math.round(operationResult * 1000 + Number.EPSILON)/1000;

    if(operationResult.toString().length > 10 || operationResult === Infinity){
        operationResult = "error";
        actualNumber = "";
    }
    else
    {
        numbers[0] = operationResult;
    }
    displayResult.value = operationResult;
}

const handleCleanInput = () => {
    display.value = "0";
    displayAll = "";
    displayResult.value = "0";
    numbers = [];
    actualNumber = "";
};

const registerEventListeners = () => {
    const numberButtons = document.querySelectorAll(".buttons");
    numberButtons.forEach(numberButton => {
        numberButton.addEventListener("click", () => {
            const number = numberButton.textContent;
            addDigit(number);
        });
    });

    const cleanButton = document.querySelector(".button-clean");
    cleanButton.addEventListener("click", () => {
        handleCleanInput();
    });

    const operationButtons = document.querySelectorAll(".button-operation");
    operationButtons.forEach(operationButton => {
        operationButton.addEventListener("click", () => {
            const operation = operationButton.textContent;
            addOperation(operation);
        });
    });

    const squareRootButton = document.querySelector(".button-squareroot");
    squareRootButton.addEventListener("click", () => {
        addSquareRootOperation();
    });

    const commaButton = document.querySelector(".button-comma");
    commaButton.addEventListener("click", () => {
        addComma();
    });

    const equalButton = document.querySelector(".button-equal");
    equalButton.addEventListener("click", () => {
        getResult("=");
    });
  }
registerEventListeners();