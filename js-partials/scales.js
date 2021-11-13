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

export { defineScales }