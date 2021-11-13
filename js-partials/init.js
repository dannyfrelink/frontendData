function init(countryMap) {
    const europe = countryMap['EU'];
    const scales = defineScales(europe);
    updateChart(europe, scales);
    return countryMap;
}

export { init }