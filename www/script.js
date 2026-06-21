function appendValue(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculate() {
    let display = document.getElementById("display");

    try {
        let expression = display.value;

        // Handle + and - percentages
        expression = expression.replace(
            /(\d+(\.\d+)?)([\+\-])(\d+(\.\d+)?)%/g,
            (match, num1, _, operator, num2) => {
                let base = parseFloat(num1);
                let percent = parseFloat(num2);

                if (operator === "+") {
                    return base + (base * percent / 100);
                } else {
                    return base - (base * percent / 100);
                }
            }
        );

        // Handle * and / percentages
        expression = expression.replace(
            /(\d+(\.\d+)?)([\*\/])(\d+(\.\d+)?)%/g,
            (match, num1, _, operator, num2) => {
                let base = parseFloat(num1);
                let percent = parseFloat(num2) / 100;

                if (operator === "*") {
                    return base * percent;
                } else {
                    return base / percent;
                }
            }
        );

        // Handle standalone percentage
        expression = expression.replace(
            /(\d+(\.\d+)?)%/g,
            (match, num) => parseFloat(num) / 100
        );

        display.value = eval(expression);
    } catch {
        display.value = "Error";
    }
}

function squareValue() {
    let display = document.getElementById("display");

    try {
        let num = eval(display.value);
        display.value = num * num;
    } catch {
        display.value = "Error";
    }
}

const rates = {
    INR: 1,
    USD: 83,
    GBP: 105,
    EUR: 90,
    JPY: 0.55,
    CNY: 11.5,
    CAD: 61,
    AUD: 55,
    AED: 22.6,
    SGD: 65
};

async function convertCurrency() {
    let amount = parseFloat(document.getElementById("display").value);

    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    if (isNaN(amount)) {
        document.getElementById("result").value = "Invalid Input";
        return;
    }

    try {

        document.getElementById("result").value = "Converting...";
        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        const data = await response.json();

        const rate = data.rates[to];

        const convertedAmount = amount * rate;

        document.getElementById("result").value =
            convertedAmount.toFixed(2) + " " + to;

    } catch (error) {
        document.getElementById("result").value = "API Error";
    }
}

const lengthRates = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344
};

function convertLength() {

    let length = parseFloat(
        document.getElementById("display").value
    );

    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    if (isNaN(length)) {
        document.getElementById("result").value =
            "Invalid Input";
        return;
    }

    // Convert to meters first
    let meters = length * lengthRates[from];

    // Convert meters to target unit
    let result = meters / lengthRates[to];

    document.getElementById("result").value =
        result.toFixed(6);
}

const weightRates = {
    g: 1,
    kg: 1000,
    lb: 453.592,
    oz: 28.3495,
    t: 1000000
};

function convertWeight() {

    let weight = parseFloat(
        document.getElementById("display").value
    );

    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    if (isNaN(weight)) {
        document.getElementById("result").value =
            "Invalid Input";
        return;
    }

    // Convert to grams first
    let grams = weight * weightRates[from];

    // Convert grams to target unit
    let result = grams / weightRates[to];

    document.getElementById("result").value =
        result.toFixed(6) +" "+ to;
}

function convertTemperature() {
    let temp = parseFloat(document.getElementById("display").value);

    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;

    if (isNaN(temp)) {
        document.getElementById("result").value = "Invalid Input";
        return;
    }

    let celsius;

    // Convert input to Celsius
    if (from === "C") {
        celsius = temp;
    } else if (from === "F") {
        celsius = (temp - 32) * 5 / 9;
    } else if (from === "K") {
        celsius = temp - 273.15;
    }

    let result;

    // Convert Celsius to target unit
    if (to === "C") {
        result = celsius;
    } else if (to === "F") {
        result = (celsius * 9 / 5) + 32;
    } else if (to === "K") {
        result = celsius + 273.15;
    }

    document.getElementById("result").value =
        result.toFixed(2) + " °" + to;
}