// for tutorial, use static local data file rates.json
// production application would fetch from a remote service
let url = "rates.json";

fetch(url)
    .then(response => response.json())
    .then(rates => {
        let html = '';
        rates.forEach(rate => html += `<tr><td>${rate.name}</td><td>${rate.years}</td><td>${rate.rate}%</td></tr>`);
        document.getElementById("rates").innerHTML = html;
    })
    .catch(e => console.log(e));

