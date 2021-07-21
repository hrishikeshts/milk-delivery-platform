const { db } = require("../config/db");

const distributorStatus = async (req, res) => {
    try {
        console.log(req.params);
        const region = "SELECT region FROM distributor WHERE did=?";
        const retailer = `SELECT rid FROM retailer WHERE region=(${region})`;
        const order = `SELECT * FROM \`order\` WHERE rid IN (${retailer}) AND date=SUBDATE(CURDATE(), 1)`;
        const count = `SELECT * FROM \`order\` o, order_product op WHERE rid IN (${retailer}) AND o.oid=op.oid AND date=SUBDATE(CURDATE(), 1)`;
        db.query(
            `SELECT rid, name, phone FROM retailer WHERE region=(${region}); ${order}; ${count};`,
            [req.params.did, req.params.did, req.params.did],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                } else if (result.length > 0) {
                    console.log("Orders from current date returned...");
                    res.send({ retailers: result[0], orderDetails: result[1], orders: result[2] });
                } else {
                    console.log("No order data exists in database!");
                    res.send({
                        message: "No retailers has ordered yet today!",
                    });
                }
            }
        );
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
};

const setDelivery = async (req, res) => {
    try {
        console.log(req.body.value);
        db.query("UPDATE `order` SET isDelivered=? WHERE oid=?", [req.body.value, req.params.oid], (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log("Status updated in order table...");
                console.log(result.message);
                res.status(202).send({ message: "Delivery Status updated..." });
            }
        });
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
};

module.exports = { distributorStatus, setDelivery };
