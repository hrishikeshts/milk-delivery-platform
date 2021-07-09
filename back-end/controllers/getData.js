const db = require("../db/connect");

const getRegion = async (req, res) => {
    console.log("GET request for regions received...");

    db.query("SELECT * FROM region", (err, result) => {
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

module.exports = {
    getRegion,
    getProducts,
};
