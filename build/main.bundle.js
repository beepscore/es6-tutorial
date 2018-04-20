'use strict';

// use arrow function =>
var calculateMonthlyPayment = function calculateMonthlyPayment(principal, years, rate) {
    // ecmascript 5 "var" is scoped to entire function, even if within a {} block
    // ecmascript 6 "let" is scoped to block {}
    var monthlyRate = 0;
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
    return { principal: principal, years: years, rate: rate, monthlyPayment: monthlyPayment, monthlyRate: monthlyRate };
};

var calculateAmortization = function calculateAmortization(principal, years, rate) {
    // ecmascript 5 "var" is scoped to entire function, even if within a {} block
    // ecmascript 6 "let" is scoped to block {}
    var _calculateMonthlyPaym = calculateMonthlyPayment(principal, years, rate),
        monthlyRate = _calculateMonthlyPaym.monthlyRate,
        monthlyPayment = _calculateMonthlyPaym.monthlyPayment;

    var balance = principal;
    var amortization = [];
    for (var y = 0; y < years; y++) {
        // interest payment for year y
        var interestY = 0;
        // principal payment for year y
        var principalY = 0;
        for (var m = 0; m < 12; m++) {
            // interest payment for month m
            var interestM = balance * monthlyRate;
            // principal payment for month m
            var principalM = monthlyPayment - interestM;
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({ principalY: principalY, interestY: interestY, balance: balance });
    }
    return { monthlyPayment: monthlyPayment, monthlyRate: monthlyRate, amortization: amortization };
};

document.getElementById('calcBtn').addEventListener('click', function () {
    var principal = document.getElementById("principal").value;
    var years = document.getElementById("years").value;
    var rate = document.getElementById("rate").value;

    // use destructuring assignment to assign multiple variables

    var _calculateAmortizatio = calculateAmortization(principal, years, rate),
        monthlyPayment = _calculateAmortizatio.monthlyPayment,
        monthlyRate = _calculateAmortizatio.monthlyRate,
        amortization = _calculateAmortizatio.amortization;

    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
    // log is visible in browser / developer console
    amortization.forEach(function (month) {
        return console.log(month);
    });
});
