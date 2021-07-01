const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["access-token"];
    if (!token) {
        res.json({ auth: false, message: "Token not found!" });
    } else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Authentication failed!" });
            } else {
                req.userData = decoded.userData;
                next();
            }
        });
    }
};

module.exports = { verifyToken };
