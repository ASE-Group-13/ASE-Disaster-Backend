const fs = require('fs');
const path = require('path');
const OrderData = require("../models/OrderData");
const {sendOrder} = require("../logic/ResponderService");

// Find Optimal Locations
function createOrder(locations, resource, requiredQuantity) {
  // Filter the locations to only include the desired type and those with non-zero capacity
  const filteredLocations = locations.filter((location) => location.resource === resource && location.capacity > 0);

  // Sort the filtered locations by distance
  filteredLocations.sort((a, b) => a.duration - b.duration);

  let remainingQuantity = requiredQuantity;
  const orderLocations = [];

  // Loop through the sorted locations and find the closest location with enough quantity
  for (let i = 0; i < filteredLocations.length; i++) {
    const location = filteredLocations[i];

    if (remainingQuantity <= 0) {
      // We've found all the required quantity, so break out of the loop
      break;
    }

    if (location.capacity >= remainingQuantity) {
      // This location has enough quantity, so add it to the order and update remainingQuantity
      orderLocations.push({
        location: location,
        quantity: remainingQuantity
      });
      remainingQuantity = 0;
    } else {
      // This location doesn't have enough quantity, so add what they have to the order and update remainingQuantity
      orderLocations.push({
        location: location,
        quantity: location.capacity
      });
      remainingQuantity -= location.capacity;
    }
    
  }
  console.log(`Test:${JSON.stringify(orderLocations)}`);
  if (remainingQuantity > 0) {
    // There isn't enough capacity at any of the locations, so return an error message
    console.log(`There is not enough capacity for ${resource} at any of the locations. Shortfall of ${remainingQuantity}.`);
    return { orderLocations: orderLocations, message: `There is not enough capacity for ${resource} at any of the locations. Shortfall of ${remainingQuantity}.` };
  } else {
    // Return the order locations
    return { orderLocations: orderLocations };
  }
}

function createEvacuation(locations, impact) { 
  console.log("Creating Evacuation Plan");
  const busDepots = locations.filter(location => location.capacity > 0 && location.resource === "bus");
  const restCentres = locations.filter(location => location.capacity > 0 && location.resource === "rest center");
  
  busDepots.sort((a, b) => a.duration - b.duration);
  restCentres.sort((a, b) => a.duration - b.duration);

  const allocatedBuses = [];

  let busDepotIndex = 0;
  let restCentreIndex = 0;

  let remainingQuantity = impact;

  while (restCentreIndex < restCentres.length) {
    // Looping through Rest Centres
    const currentRestCentre = restCentres[restCentreIndex];

    if (remainingQuantity <= 0) {
      // We've found all the required quantity, so break out of the loop
      break;
    }

    if (currentRestCentre.capacity >= remainingQuantity) {
      // This location has enough quantity, so add it to the order and update remainingQuantity
      let busUnits = Math.ceil(remainingQuantity / 35);
      
      while (busDepotIndex < busDepots.length){
        // Looping through Bus Depots
        const currentBusDepot = busDepots[busDepotIndex];
    
        if (busUnits <= 0) {
          // We've found all the enough buses, so break out of the loop
          break;
        }
    
        if (currentBusDepot.capacity >= busUnits) {
          // The Current Bus Depot has enough capacity to cover the required bus units
          const data = {
            restCentre: currentRestCentre,
            quantity: remainingQuantity,
            busDepot: currentBusDepot,
            sentBuses: busUnits
          };
          allocatedBuses.push(data);
          busUnits = 0;
        } else {
          // The Current Bus Depot doesn't have enough capacity to cover the required bus units
          const restCenterLimit = currentBusDepot.capacity*35;
          const data = {
            restCentre: currentRestCentre,
            quantity: restCenterLimit,
            busDepot: currentBusDepot,
            sentBuses: currentBusDepot.capacity
          };
          allocatedBuses.push(data);
          busUnits -= currentBusDepot.capacity;
          remainingQuantity -= (currentBusDepot.capacity*35)
        }
        busDepotIndex++;
      }
      remainingQuantity = 0;
    } else {
      // This rest centre doesn't have enough quantity, so add what they have to the order and update remainingQuantity
      let busUnits = Math.ceil(currentRestCentre.capacity / 35);
      remainingQuantity -= currentRestCentre.capacity;

      while (busDepotIndex < busDepots.length){
        // Looping through Bus Depots
        const currentBusDepot = busDepots[busDepotIndex];
        if (busUnits <= 0) {
          // We've found all the enough buses, so break out of the loop
          break;
        }
        busDepotIndex++;

        if (currentBusDepot.capacity >= busUnits) { // the current bus depot fulfills the current rest centre
          const data = {
            restCentre: currentRestCentre,
            quantity: currentRestCentre.capacity,
            busDepot: currentBusDepot,
            sentBuses: busUnits
          };
          allocatedBuses.push(data);
          busDepotIndex--;
          busDepots[busDepotIndex].capacity -= busUnits;
          busUnits = 0;
        } else {
          // The Current Bus Depot doesn't have enough capacity to cover the required bus units
          const data = {
            restCentre: currentRestCentre,
            quantity: currentRestCentre.capacity,
            busDepot: currentBusDepot,
            sentBuses: currentBusDepot.capacity
          };
          allocatedBuses.push(data);
          busUnits -= currentBusDepot.capacity;         
        }
      }
    }  
    restCentreIndex++;
  }
  if (remainingQuantity > 0) {
    // There isn't enough capacity at any of the locations, so return an error message
    console.log(`There is not enough capacity for Rest Center capacity at any of the locations. Requires space for ${remainingQuantity}.`);
    return { orders: allocatedBuses, message: `There is not enough capacity for Rest Center capacity at any of the locations. Requires space for ${remainingQuantity}.` };
  } else {
    // Return the order locations
    return {
      orders: allocatedBuses,
      message: `Successful Evacuation Plan.`
    };
  }
}

