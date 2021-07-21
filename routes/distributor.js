const express = require("express");
const { distributorStatus, setDelivery } = require("../controllers/distributor");

const router = express.Router();

router.get("/d:did/status", distributorStatus);
router.post("/d/o:oid/delivery", setDelivery);

module.exports = router;
