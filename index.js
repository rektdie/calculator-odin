function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function modulo(a, b){
    return a % b;
}

function operate(a, b, operator){
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "X":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "%":
            return modulo(a, b);
    }
}

const numberButtons = document.querySelectorAll("button[data-value='number']");
const deleteButton = document.querySelector("button[data-value='delete']");
const clearButton = document.querySelector("button[data-value='clear']");
const operators = document.querySelectorAll("button[data-value='operator']");
const pointButton = document.querySelector("button[data-value='point']");
const equalsButton = document.querySelector("button[data-value='equals']");
const negativeButton = document.querySelector("button[data-value='negative']");
const history = document.querySelector(".history");
const result = document.querySelector(".result");

let showingResults = false;
let pieces = [];

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (result.textContent != 0 && result.textContent !== "ERROR"){
            result.textContent += button.textContent;
        } else {
            result.textContent = button.textContent;
        }
    });
});

operators.forEach(button => {
    button.addEventListener("click", () => {
        if (!showingResults){
            history.textContent += ` ${result.textContent} ${button.textContent}`;
            result.textContent = "0";
        } else {
            history.textContent = ` ${result.textContent} ${button.textContent}`
            result.textContent = 0;
            showingResults = false;
        }
    });
});

equalsButton.addEventListener("click", () => {
    if (!showingResults) {
        history.textContent += ` ${result.textContent} `;
        const toSolve = history.textContent;
        history.textContent += "=";
        
        let value = 0;
    
        pieces = toSolve.trim().split(" ");
        const num1 = Number(pieces[0]);
        const num2 = Number(pieces[2]);
        const operation = pieces[1];
    
        while (pieces.length > 2){
            if ((operation === "%" || operation === "/") && num2 == 0){
                value = "ERROR";
                break;
            }
            value = operate(num1, num2, operation);
            pieces.splice(0, 3);
            pieces.unshift(value);
        }
    
        result.textContent = value;
        showingResults = true;
    }
});

clearButton.addEventListener("click", () => {
    history.textContent = "";
    result.textContent = "0";
    showingResults = false;
});

deleteButton.addEventListener("click", () => {
    if (result.textContent != 0) {
        if (result.textContent.length != 1){
            result.textContent = result.textContent.slice(0, -1);
        } else {
            result.textContent = "0";
        }
    }
});

pointButton.addEventListener("click", () => {
    if (!result.textContent.includes(".")) {
        result.textContent += ".";
    }
});

negativeButton.addEventListener("click", () => {
    if (!result.textContent.includes("-")){
        result.textContent = "-" + result.textContent;
    } else {
        result.textContent = result.textContent.slice(1, result.textContent.length);
    }
});
