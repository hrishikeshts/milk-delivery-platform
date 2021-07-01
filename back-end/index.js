const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = require("./routes/auth");

const { verifyToken } = require("./controllers/verifyToken");
const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL connected...");
});

auth(app, db, jwt); // POST requests for authentication
// require("./sql")(app, db); // GET requests to create schemas

app.get("/region", (req, res) => {
    console.log("GET request for regions received...");

    db.query("SELECT * FROM region", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500);
        } else if (result.length > 0) {
            console.log("Region data sent...");
            res.send(result);
        } else {
            console.log("No region data exists!");
            res.status(404);
        }
    });
});

app.get("/status", verifyToken, (req, res) => {
    res.json({
        auth: true,
        message: "You are now authenticated...",
        user: req.userData,
    });
});

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
