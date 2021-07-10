const express = require("express");
const { placeOrder, retailerStatus } = require("../controllers/retailer");

const router = express.Router();

router.post("/retailer/order/confirm", placeOrder);
router.get("/retailer/status/:rid", retailerStatus);

module.exports = router;
