import { defineScales } from './scales.js';
import { updateChart } from './update.js';

function init(countryMap) {
    const europe = countryMap['EU'];
    const scales = defineScales(europe);
    updateChart(europe, scales);
    return countryMap;
}

export { init }