async function saveCsvData(site,type,radius,size,ambulance,police,fire,bus,heli,filename) {
  console.log(site,type,radius,size,ambulance,police,fire,bus,heli,filename);
  if(typeof site == "number" && typeof type === "number"){
    const csv = `\n${site},${type},${radius},${size},${ambulance},${police},${fire},${bus},${heli}`;
    const filePath = path.join(__dirname, filename);
    // Append CSV data to file
    fs.appendFile(filePath, csv, (err) => {
      if (err) {
        console.error(err);
      }
      console.log(`Data appended to ${filePath}`);
    });
  }else{
    console.log(`Incorrect inputs.`);
  }
}

async function checkRequest(fastestRoutes, resourceType, quantity) {
  console.log(`${resourceType} RESOURCES`);
  const resource = await createOrder(fastestRoutes, resourceType, quantity);
  console.log(`${resourceType} RESOURCES COMPLETED`);
  return resource;
}

async function setOrder(orderLocations, disaster) {
  const result = [];
  
  for (const order of orderLocations) {
    const newData = new
    OrderData({
      location: order.location,
      locationLatitude: order.location.latitude,
      locationLongitude: order.location.longitude,
      URL: `http://127.0.0.1:4000/orders`,
      quantity: order.quantity,
      instructions: "Urgently head to disaster site.",
      disaster: disaster,
      status: "active",
      resource: order.location.resource,
    });
    newData.URL += `/${newData._id}`;
    console.log("Saving order");
    await newData.save();
    await sendOrder(newData);
    result.push(newData);
  }
  return result;
}

async function setEvacuation(evacuationOrders, disaster) {
  const result = [];
  for (const order of evacuationOrders) {
    const busData = new OrderData({
      location: order.busDepot,
      locationLatitude: order.busDepot.latitude,
      locationLongitude: order.busDepot.longitude,
      URL: `http://127.0.0.1:4000/orders`,
      quantity: order.sentBuses,
      instructions:
        "Please head to evacuation point, gather victims and escort them to the rest center.",
      disaster: disaster,
      status: "active",
      resource: "bus",
      evacuationPoint: {
        latitude: disaster.latitude,
        longitude: disaster.longitude,
      },
      restCentre: order.restCentre,
    });
    busData.URL += `/${busData._id}`;
    const restData = new OrderData({
      location: order.restCentre,
      locationLongitude: order.restCentre.latitude,
      locationLatitude: order.restCentre.longitude,
      URL: `http://127.0.0.1:4000/orders`,
      quantity: order.quantity,
      instructions: `Please prepare rest center for approximately ${order.quantity} victims of the disaster.`,
      disaster: disaster,
      status: "active",
      resource: "rest centre",
    });
    restData.URL += `/${restData._id}`;
    console.log("Saving orders");
    await busData.save();
    await restData.save();
    await sendOrder(busData);
    await sendOrder(restData);
    result.push(busData, restData);
  }
  return result;
}  

module.exports = {
    createOrder : createOrder,
    createEvacuation : createEvacuation,
    saveCsvData : saveCsvData,
    setEvacuation : setEvacuation,
    checkRequest : checkRequest,
    setOrder : setOrder
};