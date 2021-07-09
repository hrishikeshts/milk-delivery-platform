const { db } = require("../db/connect");

const placeOrder = async (req, res) => {
    try {
        const { count, price } = req.body;
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

module.exports = {
    placeOrder,
};
