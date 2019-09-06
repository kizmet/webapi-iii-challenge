const express = require("express");
const cors = require("cors");

const UsersRouter = require("./users/userRouter.js");
const PostsRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json());
server.use(cors());
//custom middleware


server.use(function(req, res, next) {
  console.log('Time:', Date.now())
  next()
}, function (req, res, next) {
  console.log(req.method)
  next()
})

server.use('/api/users',  UsersRouter)

server.use('/api/posts',  PostsRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});





module.exports = server;
