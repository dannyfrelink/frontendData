// Create invisible tooltip
function createTooltip() {
    var tooltip = d3
        .select("#scatter-line")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip");

    return tooltip;
}

export { createTooltip }