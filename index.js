const express = require("express");
const cors = require("cors");
require("dotenv").config();

const getData = require("./routes/getData");
const auth = require("./routes/auth");
const distributor = require("./routes/distributor");
const retailer = require("./routes/retailer");

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(getData, auth, distributor, retailer);

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}...`);
});
