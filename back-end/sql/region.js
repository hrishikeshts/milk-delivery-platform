module.exports = function create(app, db) {
    app.get("/insert/region", (req, res) => {
        let region = [
            ["Palayam"],
            ["Pattom"],
            ["Kazhakkoottam"],
            ["Sreekaryam"],
        ];
        let sql = "INSERT INTO region (name) VALUES ?";
        db.query(sql, [region], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("Values inserted into table 'region'...<br>");
        });
    });
};
