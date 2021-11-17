// Sort API per continent
function filterContinents(data, continent) {
    return Object.keys(data.rates).map(key => {
        if (continent.has(key) && key !== 'EUR') {
            return { currency: key, value: data.rates[key] };
        }
    });
}

// Clean dataset
function cleanUpData(data, countries) {
    // Sort CDN package per continent
    function sortCurrencies(continent) {
        return countries
            .filter(country => country.Continent === continent)
            .map(country => country.Currency.split(',').shift())
            .reduce((j, k) => j.add(k), new Set());
    }

    // Split CDN package into seperate variables
    const europeanCurrencies = sortCurrencies('Europe');
    const southAmericanCurrencies = sortCurrencies('South America');
    const northAmericanCurrencies = sortCurrencies('North America');
    const africanCurrencies = sortCurrencies('Africa');
    const asianCurrencies = sortCurrencies('Asia');
    const oceanianCurrencies = sortCurrencies('Oceania');

    // Return data from API per continent (without undefined)
    return {
        'EU': filterContinents(data, europeanCurrencies).filter(d => !!d),
        'SA': filterContinents(data, southAmericanCurrencies).filter(d => !!d),
        'NA': filterContinents(data, northAmericanCurrencies).filter(d => !!d),
        'AF': filterContinents(data, africanCurrencies).filter(d => !!d),
        'AS': filterContinents(data, asianCurrencies).filter(d => !!d),
        'OC': filterContinents(data, oceanianCurrencies).filter(d => !!d)
    }
}

export { cleanUpData }