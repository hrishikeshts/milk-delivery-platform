const { db, queryPromise } = require("../db/connect");

const distributorStatus = async (req, res) => {
    try {
        db.query("SELECT * FROM `order`", (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
            } else if (result.length > 0) {
                console.log("Order data returned from the order table...");
                res.send({ orders: result });

                Object.keys(result).map((key) => {
                    return queryPromise("SELECT * FROM order_product WHERE oid=?", [result[key].oid])
                        .then((results) => {
                            console.log("Product count returned from the order_product table...");
                            console.log(results);
                        })
                        .catch((err) => {
                            throw err;
                        });
                });
            } else {
                console.log("Retailer has not placed the order!");
                res.send({
                    message: "Order not placed...",
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

const getPrevious = async (req, res) => {
    try {
        db.query(
            "SELECT * FROM `order` WHERE rid=? AND date=SUBDATE(CURDATE(), 1)",
            [req.params.rid],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                } else if (result.length > 0) {
                    console.log("Previous order returned from order table...");
                    queryPromise(
                        "SELECT oid, op.pid, count, name FROM order_product op JOIN product p ON op.pid=p.pid WHERE op.oid=?",
                        [result[0].oid]
                    )
                        .then((rows) => {
                            res.send({
                                message: "Previous order sent...",
                                result: rows,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    console.log("No previous order exists!");
                    res.send({
                        message: "Place your first order",
                    });
                }
            }
        );
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
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
    getPrevious,
    placeOrder,
    editOrder,
};
