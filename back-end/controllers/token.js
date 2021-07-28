const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers["access-token"];
    if (!token) {
        res.status(404).json({ auth: false, message: "Token not found!" });
    } else {
        jwt.verify(token, process.env.SECRET || "secret", (err, decoded) => {
            if (err) {
                res.status(406).json({
                    auth: false,
                    message: "Authentication failed!",
                });
            } else {
                req.userData = decoded.userData;
                next();
            }
        });
    }
};

module.exports = verifyToken;
