const router = require("express").Router();

let User = require("../models/user.model");

// get all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// // get all users after sorting alphabetically
// router.route("/sorted").get((req, res) => {
//   User.find()
//     .sort({ name: 1 })
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// add user
router.route("/").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const role = req.body.role;
  //   const status = req.body.status;

  //   const newUser = new User({ name, email, role, status });
  const newUser = new User({ name, email, role });

  newUser
    .save()
    .then(() => res.json(newUser))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get user by id
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// delete user by id
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted User!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// edit user by id
router.route("/:id").put((req, res) => {
  // try using findByIdAndUpdate
  User.findById(req.params.id)
    .then((user) => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.role = req.body.role;
      //   user.status = req.body.status;

      user
        .save()
        .then(() => res.json(user))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
