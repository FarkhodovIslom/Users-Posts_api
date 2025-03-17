const express = require("express");
const router = express.Router();
const controller = require('../controller/controller');

router.get("/", controller.index);
router.get("/posts", controller.getPosts);
router.get("/post/:id", controller.getPostById);

router.post("/", controller.newPost);

router.delete("/post/:id", controller.deletePost);

module.exports = router;