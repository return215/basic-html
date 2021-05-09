var CACHE_KEY = "calc-history";
function checkForStorage() {
    return typeof (Storage) !== undefined;
}
export function putHistory(data) {
    if (checkForStorage()) {
        var historyData = JSON.parse(localStorage.getItem(CACHE_KEY) || "[]");
        historyData.unshift(data);
        if (historyData.length > 10)
            historyData.pop();
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}
export function getHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY) || "[]");
    }
    else
        return [];
}
