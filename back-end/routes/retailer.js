const express = require("express");
const { placeOrder } = require("../controllers/retailer");

const router = express.Router();

router.post("/retailer/order/confirm", placeOrder);

module.exports = router;
