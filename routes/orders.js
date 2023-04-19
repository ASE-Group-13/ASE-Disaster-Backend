const router = require("express").Router();
require("dotenv").config();
const OrderData = require("../models/OrderData");
const DisasterData = require("../models/DisasterData");
const { createEvacuation, saveCsvData, setEvacuation, checkRequest, setOrder } = require('../logic/OrderCreation');
const { getLocations } = require('../logic/ResponderService');
const { calculateDurations } = require("../logic/MappingService");
const { getSiteNumber, getTypeNumber } = require("../models/enumData");

router.get("/all-order-data", async (req, res) => {
  try {
    const allData = await OrderData.find();
    return res.json(allData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/order/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderData.findById(id).populate('disaster');;
    console.log(order);
    if (!order) {
      return res.status(404).json({ success: false, error: "Disaster not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
});

router.get("/disaster-orders/:disaster", async (req, res) => {
  try {
    const response = req.params.disaster;
    const units = await OrderData.find({ disaster: { $in: [response] } });
    return res.json(units);
  } catch (err) {
    res.json({ message: err });
  }
})

router.post("/request-resources", async (req, res) => {
  try {
    const {
      disasterId,
      ambulance,
      police,
      fireTruck: fire,
      buses: bus,
      helicopter: heli,
      evacuation,
    } = req.body;

    const disaster = await DisasterData.findById(disasterId);
    if (!disaster) {
      console.log(`Disaster with ID ${disasterId} not found`);
      res.status(404).json({ message: `Disaster with ID ${disasterId} not found` });
    } else {
      await saveCsvData(getSiteNumber(disaster.site), getTypeNumber((disaster.type).toLowerCase()), disaster.radius, disaster.size, ambulance, police, fire, bus, heli, "../python/datasets/Main_D2.csv");

      const locations = await getLocations();
      const fastestRoutes = await calculateDurations(locations, disaster);

      let returnMessage = "Resources Requested.";
      let orders = [];

      if (ambulance !== 0) {
        const resource = await checkRequest(
          fastestRoutes,
          "ambulance",
          ambulance
        );
        if (resource.message) {
          returnMessage += ` ${resource.message}`;
        }
        orders.push(...await setOrder(resource.orderLocations, disaster));
      }
      // MAKE IT JUST ONE ID NOT A BUNCH
      // DIFFER BETWEEN ORDERS AND EVACUATIONS
      if (police !== 0) {
        const resource = await checkRequest(
          fastestRoutes,
          "garda",
          police
        );
        if (resource.message) {
          returnMessage += ` ${resource.message}`;
        }
        orders.push(...await setOrder(resource.orderLocations, disaster));
      }

      if (fire !== 0) {
        const resource = await checkRequest(
          fastestRoutes,
          "fire",
          fire
        );
        if (resource.message) {
          returnMessage += ` ${resource.message}`;
        }
        orders.push(...await setOrder(resource.orderLocations, disaster));
      }

      if (heli !== 0) {
        const resource = await checkRequest(
          fastestRoutes,
          "helicopter",
          heli
        );
        if (resource.message) {
          returnMessage += ` ${resource.message}`;
        }
        orders.push(...await setOrder(resource.orderLocations, disaster));
      }

      if (evacuation) {
        const evacuationPlans = await createEvacuation(
          fastestRoutes,
          50,
          disaster
        );
        if (evacuationPlans.message) {
          returnMessage += ` ${evacuationPlans.message}`;
        }
        orders.push(...await setEvacuation(evacuationPlans.orders, disaster));
      }

      res.status(200).json({ data: orders, message: returnMessage });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while receiving resource request",
    });
  }
});

module.exports = router;
