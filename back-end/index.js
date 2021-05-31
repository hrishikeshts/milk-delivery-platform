const express = require("express");
const mysql = require("mysql");
const PORT = 4000;

const app = express();

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

// Function to create database
app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE dairydash";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(`Database 'dairydash' created...`);
    });
});

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
