import * as service from './rate-service-mock';

service.findAll()
    .then(rates => {
        let html = '';
        // ecmascript 6 backtick delimited string supports string interpolation
        rates.forEach(rate => html += `<tr><td>${rate.name}</td><td>${rate.years}</td><td>${rate.rate}%</td></tr>`);
        document.getElementById("rates").innerHTML = html;
    })
    .catch(e => console.log(e));

