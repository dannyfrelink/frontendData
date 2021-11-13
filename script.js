// Creating D3 attributes
const margin = { top: 40, right: 20, bottom: 20, left: 120 };
const height = 750 - margin.top - margin.bottom;
const width = 1000 - margin.left - margin.right;

// Creating SVG element with attributes
const svg = d3.select('body').append('svg')
    .attr('height', height + margin.top + margin.bottom)
    .attr('width', width + margin.left + margin.right);

// Creating Group element with attributes
const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

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

// Sort API per continent
const filterContinents = (data, continent) => {
    return Object.keys(data.rates).map(key => {
        if (continent.has(key) && key !== 'EUR') {
            return { currency: key, value: data.rates[key] };
        }
    });
}

function cleanUpData(data, countries) {
    const sortCurrencies = continent => {
        return countries
            .filter(country => country.Continent === continent)
            .map(country => country.Currency.split(',').shift())
            .reduce((j, k) => j.add(k), new Set());
    }

    const europeanCurrencies = sortCurrencies('Europe');
    const southAmericanCurrencies = sortCurrencies('South America');
    const northAmericanCurrencies = sortCurrencies('North America');
    const africanCurrencies = sortCurrencies('Africa');
    const asianCurrencies = sortCurrencies('Asia');
    const oceanianCurrencies = sortCurrencies('Oceania');

    return {
        'EU': filterContinents(data, europeanCurrencies).filter(d => !!d),
        'SA': filterContinents(data, southAmericanCurrencies).filter(d => !!d),
        'NA': filterContinents(data, northAmericanCurrencies).filter(d => !!d),
        'AF': filterContinents(data, africanCurrencies).filter(d => !!d),
        'AS': filterContinents(data, asianCurrencies).filter(d => !!d),
        'OC': filterContinents(data, oceanianCurrencies).filter(d => !!d)
    }
}

function defineScales(continent) {
    const scales = {
        xScale: d3.scaleLinear()
            .domain(continent.map(d => d.value))
            .range([0, width]),

        yScale: d3.scaleBand()
            .domain(continent.map(d => d.currency))
            .rangeRound([0, height])
            .paddingInner(0.1),
    };



    const axis = {
        xAxis: d3.axisTop()
            .scale(scales.xScale),
        g_xAxis: g.append('g')
            .attr('class', 'x axis'),

        yAxis: d3.axisLeft()
            .scale(scales.yScale),
        g_yAxis: g.append('g')
            .attr('class', 'y axis')
    }

    return {
        ...scales,
        ...axis
    }
}

function updateChart(continent, scales) {
    const { xScale, yScale, g_xAxis, g_yAxis, xAxis, yAxis } = scales;
    // Update the scales
    xScale
        .domain([0, d3.max(continent, (d) => d.value)]);
    yScale
        .domain(continent.map((d) => d.currency));

    // Render the axis
    g_xAxis
        .transition()
        .call(xAxis);
    g_yAxis
        .transition()
        .call(yAxis);

    // Join the data with rectangle elements
    const rect = g.selectAll('rect')
        .data(continent, (d) => d.currency)
        .join(
            // Create rectangle elements
            (enter) => {
                const rectEnter = enter.append('rect')
                    .attr('x', 0);
                rectEnter.append('title');
                return rectEnter;
            },
            // Update existing elements
            (update) => update,
            // Remove elements (not associated with data)
            (exit) => exit.remove()
        );

    // ENTER + UPDATE
    // both old and new elements
    rect.transition()
        .attr('height', yScale.bandwidth())
        .attr('width', (d) => xScale(d.value))
        .attr('y', (d) => yScale(d.currency));

    rect.select('title')
        .text((d) => d.currency);
}

function init(countryMap) {
    const europe = countryMap['EU'];
    const scales = defineScales(europe);
    updateChart(europe, scales);
    return countryMap;
}

function removeOldAxis() {
    const elX = document.getElementsByClassName('x axis')[0];
    elX.remove();
    const elY = document.getElementsByClassName('y axis')[0];
    elY.remove();
}

function filterChangeChart(countryMap) {
    d3.selectAll('#filter')
        .on('change', function () {
            // Check if the radio buttons is checked
            const checked = d3.select(this).property('checked');
            if (checked === true) {
                removeOldAxis();
                const filterValue = d3.select(this).node().value;
                const continent = countryMap[filterValue];
                const scales = defineScales(continent);
                updateChart(countryMap[filterValue], scales);
            }
        });
}


