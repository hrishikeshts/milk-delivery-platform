const express = require("express");
const { retailerStatus, getDistributor, getPrevious, placeOrder, editOrder } = require("../controllers/retailer");

const router = express.Router();

router.get("/r:rid/status", retailerStatus);
router.get("/r:rid/distributor", getDistributor);
router.get("/r:rid/previous", getPrevious);
router.post("/r:rid/order", placeOrder);
router.post("/r:rid/order/edit", editOrder);

module.exports = router;
