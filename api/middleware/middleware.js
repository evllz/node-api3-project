const dbUsers = require("../users/users-model");
const dbPosts = require("../posts/posts-model");

function logger(req, res, next) {
  const date = new Date(Date.now());
  console.log(`${req.method} request`);
  console.log(`URL: ${req.url}`);
  console.log(`Time: ${date.toDateString()}`);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  dbUsers.getById(id).then((user) => {
    if (id) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
}

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body;
  if (!user) {
    res.status(400).json({ message: "missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  dbPosts.getById(id).then((post) => {
    if (post) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  });
}

function validatePost(req, res, next) {
  // do your magic!
  const post = req.body;
  if (!post) {
    res.status(400).json({ message: "missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePostId,
  validatePost,
};
