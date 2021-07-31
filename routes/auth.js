const express = require("express");
const { DistributorSignup, RetailerSignup, DistributorLogin, RetailerLogin } = require("../controllers/auth");

const router = express.Router();

router.post("/distributor/signup", DistributorSignup);
router.post("/retailer/signup", RetailerSignup);
router.post("/distributor/login", DistributorLogin);
router.post("/retailer/login", RetailerLogin);

module.exports = router;
