const { db, queryPromise } = require("../db/connect");

const placeOrder = async (req, res) => {
    try {
        const { count, price } = req.body;

        // const start = new Date(2001, 0, 1);
        // const end = new Date();
        // const randomDate = new Date(
        //     start.getTime() + Math.random() * (end.getTime() - start.getTime())
        // );
        // const getRandomDate = `${randomDate.getFullYear()}-${
        //     randomDate.getMonth() + 1
        // }-${randomDate.getDate()}`;
        // console.log(getRandomDate);

        // db.query(
        //     "INSERT INTO `order` (rid, date) VALUES (?, ?)",
        //     [req.body.rid, getRandomDate],

        db.query(
            "INSERT INTO `order` (rid, date) VALUES (?, CURDATE())",
            [req.body.rid],
            (err, result) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        console.error("Entry for the date already inserted!");
                        res.status(409).send("Order already placed!");
                    } else {
                        throw err;
                    }
                } else {
                    console.log("Inserted data into order table...");
                    res.status(201).send("Retailer order placed...");
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
                                    console.log(result);
                                }
                            }
                        );
                    });
                }
            }
        );
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
};

const retailerStatus = async (req, res) => {
    try {
        // var date = new Date();
        // var today = `${date.getFullYear()}-${
        //     date.getMonth() + 1
        //     }-${date.getDate()}`;

        db.query(
            "SELECT * FROM `order` WHERE rid=? AND date=CURDATE()",
            [req.params.rid],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500);
                } else if (result.length > 0) {
                    console.log("Retailer has already placed the order!");
                    queryPromise(
                        "SELECT oid, op.pid, count, name FROM order_product op JOIN product p ON op.pid=p.pid WHERE op.oid=?",
                        [result[0].oid]
                    )
                        .then((rows) => {
                            res.send({
                                status: true,
                                message: "Order already placed...",
                                result: rows,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    console.log("Retailer has not placed the order!");
                    res.send({
                        status: false,
                        message: "Order not placed...",
                    });
                }
            }
        );
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
};

module.exports = {
    placeOrder,
    retailerStatus,
};
