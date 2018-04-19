let calculateMonthlyPayment = function (principal, years, rate) {
    // ecmascript 5 "var" is scoped to entire function, even if within a {} block
    // ecmascript 6 "let" is scoped to block {}
    let monthlyRate = 0
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    return {principal, years, rate, monthlyPayment, monthlyRate};
};

document.getElementById('calcBtn').addEventListener('click', function () {
    let principal = document.getElementById("principal").value;
    let years = document.getElementById("years").value;
    let rate = document.getElementById("rate").value;

    // use destructuring assignment to assign monthlyPayment and monthlyRate
    let {monthlyPayment, monthlyRate} = calculateMonthlyPayment(principal, years, rate);

    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
});
