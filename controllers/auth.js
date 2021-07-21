const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db, queryPromise } = require("../db/connect");

const DistributorSignup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        const user = {
            phone: req.body.phone,
            name: req.body.name,
            region: req.body.region,
            password: hash,
        };

        queryPromise("SELECT * FROM retailer WHERE phone=?", [user.phone])
            .then((result) => {
                if (result.length > 0) {
                    res.status(409).send("Phone number already registered as retailer!");
                    console.log("Phone number exists in retailer table!");
                } else {
                    db.query(
                        "INSERT INTO distributor (phone, name, region, password) VALUES (?, ?, ?, ?)",
                        [user.phone, user.name, user.region, user.password],
                        (err, result) => {
                            if (err) {
                                if (err.code === "ER_DUP_ENTRY") {
                                    console.error("Duplicate entry for distributor entered!");
                                    if (err.sqlMessage.includes("phone")) {
                                        console.error("Phone number is the duplicate entry!");
                                        res.send({
                                            alert: "Phone number already registered!",
                                        });
                                    }
                                    if (err.sqlMessage.includes("region")) {
                                        console.error("Region is the duplicate entry!");
                                        res.send({
                                            alert: "This region already has a distributor!",
                                        });
                                    }
                                } else {
                                    console.log(err);
                                    res.status(500);
                                }
                            } else {
                                console.log("POST request for distributor signup received...");
                                // res.status(201).send("User data saved to database...");
                                console.log(result);

                                const userData = {
                                    did: result.insertId,
                                    phone: user.phone,
                                    name: user.name,
                                    region: user.region,
                                    password: user.password,
                                    role: true, // For distributor, role is set to true
                                };
                                const token = jwt.sign({ userData }, process.env.SECRET);
                                res.status(201).json({
                                    auth: true,
                                    token: token,
                                    result: result,
                                    message: "User data saved to database...",
                                });
                            }
                        }
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
};

const RetailerSignup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        const user = {
            phone: req.body.phone,
            name: req.body.name,
            region: req.body.region,
            password: hash,
        };

        queryPromise("SELECT * FROM distributor WHERE phone=?", [user.phone])
            .then((result) => {
                if (result.length > 0) {
                    res.status(409).send("Phone number already registered as distributor!");
                    console.log("Phone number exists in distributor table!");
                } else {
                    db.query(
                        "INSERT INTO retailer (phone, name, region, password) VALUES (?, ?, ?, ?)",
                        [user.phone, user.name, user.region, user.password],
                        (err, result) => {
                            if (err) {
                                if (err.code === "ER_DUP_ENTRY") {
                                    console.error("Duplicate entry for retailer entered!");
                                    if (err.sqlMessage.includes("phone")) {
                                        console.error("Phone number is the duplicate entry!");
                                        res.send({
                                            alert: "Phone number already registered!",
                                        });
                                    }
                                } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
                                    console.error("No distributor data exists!");
                                    res.status(409).send("Ask your distributor to register first!");
                                } else {
                                    console.log(err);
                                    res.status(500);
                                }
                            } else {
                                console.log("POST request for retailer signup received...");
                                // res.status(201).send("User data saved to database...");
                                console.log(result);

                                const userData = {
                                    rid: result.insertId,
                                    phone: user.phone,
                                    name: user.name,
                                    region: user.region,
                                    password: user.password,
                                    role: true, // For distributor, role is set to true
                                };
                                const token = jwt.sign({ userData }, process.env.SECRET);
                                res.status(201).json({
                                    auth: true,
                                    token: token,
                                    result: result,
                                    message: "User data saved to database...",
                                });
                            }
                        }
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } catch {
        res.status(500);
        console.log("Server Error!");
    }
};

const DistributorLogin = (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;

    queryPromise("SELECT * FROM retailer WHERE phone=?", [phone])
        .then((result) => {
            if (result.length > 0) {
                res.status(401).send("This phone number is registered as a retailer!");
                console.log("Phone number is in retailer table!");
            } else {
                db.query("SELECT * FROM distributor WHERE phone = ?", [phone], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send();
                    } else if (result.length > 0) {
                        bcrypt.compare(password, result[0].password, (err, response) => {
                            if (response) {
                                console.log("Password verified...");

                                const userData = result[0];
                                const token = jwt.sign({ userData }, process.env.SECRET);

                                // req.session.user = result;
                                res.json({
                                    auth: true,
                                    token: token,
                                    result: result,
                                });
                            } else {
                                res.json({
                                    auth: false,
                                    message: "Invalid password!",
                                });
                                console.log("Password can't be matched!");
                            }
                        });
                    } else {
                        res.json({
                            auth: false,
                            message: "User doesn't exist! Sign up to continue...",
                        });
                        console.log("No match found from database!");
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const RetailerLogin = (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;

    queryPromise("SELECT * FROM distributor WHERE phone=?", [phone])
        .then((result) => {
            if (result.length > 0) {
                res.status(401).send("This phone number is registered as a distributor!");
                console.log("Phone number is in distributor table!");
            } else {
                db.query("SELECT * FROM retailer WHERE phone = ?", [phone], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send();
                    } else if (result.length > 0) {
                        bcrypt.compare(password, result[0].password, (err, response) => {
                            if (response) {
                                console.log("Password verified...");

                                const userData = result[0];
                                const token = jwt.sign({ userData }, process.env.SECRET);

                                // req.session.user = result;
                                res.json({
                                    auth: true,
                                    token: token,
                                    result: result,
                                });
                            } else {
                                res.json({
                                    auth: false,
                                    message: "Invalid password!",
                                });
                                console.log("Password can't be matched!");
                            }
                        });
                    } else {
                        res.json({
                            auth: false,
                            message: "User doesn't exist! Sign up to continue...",
                        });
                        console.log("No match found from database!");
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    DistributorSignup,
    RetailerSignup,
    DistributorLogin,
    RetailerLogin,
};
