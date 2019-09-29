const router = require("express").Router();
const auth = require("../middlewares/auth");

router.use("/auth", require("./auth"));
router.use("/posts", require("./post"));
router.use("/users", require("./user"));
router.use("*", (req, res, next) => {
    const notFoundError = new Error(`Not Found ${req.method} ${req.baseUrl}${req.path}`);
    notFoundError.status = 404;
    next(notFoundError);
});

module.exports = router;