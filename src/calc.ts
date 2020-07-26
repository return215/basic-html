console.log("Loading calculator...")

// function multiply(a: number, b: number): number {
//     return a * b;
// }

// console.log(window.location)

interface ICalculatorData {
    displayFirst: boolean,
    operator: string | null,
    firstNumber: number,
    secondNumber: number,
    waitNextNumber: boolean,
    calculationDone: boolean
}

const calcData: ICalculatorData = {
    displayFirst: true,
    operator: null,
    firstNumber: 0,
    secondNumber: 0,
    waitNextNumber: false,
    calculationDone: true
}

function clearCalculator() {
    calcData.displayFirst = true
    calcData.operator = null
    calcData.firstNumber = 0
    calcData.secondNumber = 0
    calcData.waitNextNumber = false
    calcData.calculationDone = true
}

function getDisplay() {
    if(calcData.displayFirst)
        return calcData.firstNumber
    else return calcData.secondNumber
}

function setDisplay(n: number) {
    if(calcData.displayFirst)
        calcData.firstNumber = n
    else
        calcData.secondNumber = n
}

function updateDisplay() {
    let dispText = document.querySelector("#display-num")
    
    if(dispText)
        dispText.innerHTML = getDisplay().toString()
}

function inputDigit(digit: number) {
    let newDigit: number = getDisplay()

    if(calcData.waitNextNumber)
    {
        calcData.waitNextNumber = false
        if(!calcData.calculationDone)
            calcData.displayFirst = false
        newDigit = digit
    }
    else
    {
        let currentDigit = newDigit * 10 + digit

        newDigit = currentDigit
    }

    setDisplay(newDigit)
}

function invertNumber() {
    setDisplay(getDisplay() * (-1))
}

function setOperator(operator_1:string) {
    if(!calcData.displayFirst) {
        doCalculation()
    }
    calcData.operator = operator_1
    calcData.waitNextNumber = true
    calcData.calculationDone = false
}

function doCalculation() {
    let op: string | null = calcData.operator
    let tempVal: number = 0

    if(calcData.operator)
    {
        switch (op) {
            case '+':
                tempVal = calcData.firstNumber + calcData.secondNumber
                break;
            case '-':
                tempVal = calcData.firstNumber - calcData.secondNumber
                break;
            default:
                break;
        }
    }

    calcData.firstNumber = tempVal
    calcData.displayFirst = true
    calcData.waitNextNumber = true
    calcData.calculationDone = true
}

// Attaching events to buttons
const buttons = document.querySelectorAll(".button")
buttons.forEach(button => {
    if(button.classList.contains("calc-clear"))
        button.addEventListener('click', () => { clearCalculator() })
    else if(button.classList.contains("calc-negate"))
        button.addEventListener('click', () => { invertNumber() })
    else if(button.classList.contains("calc-operator"))
        button.addEventListener('click', () => { setOperator(button.innerHTML) })
    else if (button.classList.contains("calc-equals")) {
        button.addEventListener('click', () => { doCalculation() })
    }
    else
        button.addEventListener('click', () => { inputDigit(parseInt(button.innerHTML)) })

    button.addEventListener('click', () => { updateDisplay() })
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
