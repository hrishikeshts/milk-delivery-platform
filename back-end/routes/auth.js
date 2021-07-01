const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

module.exports = (app, db, jwt) => {
    const queryPromise = (sql, args) => {
        return new Promise((resolve, reject) => {
            db.query(sql, args, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    app.post("/signup/distributor", async (req, res) => {
        try {
            const hash = await bcrypt.hash(req.body.password, 10);

            const user = {
                phone: req.body.phone,
                name: req.body.name,
                region: req.body.region,
                password: hash,
            };
            db.query(
                "INSERT INTO distributor (phone, name, region, password) VALUES (?, ?, ?, ?)",
                [user.phone, user.name, user.region, user.password],
                (err, result) => {
                    if (err) {
                        if (err.code === "ER_DUP_ENTRY") {
                            console.error(
                                "Duplicate entry for distributor entered!"
                            );
                            if (err.sqlMessage.includes("phone")) {
                                console.error(
                                    "Phone number is the duplicate entry!"
                                );
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
                        console.log("POST request for signup received...");
                        // res.status(201).send("User data saved to database...");
                        console.log(result);

                        const userData = {
                            phone: user.phone,
                            name: user.name,
                            region: user.region,
                            password: user.password,
                            role: true, // For distributor, role is set to true
                        };
                        const token = jwt.sign(
                            { userData },
                            process.env.SECRET
                        );
                        res.status(201).json({
                            auth: true,
                            token: token,
                            result: result,
                            message: "User data saved to database...",
                        });
                    }
                }
            );
        } catch {
            res.status(500);
            console.log("Server Error!");
        }
    });

    app.post("/signup/retailer", async (req, res) => {
        try {
            const hash = await bcrypt.hash(req.body.password, 10);

            const user = {
                phone: req.body.phone,
                name: req.body.name,
                region: req.body.region,
                password: hash,
            };
            db.query(
                "INSERT INTO distributor (phone, name, region, password) VALUES (?, ?, ?, ?)",
                [user.phone, user.name, user.region, user.password],
                (err, result) => {
                    if (err) {
                        if (err.code === "ER_DUP_ENTRY") {
                            console.error(
                                "Duplicate entry for distributor entered!"
                            );
                            if (err.sqlMessage.includes("phone")) {
                                console.error(
                                    "Phone number is the duplicate entry!"
                                );
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
                        console.log("POST request for signup received...");
                        // res.status(201).send("User data saved to database...");
                        console.log(result);

                        const userData = {
                            phone: user.phone,
                            name: user.name,
                            region: user.region,
                            password: user.password,
                            role: true, // For distributor, role is set to true
                        };
                        const token = jwt.sign(
                            { userData },
                            process.env.SECRET
                        );
                        res.status(201).json({
                            auth: true,
                            token: token,
                            result: result,
                            message: "User data saved to database...",
                        });
                    }
                }
            );
        } catch {
            res.status(500);
            console.log("Server Error!");
        }
    });

    app.post("/login/distributor", (req, res) => {
        const id = req.body.id;
        const password = req.body.password;

        db.query(
            "SELECT * FROM user WHERE phone = ? OR email = ?",
            [id, id],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send();
                } else if (result.length > 0) {
                    bcrypt.compare(
                        password,
                        result[0].password,
                        (err, response) => {
                            if (response) {
                                console.log("Password verified...");

                                const userData = result[0];
                                const token = jwt.sign(
                                    { userData },
                                    process.env.SECRET
                                );

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
                        }
                    );
                } else {
                    res.json({
                        auth: false,
                        message: "User doesn't exist! Sign up to continue...",
                    });
                    console.log("No match found from database!");
                }
            }
        );
    });
};
