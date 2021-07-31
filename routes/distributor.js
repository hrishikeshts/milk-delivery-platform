const express = require("express");
const { distributorStatus, setDelivery, endDelivery } = require("../controllers/distributor");

const router = express.Router();

router.get("/d:did/status", distributorStatus);
router.post("/d/o:oid/delivery", setDelivery);
router.post("/d:did/end-delivery", endDelivery);

module.exports = router;
