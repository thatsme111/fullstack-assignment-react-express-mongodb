const router = require("express").Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { internalServerErrorHandler, unauthorizedErrorHandler } = require("../middlewares/error-handler");
const bcrypt = require("bcrypt");
const PasswordValidator = require("password-validator");

router.post("/login", (req, res) => {
    userModel.findOne({ email: req.body.email }).then(user => {
        if (user != null) {
            bcrypt.compare(req.body.password, user.password).then(result => {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        user_uid: user._id,
                    }, process.env.JWT_TOKEN);
                    res.json({ token });
                } else {
                    unauthorizedErrorHandler(req, res);
                }
            }).catch(() => unauthorizedErrorHandler(req, res));
        } else {
            unauthorizedErrorHandler(req, res);
        }
    }).catch(error => internalServerErrorHandler(error, req, res));
});

const PasswordValidatorSchema = new PasswordValidator()
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces();                          // Should not have spaces

router.post("/register", (req, res) => {
    userModel.findOne({ email: req.body.email }).then(user => {
        if (user != null) {
            res.status(409).json({
                message: "User Email Already exists"
            });
        } else {
            if (PasswordValidatorSchema.validate(req.body.password)) {
                const newUser = {
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    name: req.body.name,
                };
                userModel.create(newUser).then(() => {
                    res.json({
                        message: "Registered Successfully"
                    });
                }).catch(error => internalServerErrorHandler(error, req, res));
            } else {
                res.json({
                    message: "Password Schema validation failed"
                });
            }
        }
    }).catch(error => internalServerErrorHandler(error, req, res));
});

module.exports = router;