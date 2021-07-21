const express = require("express");
const { DistributorSignup, RetailerSignup, DistributorLogin, RetailerLogin } = require("../controllers/auth");
const verifyToken = require("../controllers/token");

const router = express.Router();

router.post("/distributor/signup", DistributorSignup);
router.post("/retailer/signup", RetailerSignup);
router.post("/distributor/login", DistributorLogin);
router.post("/retailer/login", RetailerLogin);

router.get("/status", verifyToken, (req, res) => {
    res.status(202).json({
        auth: true,
        message: "You are now authenticated...",
        user: req.userData,
    });
});

module.exports = router;
