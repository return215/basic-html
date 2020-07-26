"use strict";
console.log("Loading calculator...");
var calcData = {
    displayFirst: true,
    operator: null,
    firstNumber: 0,
    secondNumber: 0,
    waitNextNumber: false,
    calculationDone: true
};
function clearCalculator() {
    calcData.displayFirst = true;
    calcData.operator = null;
    calcData.firstNumber = 0;
    calcData.secondNumber = 0;
    calcData.waitNextNumber = false;
    calcData.calculationDone = true;
}
function getDisplay() {
    if (calcData.displayFirst)
        return calcData.firstNumber;
    else
        return calcData.secondNumber;
}
function setDisplay(n) {
    if (calcData.displayFirst)
        calcData.firstNumber = n;
    else
        calcData.secondNumber = n;
}
function updateDisplay() {
    var dispText = document.querySelector("#display-num");
    if (dispText)
        dispText.innerHTML = getDisplay().toString();
}
function inputDigit(digit) {
    var newDigit = getDisplay();
    if (calcData.waitNextNumber) {
        calcData.waitNextNumber = false;
        if (!calcData.calculationDone)
            calcData.displayFirst = false;
        newDigit = digit;
    }
    else {
        var currentDigit = newDigit * 10 + digit;
        newDigit = currentDigit;
    }
    setDisplay(newDigit);
}
function invertNumber() {
    setDisplay(getDisplay() * (-1));
}
function setOperator(operator_1) {
    if (!calcData.displayFirst) {
        doCalculation();
    }
    calcData.operator = operator_1;
    calcData.waitNextNumber = true;
    calcData.calculationDone = false;
}
function doCalculation() {
    var op = calcData.operator;
    var tempVal = 0;
    if (calcData.operator) {
        switch (op) {
            case '+':
                tempVal = calcData.firstNumber + calcData.secondNumber;
                break;
            case '-':
                tempVal = calcData.firstNumber - calcData.secondNumber;
                break;
            default:
                break;
        }
    }
    calcData.firstNumber = tempVal;
    calcData.displayFirst = true;
    calcData.waitNextNumber = true;
    calcData.calculationDone = true;
}
// Attaching events to buttons
var buttons = document.querySelectorAll(".button");
buttons.forEach(function (button) {
    if (button.classList.contains("calc-clear"))
        button.addEventListener('click', function () { clearCalculator(); });
    else if (button.classList.contains("calc-negate"))
        button.addEventListener('click', function () { invertNumber(); });
    else if (button.classList.contains("calc-operator"))
        button.addEventListener('click', function () { setOperator(button.innerHTML); });
    else if (button.classList.contains("calc-equals")) {
        button.addEventListener('click', function () { doCalculation(); });
    }
    else
        button.addEventListener('click', function () { inputDigit(parseInt(button.innerHTML)); });
    button.addEventListener('click', function () { updateDisplay(); });
});
/* CASE TEST
 *
 * 1. 2 + 3 =
 *    ==> 5
 * 2. 3 + 2 = = =
 *    ==> 5
 *    ==> 7
 *    ==> 9
 * 3. 2 + 4 = 3 - 6
 *    ==> 6
 *    ==> -3
 * 4. 3 - 5 + 4 =
 *    ==> -2
 *    ==> 2
 * */
