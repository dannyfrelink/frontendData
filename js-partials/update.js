import { g } from './basicVars.js';
import { createTooltip } from './tooltip.js';
const tooltip = createTooltip();

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

    const mouseover = function () {
        tooltip.style('opacity', 1);
    };
    const mousemove = function (d) {
        tooltip
            .html(`${d.target.__data__.currency}: ${d.target.__data__.value}`)
            .style('left', d3.pointer(event, this)[0] + 55 + 'px')
            .style('top', d3.pointer(event, this)[1] + 55 + 'px');
    };
    const mouseleave = function () {
        tooltip.style("opacity", 0);
    };

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