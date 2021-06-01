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

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
