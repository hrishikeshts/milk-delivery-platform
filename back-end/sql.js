module.exports = function create(app, db) {
    // Create database 'dairydash'
    app.get("/create/database", (req, res) => {
        let sql = "CREATE DATABASE dairydash";
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(`Database 'dairydash' created...`);
        });
    });

    app.get("/create/tables", (req, res) => {
        res.setHeader("Content-Type", "text/html");

        // Create table 'region'
        let region = "CREATE TABLE region (name VARCHAR(255), PRIMARY KEY (name))";
        db.query(region, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.write("Table 'region' created...<br>");
        });

        // Create table 'distributor'
        let distributor =
            "CREATE TABLE distributor (did INT AUTO_INCREMENT, name VARCHAR(255), phone CHAR(10) UNIQUE, region VARCHAR(255) UNIQUE, password VARCHAR(255), PRIMARY KEY (did), FOREIGN KEY (region) REFERENCES region (name))";
        db.query(distributor, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.write("Table 'distributor' created...<br>");
        });

        // Create table 'retailer'
        let retailer =
            "CREATE TABLE retailer (rid INT AUTO_INCREMENT, name VARCHAR(255), phone CHAR(10) UNIQUE, region VARCHAR(255), password VARCHAR(255), PRIMARY KEY (rid), FOREIGN KEY (region) REFERENCES distributor (region))";
        db.query(retailer, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.write("Table 'retailer' created...<br>");
            res.end();
        });
    });

    app.get("/foreign-key", (req, res) => {
        let sql = "ALTER TABLE distributor ADD CONSTRAINT FOREIGN KEY (region) REFERENCES region(name)";
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(`Foreign key added to 'distributor'...`);
        });
    });

    // Insert regions
    app.get("/insert/region", (req, res) => {
        let region = [["Palayam"], ["Pattom"], ["Kazhakkoottam"], ["Sreekaryam"]];
        let sql = "INSERT INTO region (name) VALUES ?";
        db.query(sql, [region], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send("Values inserted into table 'region'...<br>");
        });
    });
};
