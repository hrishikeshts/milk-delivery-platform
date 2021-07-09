const express = require("express");
const cors = require("cors");
require("dotenv").config();

const getData = require("./routes/getData");
const auth = require("./routes/auth");
const retailer = require("./routes/retailer");
const verifyToken = require("./controllers/token");

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(getData, auth, retailer);

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
