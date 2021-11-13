d3.csv('https://cdn.jsdelivr.net/npm/countries-list@2.6.1/dist/countries.csv')
    .then(getCurrency);


function getCurrency(countries) {
    fetch('https://exchangerate-api.p.rapidapi.com/rapid/latest/EUR', {
        'method': 'GET',
        'headers': {
            'x-rapidapi-host': 'exchangerate-api.p.rapidapi.com',
            'x-rapidapi-key': 'd049923f05mshe1a2ad3cc776bebp102006jsnd2a7bbcc040d'
        }
    })
        .then(res => res.json())
        .then(data => cleanUpData(data, countries))
        .then(init)
        .then(filterChangeChart);
}

export { getCurrency }