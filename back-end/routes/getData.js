const express = require("express");
const {
    DistributorRegion,
    RetailerRegion,
    getProducts,
} = require("../controllers/getData");

const router = express.Router();

router.get("/distributor/region", DistributorRegion);
router.get("/retailer/region", RetailerRegion);
router.get("/products", getProducts);

module.exports = router;
