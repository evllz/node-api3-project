const express = require("express");

const router = express.Router();

const db = require("./posts-model");

const {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost,
} = require("../middleware/middleware");

router.get("/", async (req, res) => {
  try {
    const posts = await db.get();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

router.get("/:id", validatePostId, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  try {
    const post = await db.getById(req.params.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

router.delete("/:id", validatePostId, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  try {
    const post = await db.remove(req.params.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

router.put("/:id", validatePostId, validatePost, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify post id
  try {
    const post = await db.update(req.params.id);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

// do not forget to export the router
module.exports = router;
