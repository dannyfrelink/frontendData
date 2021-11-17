import { createTooltip } from './tooltip.js';
const tooltip = createTooltip();

// Hover functions
const mouseover = function () {
    tooltip.style('opacity', 1);
};
const mousemove = function (d) {
    tooltip
        .html(`${d.target.__data__.currency}: ${d.target.__data__.value}`)
        .style('left', d3.pointer(event, this)[0] + 90 + 'px')
        .style('top', d3.pointer(event, this)[1] + 130 + 'px');
};
const mouseleave = function () {
    tooltip.style("opacity", 0);
};

export { mouseover, mousemove, mouseleave }