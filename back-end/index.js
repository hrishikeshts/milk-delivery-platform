const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/connect"); // Connection to database
const auth = require("./routes/auth");
const verifyToken = require("./controllers/token");

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(auth); // POST requests for authentication

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
    res.status(202).json({
        auth: true,
        message: "You are now authenticated...",
        user: req.userData,
    });
});

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
