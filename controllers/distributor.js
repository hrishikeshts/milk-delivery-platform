const { db } = require("../config/db");

const distributorStatus = async (req, res) => {
    try {
        const prevDate =
            "(DATE(date)=SUBDATE(CURDATE(), 1) AND HOUR(date)>=1) OR (DATE(date)=CURDATE() AND HOUR(date)<2)";
        const curDate = "DATE(date)=CURDATE() AND HOUR(date)>=1";

        const region = "SELECT region FROM distributor WHERE did=?";
        const retailer = `SELECT rid FROM retailer WHERE region=(${region})`;
        const order = (date) => `SELECT * FROM \`order\` WHERE rid IN (${retailer}) AND (${date})`;
        const count = (date) =>
            `SELECT * FROM \`order\` o, order_product op WHERE rid IN (${retailer}) AND o.oid=op.oid AND (${date})`;

        const sql = `SELECT rid, name, phone FROM retailer WHERE region=(${region}); ${order(prevDate)}; ${count(
            prevDate
        )}; ${order(curDate)}; ${count(curDate)};`;
        db.query(
            sql,
            [req.params.did, req.params.did, req.params.did, req.params.did, req.params.did],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                } else if (result.length > 0) {
                    console.log("Orders from current date returned...");
                    res.send({
                        retailers: result[0],
                        prevOrderDetails: result[1],
                        prevOrders: result[2],
                        curOrderDetails: result[3],
                        curOrders: result[4],
                    });
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

const endDelivery = async (req, res) => {
    try {
        console.log(req.body.region);
        db.query(
            "UPDATE `order` SET isDelivered=0 WHERE rid IN (SELECT rid FROM retailer WHERE region=?) AND isDelivered IS NULL",
            [req.body.region],
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Remaining statuses updated in order table...");
                    console.log(result);
                    res.status(202).send({ message: "All delivery Statuses updated..." });
                }
            }
        );
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
};

module.exports = { distributorStatus, setDelivery, endDelivery };
