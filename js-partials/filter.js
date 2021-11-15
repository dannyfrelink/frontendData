import { defineScales } from './scales.js';
import { updateChart } from './update.js';

function removeOldAxis() {
    const elX = document.getElementsByClassName('x axis')[0];
    elX.remove();
    const elY = document.getElementsByClassName('y axis')[0];
    elY.remove();
}

function filterChangeChart(countryMap) {
    d3.selectAll('#filter')
        .on('change', function () {
            // Check if the radio buttons is checked
            const checked = d3.select(this).property('checked');
            if (checked === true) {
                removeOldAxis();
                const filterValue = d3.select(this).node().value;
                const continent = countryMap[filterValue];
                const scales = defineScales(continent);
                updateChart(countryMap[filterValue], scales);
            }
        });
}

export { filterChangeChart }