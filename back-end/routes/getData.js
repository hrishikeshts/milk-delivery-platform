const express = require("express");
const { getRegion, getProducts } = require("../controllers/getData");

const router = express.Router();

router.get("/region", getRegion);
router.get("/products", getProducts);

module.exports = router;
