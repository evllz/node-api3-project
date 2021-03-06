const express = require("express");
const helmet = require("helmet");
const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here
const middleware = require("./middleware/middleware");
const postsRouter = require("./posts/posts-router");
const usersRouter = require("./users/users-router");

server.use(helmet());
server.use(express.json());
server.use(middleware.logger);
server.use("/api/posts", postsRouter);
server.use("/api/users", usersRouter);

module.exports = server;
