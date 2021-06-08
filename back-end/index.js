const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = 4000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "database",
    database: "dairydash", // Comment this for initial run, as this can be used only after database is created
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL connected...");
});

require("./sql/create")(app, db); // GET requests to create schemas
require("./sql/region")(app, db); // GET request to insert regions

app.get("/region", (req, res) => {
    db.query("SELECT * FROM region", (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "Unable to fetch regions" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
