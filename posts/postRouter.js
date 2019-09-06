const router = require("express").Router();

const Posts = require("../posts/postDb");


router.get("/", (req, res) => {
  Posts.get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The list of posts could not be retrieved" });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  const id = req.params.id;

  Posts.getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Could not get the specified post by ID" });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  let foundPost;

  Posts.getById(id)
    .then(post => {
      foundPost = post;
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error finding that post by ID" });
    });

  Users.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json(foundPost);
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not delete a post with that ID" });
    });
});

router.put('/:id', (req, res) => {

});

// custom middleware


function validatePostId(req, res, next) {
  const id = req.params.id;
  Posts.getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "Invalid post ID" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "API Error" });
    });
}

module.exports = router;