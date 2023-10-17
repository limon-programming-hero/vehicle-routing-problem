const veOperatingCost = (numOfVehicle) => {
    //  taking vehicle operating cost = 5000 tk per vehicle;
    const cost = 5000;
    return numOfVehicle * cost;
}
const transportationCost = (distance) => {
    // the transportation cost per unit distance = 200 tk ;
    const costPerDistance = 200;
    return distance * 200;

}