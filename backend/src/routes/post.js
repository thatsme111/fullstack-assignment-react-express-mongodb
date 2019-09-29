const router = require("express").Router();
const Post = require("../models/post");
const authMiddleware = require("../middlewares/auth");
const { internalServerErrorHandler } = require("../middlewares/error-handler");


router.get("/", authMiddleware, (req, res) => {
    Post.find({})
        .select({ _id: 0, __v: 0 })
        .populate("user")
        .limit(10)
        .then(posts => res.json(posts));
});

router.post("/", authMiddleware, (req, res) => {
    const content = req.body.content;
    if (content) {
        const newPost = {
            user: req.session.user_uid,
            content,
            timestamp: new Date().getTime()
        }
        Post.create(newPost)
            .then(post => {
                res.json({ message: "Added New Post successfully" });
            }).catch(error => internalServerErrorHandler(error, req, res));
    } else {
        res.status(400).json({
            message: "Content cannot be empty"
        });
    }
});

module.exports = router;