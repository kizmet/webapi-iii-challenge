const router = require("express").Router();

const Users = require("../users/userDb");


router.post("/", validateUser, (req, res) => {
  const userInfo = req.body;
  Users.insert(userInfo)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not add user to the db" });
    });
});


router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The list of users could not be retrieved" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const id = req.params.id;

  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Could not get the specified user by ID" });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const id = req.params.id;
  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The posts by that user could not be retrieved" });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  let foundUser;

  Users.getById(id)
    .then(user => {
      foundUser = user;
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error finding that user by ID" });
    });

  Users.remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(foundUser);
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not delete a user with that ID" });
    });
});


router.put("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Users.update(id, changes)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not update the user" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "Invalid User ID" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "API Error" });
    });
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length > 0) {
    res.status(400).json({ message: "Missing user data, could not add to db" });
  } else if (!req.body.hasOwnProperty("name")) {
    res
      .status(400)
      .json({ message: "Missing required name field, could not add to db" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {

};

module.exports = router;
