const express = require("express");
const {
    DistributorSignup,
    RetailerSignup,
    DistributorLogin,
    RetailerLogin,
} = require("../controllers/auth");

const router = express.Router();

router.post("/signup/distributor", DistributorSignup);
router.post("/signup/retailer", RetailerSignup);
router.post("/login/distributor", DistributorLogin);
router.post("/login/retailer", RetailerLogin);

module.exports = router;
