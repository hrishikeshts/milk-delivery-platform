const express = require("express");
const { distributorStatus, getDistributor, getPrevious, placeOrder, editOrder } = require("../controllers/distributor");

const router = express.Router();

router.get("/d:did/status", distributorStatus);
router.get("/d:did/distributor", getDistributor);
router.get("/d:did/previous", getPrevious);
router.post("/d:did/order", placeOrder);
router.post("/d:did/order/edit", editOrder);

module.exports = router;
