import { defineScales } from './scales.js';
import { updateChart } from './update.js';

// Function executed on load browser
function init(countryMap) {
    const europe = countryMap['EU'];
    const scales = defineScales(europe);
    updateChart(europe, scales);
    return countryMap;
}

export { init }