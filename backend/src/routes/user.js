const router = require("express").Router();
const User = require("../models/user");
const authMiddleware = require("../middlewares/auth");
const { internalServerErrorHandler } = require("../middlewares/error-handler");
const path = require("path");
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
            var exts = path.extname(file.originalname || '').split('.');
            cb(null, req.session.user_uid + "." + exts[exts.length - 1]);
        }
    })
});

router.get("/", authMiddleware, (req, res) => {
    User.findOne({ email: req.session.email }).then(user => {
        res.json({
            name: user.name
        });
    }).catch(error => internalServerErrorHandler(error, req, res));
});

router.put("/", authMiddleware, (req, res) => {
    User.updateOne({ email: req.session.email }, {
        $set: {
            name: req.body.name
        }
    }).then(() => res.json({
        message: "updated successfully"
    })).catch(error => internalServerErrorHandler(error, req, res));
});

router.post("/profile-picture", authMiddleware, upload.single("profile-picture"), (req, res) => {
    User.updateOne({ email: req.session.email }, {
        $set: {
            profile_picture: req.file.filename
        }
    }).then(() => res.json({
        message: "updated successfully"
    })).catch(error => internalServerErrorHandler(error, req, res));
});

module.exports = router;