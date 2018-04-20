// use arrow function =>
export let calculateMonthlyPayment = (principal, years, rate) => {
    // ecmascript 5 "var" is scoped to entire function, even if within a {} block
    // ecmascript 6 "let" is scoped to block {}
    let monthlyRate = 0
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));
    return {principal, years, rate, monthlyPayment, monthlyRate};
};

export let calculateAmortization = (principal, years, rate) => {
    // ecmascript 5 "var" is scoped to entire function, even if within a {} block
    // ecmascript 6 "let" is scoped to block {}
    let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);
    let balance = principal;
    let amortization = [];
    for (let y=0; y<years; y++) {
        // interest payment for year y
        let interestY = 0;
        // principal payment for year y
        let principalY = 0;
        for (let m=0; m<12; m++) {
            // interest payment for month m
            let interestM = balance * monthlyRate;
            // principal payment for month m
            let principalM = monthlyPayment - interestM;
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({principalY, interestY, balance});
    }
    return {monthlyPayment, monthlyRate, amortization};
};

