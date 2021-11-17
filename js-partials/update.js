import { g } from './basicVars.js';
import { mouseover, mousemove, mouseleave } from './hover.js'

function updateChart(continent, scales) {
    const { xScale, yScale, g_xAxis, g_yAxis, xAxis, yAxis } = scales;
    // Update the scales
    xScale
        .domain([0, d3.max(continent, (d) => d.value)]);
    yScale
        .domain(continent.map((d) => d.currency));

    // Render the axis
    g_xAxis
        .call(xAxis)
        .transition()
        .duration(700)
        .style('opacity', 1);

    g_yAxis
        .call(yAxis)
        .transition()
        .duration(700)
        .style('opacity', 1);

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
        )
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseleave', mouseleave);

    // Adding height, width and title to my rect
    rect
        .attr('height', yScale.bandwidth())
        .attr('y', (d) => yScale(d.currency))
        .transition()
        .attr('width', (d) => xScale(d.value))
        .duration(1500)
        .ease(d3.easeCircleOut);

    rect.select('title')
        .text((d) => d.currency);
}

export { updateChart }