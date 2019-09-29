const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const session = jwt.verify(token, process.env.JWT_TOKEN);
        req.session = session;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
};