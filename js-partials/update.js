import { g } from './basicVars.js';

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

export { updateChart }