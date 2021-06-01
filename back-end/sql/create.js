module.exports = function create(app, db) {
    // Create database 'dairydash'
    app.get("/create/dairydash", (req, res) => {
        let sql = "CREATE DATABASE dairydash";

        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(`Database 'dairydash' created...`);
        });
    });

    // Create table 'distributor'
    app.get("/create/distributor", (req, res) => {
        let sql =
            "CREATE TABLE distributor (id INT AUTO_INCREMENT, name VARCHAR(255), phone CHAR(10), password VARCHAR(255), PRIMARY KEY (id))";

        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(`Table 'distributor' created...`);
        });
    });

    // Create table 'retailer'
    app.get("/create/retailer", (req, res) => {
        let sql =
            "CREATE TABLE retailer (id INT AUTO_INCREMENT, name VARCHAR(255), phone CHAR(10), password VARCHAR(255), PRIMARY KEY (id))";

        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(`Table 'retailer' created...`);
        });
    });
};
