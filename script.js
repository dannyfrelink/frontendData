d3.csv('https://cdn.jsdelivr.net/npm/countries-list@2.6.1/dist/countries.csv')
    .then(getCountriesData)

let countries;

function getCountriesData(data) {
    countries = data

    const fetchData = () => {
        // Ophalen API Currency exchange rate https://rapidapi.com/exchangerateapi/api/exchangerate-api/
        fetch('https://exchangerate-api.p.rapidapi.com/rapid/latest/EUR', {
            'method': 'GET',
            'headers': {
                'x-rapidapi-host': 'exchangerate-api.p.rapidapi.com',
                'x-rapidapi-key': 'd049923f05mshe1a2ad3cc776bebp102006jsnd2a7bbcc040d'
            }
        })
            .then(res => res.json())
            .then(data => {
                // European callbacks
                let europe = filterContinents(data, europeanCurrencies);
                europe = removeUndefined(europe);

                // SouthAmerican callbacks
                let southAmerika = filterContinents(data, southAmericanCurrencies);
                southAmerika = removeUndefined(southAmerika);

                // NorthAmerican callbacks
                let northAmerika = filterContinents(data, northAmericanCurrencies);
                northAmerika = removeUndefined(northAmerika);

                // African callbacks
                let africa = filterContinents(data, africanCurrencies);
                africa = removeUndefined(africa);

                // Asian callbacks
                let asia = filterContinents(data, asianCurrencies);
                asia = removeUndefined(asia);

                // Oceanian callbacks
                let oceania = filterContinents(data, oceanianCurrencies);
                oceania = removeUndefined(oceania);

                update(europe)
                
            })
            .catch(err => {
                console.error(err);
            });
        }
    fetchData();

    // Sorteer alle currencies per continent
    const sortCurrencies = continent => {
        return countries
            .filter(country => country.Continent === continent)
            .map(country => country.Currency.split(',').shift())
            .reduce((j, k) => j.add(k), new Set())
    }

    const europeanCurrencies = sortCurrencies('Europe');
    const southAmericanCurrencies = sortCurrencies('South America');
    const northAmericanCurrencies = sortCurrencies('North America');
    const africanCurrencies = sortCurrencies('Africa');
    const asianCurrencies = sortCurrencies('Asia');
    const oceanianCurrencies = sortCurrencies('Oceania');

    // Sorteer API per continent
    const filterContinents = (data, continent) => {
        return Object.keys(data.rates).map(key => {
            if(continent.has(key) && key !== 'EUR') {
                return {currency: key, value: data.rates[key]};
            }
        });
    }

    // Undefined uit array verwijderen
    const removeUndefined = continent => {
        return continent.filter(entry => {
            return entry !== undefined;
        });
    }




    const margin = { top: 40, right: 20, bottom: 20, left: 120 };
    const height = 750 - margin.top - margin.bottom;
    const width = 1000 - margin.left - margin.right;

    // Creating SVG element with attributes
    const svg = d3.select('body').append('svg')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right)

    // Creating Group element with attributes
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xScale = d3.scaleLinear()
        .domain(europe.map(d => d.value))
        .range([0, width])

    const yScale = d3.scaleBand()
        .domain(europe.map(d => d.currency))
        .rangeRound([0, height])
        .paddingInner(0.1)
    
    const xAxis = d3.axisTop()
        .scale(xScale)
    const g_xAxis = g.append('g')
        .attr('class','x axis');
    
    const yAxis = d3.axisLeft()
        .scale(yScale)
    const g_yAxis = g.append('g')
        .attr('class','y axis');

    function update(europe) {
        //update the scales
        xscale.domain([0, d3.max(europe, (d) => d.value)]);
        yscale.domain(europe.map((d) => d.currency));
        //render the axis
        g_xaxis.transition().call(xaxis);
        g_yaxis.transition().call(yaxis);


        // Render the chart with new data

        // DATA JOIN use the key argument for ensurign that the same DOM element is bound to the same data-item
        const rect = g.selectAll('rect').data(europe, (d) => d.currency).join(
            // ENTER 
            // new elements
            (enter) => {
            const rect_enter = enter.append('rect').attr('x', 0);
            rect_enter.append('title');
            return rect_enter;
            },
            // UPDATE
            // update existing elements
            (update) => update,
            // EXIT
            // elements that aren't associated with data
            (exit) => exit.remove()
        );

        // ENTER + UPDATE
        // both old and new elements
        rect.transition()
            .attr('height', yscale.bandwidth())
            .attr('width', (d) => xscale(d.value))
            .attr('y', (d) => yscale(d.currency));

        rect.select('title').text((d) => d.currency);
    }



    

    // //interactivity
    // d3.select('#filter-us-only').on('change', function() {
    // // This will be triggered when the user selects or unselects the checkbox
    // const checked = d3.select(this).property('checked');
    // if (checked === true) {
    //     // Checkbox was just checked

    //     // Keep only data element whose country is US
    //     const filtered_data = data.filter((d) => d.location.country === 'US');

    //     update(filtered_data);  // Update the chart with the filtered data
    // } else {
    //     // Checkbox was just unchecked
    //     update(data);  // Update the chart with all the data we have
    // }
    // });











}

