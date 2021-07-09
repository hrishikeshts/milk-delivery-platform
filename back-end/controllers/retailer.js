const confirmOrder = async (req, res) => {
    console.log("Retailer order received...");
    console.log(req.body);
    res.status(201).send("");
};

module.exports = {
    confirmOrder,
};
