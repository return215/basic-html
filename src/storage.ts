const CACHE_KEY = "calc-history"

function checkForStorage(): boolean {
    return typeof(Storage) !== undefined
}

export interface ICalcHistory {
    firstNumber: number,
    secondNumber: number,
    operator: string,
    result: number
}

export function putHistory(data: ICalcHistory) {
    if(checkForStorage()) {
        let historyData: ICalcHistory[] = JSON.parse(localStorage.getItem(CACHE_KEY) || "[]")

        historyData.unshift(data)

        if(historyData.length > 10)
            historyData.pop()

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData))
    }
}

export function getHistory(): ICalcHistory[] {
    if(checkForStorage()){
        return JSON.parse(localStorage.getItem(CACHE_KEY) || "[]")
    }
    else
        return []
}

