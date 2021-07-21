const mysql = require("mysql");

const db = mysql.createPool({
    host: process.env.DB_HOST || "us-cdbr-east-04.cleardb.com",
    user: process.env.DB_USER || "b83601a0777799",
    password: process.env.DB_PASS || "aac4744b",
    database: process.env.DB_NAME || "heroku_5331229c6118bea",
    multipleStatements: true,
});

// db.connect((err) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log("MySQL connected...");
//     }
// });

const queryPromise = async (sql, args) => {
    return new Promise((resolve, reject) => {
        db.query(sql, args, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = { db, queryPromise };
