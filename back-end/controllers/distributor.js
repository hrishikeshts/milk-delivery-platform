const { db } = require("../db/connect");

const distributorStatus = async (req, res) => {
    try {
        console.log(req.params.did);
        const rid = "SELECT rid FROM retailer WHERE region=(SELECT region FROM distributor WHERE did=?)";
        const order =
            "SELECT * FROM `order` o, order_product op WHERE rid IN (" + rid + ") AND o.oid=op.oid AND date=CURDATE()";
        db.query(`${rid}; ${order};`, [req.params.did, req.params.did], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
            } else if (result.length > 0) {
                console.log("Orders from current date returned...");
                res.send({ retailers: result[0], orders: result[1] });
            } else {
                console.log("No order data exists in database!");
                res.send({
                    message: "No retailers has ordered yet today!",
                });
            }
        });
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
};

const getDistributor = async (req, res) => {
    console.log("GET request for distributor data received...");

    db.query(
        "SELECT did, name, phone FROM distributor WHERE region=(SELECT region FROM retailer WHERE rid=?)",
        [req.params.rid],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
            } else if (result.length > 0) {
                console.log("Distributor data sent...");
                res.send(result);
            } else {
                console.log("Couldn't get distributor data!");
                res.status(404);
            }
        }
    );
};

const placeOrder = async (req, res) => {
    try {
        const { count, price } = req.body;

        db.query("INSERT INTO `order` (rid, date) VALUES (?, CURDATE())", [req.body.rid], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    console.error("Entry for the date already inserted!");
                    res.status(409).send("Order already placed!");
                } else {
                    throw err;
                }
            } else {
                console.log("Data inserted into order table...");
                res.status(201).send({ isPlaced: 1, message: "Retailer order placed..." });
                const oid = result.insertId;
                delete count.total;
                delete price.total;
                Object.keys(count).map((key) => {
                    return db.query(
                        "INSERT INTO order_product VALUES (?,?,?)",
                        [oid, key, count[key]],
                        (err, result) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log("Data inserted to order_products table...");
                                console.log(result);
                            }
                        }
                    );
                });
            }
        });
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
};

const editOrder = async (req, res) => {
    try {
        const { count, price, prevOrder } = req.body;

        db.query("UPDATE `order` SET isPlaced=3 WHERE (rid=? AND date=CURDATE())", [req.body.rid], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    console.error("Entry for the date already edited!");
                    res.status(409).send("Order already edited!");
                } else {
                    throw err;
                }
            } else {
                if (result.changedRows) {
                    console.log("Data updated in order table...");
                    console.log(result);
                    res.status(201).send({ isPlaced: 3, message: "Retailer order updated..." });
                    delete count.total;
                    delete price.total;
                    Object.keys(count).map((key) => {
                        return db.query(
                            "UPDATE order_product SET count=? WHERE (oid=? AND pid=?)",
                            [count[key], prevOrder[key - 1].oid, key],
                            (err, result) => {
                                if (err) {
                                    throw err;
                                } else {
                                    console.log("Data updated in order_products table...");
                                    console.log(result);
                                }
                            }
                        );
                    });
                } else {
                    console.log("Couldn't update data in order table...");
                    console.log(result);
                    res.status(403).send({ isPlaced: 3, message: "Retailer order already updated..." });
                }
            }
        });
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
};

module.exports = {
    distributorStatus,
    getDistributor,
    placeOrder,
    editOrder,
};
