import { width, height, g } from './basicVars.js';

function defineScales(continent) {
    // Define the scales
    const scales = {
        xScale: d3.scaleLinear()
            .domain(continent.map(d => d.value))
            .range([0, width]),

        yScale: d3.scaleBand()
            .domain(continent.map(d => d.currency))
            .rangeRound([0, height])
            .paddingInner(0.1),
    };

    // Define the axis
    const axis = {
        xAxis: d3.axisTop()
            .scale(scales.xScale),
        g_xAxis: g.append('g')
            .style('opacity', 0)
            .attr('class', 'x axis'),

        yAxis: d3.axisLeft()
            .scale(scales.yScale),
        g_yAxis: g.append('g')
            .style('opacity', 0)
            .attr('class', 'y axis')
    };

    // Return content of both variables
    return {
        ...scales,
        ...axis
    };
}

export { defineScales }