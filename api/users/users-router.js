const express = require("express");

const router = express.Router();

const db = require("./users-model");
const dbPosts = require("../posts/posts-model");

const {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost,
} = require("../middleware/middleware");

router.post("/", validateUser, async (req, res) => {
  // do your magic!
  // this needs a middleware to check that the request body is valid
  try {
    const newUser = await db.insert(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

router.get("/", async (req, res) => {
  // do your magic!
  try {
    const users = await db.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  try {
    const user = await db.getById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  try {
    const user = await db.remove(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const user = await db.update(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id, text } = req.body;
  const newPost = { id: id, text: text, user_id: req.params.id };
  try {
    const post = await dbPosts.insert(newPost);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  // do your magic!
  // this needs a middleware to verify user id
  try {
    const posts = await db.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server problem" });
  }
});

// do not forget to export the router
module.exports = router;
