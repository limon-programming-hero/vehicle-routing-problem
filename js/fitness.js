const speedOfVehicleV1 = 40; //taking as a constant speed;
const unloadingTimePerUnitV2 = 3.6; //taking as a constant value;

const veOperatingCost = (numOfVehicle) => {
    const vehicleOperatingCostF1 = 5000; //  taking vehicle operating cost = 5000 tk per vehicle;
    return numOfVehicle * vehicleOperatingCostF1;
}
const transportationCost = (distance) => {
    // the transportation cost per unit distance = 20 tk ;
    const costPerUnitDistanceF2 = 20;
    return distance * costPerUnitDistanceF2;

}
const freshnessCost = (demand, route_distance) => {
    const costPerUnitTimeF4 = 15; //taking as a constant cost per unit time;
    const unloadingCostPerUnitTimeF5 = 10; //taking as a constant value;

    const costDuringDistributionC41 = costPerUnitTimeF4 * (route_distance / speedOfVehicleV1); // cost during distribution C41 
    const costDuringUnloadingC42 = unloadingCostPerUnitTimeF5 * unloadingTimePerUnitV2 * demand; // cost during unloading during C42
    console.log({ costDuringDistributionC41, costDuringUnloadingC42 })
    return (costDuringDistributionC41 + costDuringUnloadingC42);
}
const energyCost = (remainingLoad, fuelPriceF6, demand, route_distance) => {
    const emptyFuelConsumptionU0 = 0.08; // fuel consumption for empty vehicle (Liter per unit distance))
    const fullLoadFuelConsumptionU1 = .102; // fuel consumption for full load vehicle (Liter per unit distance))
    const alfa1 = 2; // fuel consumption for refrigerator during distribution (Liter per time))
    const alfa2 = 2.5;  // fuel consumption for refrigerator during unloading (Liter per time))

    const fuelConsumptionUQ = emptyFuelConsumptionU0 + (fullLoadFuelConsumptionU1 - emptyFuelConsumptionU0) * (remainingLoad / capacity); // fuel consumption per unit distance for vehicle;
    const vehicleFuelConsumptionFC1 = route_distance * fuelConsumptionUQ; //vehicle consumption 
    const refrigeratorFuelConsumptionFC2 = (alfa1 * (route_distance / speedOfVehicleV1)) + (alfa2 * demand * unloadingTimePerUnitV2);

    return (fuelPriceF6 * (vehicleFuelConsumptionFC1 + refrigeratorFuelConsumptionFC2));
}
const totalCO2EmissionCost = (fuelConsumptionFC) => {
    const CO2Coefficient = 2.63; // CO2 emission coefficient (kg/liter)
    const CO2UnitPriceF7 = 1000; //the unit price of carbon dioxide gas emission
    const CO2QuotaTq = 1000; //carbon emission quota
    if (fuelConsumptionFC * CO2Coefficient > CO2QuotaTq) {
        return (CO2UnitPriceF7 * (fuelConsumptionFC * CO2Coefficient - CO2QuotaTq))
    } else {
        return 0;
    }
}