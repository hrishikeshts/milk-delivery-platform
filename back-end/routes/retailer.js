const express = require("express");
const { confirmOrder } = require("../controllers/retailer");

const router = express.Router();

router.post("/retailer/order/confirm", confirmOrder);

module.exports = router;
