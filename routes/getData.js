const express = require("express");
const { DistributorRegion, RetailerRegion, getProducts } = require("../controllers/getData");
const verifyToken = require("../controllers/token");

const router = express.Router();

router.get("/distributor/region", DistributorRegion);
router.get("/retailer/region", RetailerRegion);
router.get("/:id/products", getProducts);

router.get("/status", verifyToken, (req, res) => {
    const hour = new Date().getHours();
    console.log("Hour: " + hour);
    res.status(202).json({
        auth: true,
        message: "You are now authenticated...",
        user: req.userData,
        hour: hour,
    });
});

module.exports = router;
