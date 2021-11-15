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

export { margin, height, width, g }