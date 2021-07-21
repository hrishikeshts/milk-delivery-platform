const { db } = require("../db/connect");

const DistributorRegion = async (req, res) => {
    console.log("GET request for distributor regions received...");

    db.query("SELECT * FROM region WHERE name NOT IN (SELECT region FROM distributor)", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
        } else if (result.length > 0) {
            console.log("Region data sent...");
            res.send(result);
        } else {
            console.log("No region data exists!");
            res.status(404);
        }
    });
};

const RetailerRegion = async (req, res) => {
    console.log("GET request for retailer regions received...");

    db.query("SELECT region FROM distributor", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
        } else if (result.length > 0) {
            console.log("Region data sent...");
            res.send(result);
        } else {
            console.log("No region data exists!");
            res.status(404);
        }
    });
};

const getProducts = async (req, res) => {
    console.log("GET request for products received...");

    db.query("SELECT * FROM product", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
        } else if (result.length > 0) {
            console.log("Products data sent...");
            res.send(result);
        } else {
            console.log("No products exists!");
            res.status(404);
        }
    });
};

module.exports = { DistributorRegion, RetailerRegion, getProducts };
