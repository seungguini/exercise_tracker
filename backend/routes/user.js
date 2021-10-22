const router = require("express").Router(); // Router object to define a route
let User = require("../models/user.model"); // Import the User model

// Define async function to get and return users from MongoDB
const getAllUsers = async (req, res) => {
  // Find all documents made from the User model
  try {
    const users = await User.find();
    res.json(users); // Add users (json format) into the result
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

// Creates and saves user to MongoDB
const addUser = async (req, res) => {
  // Get username from request
  const username = req.body.username;

  // Instantiate new user (aka make new User document)
  let user = new User({ username });

  // Add user to MongoDB
  try {
    await user.save();
    res.json(`Successfully added ${username}`);
  } catch {
    res.status(400).json("Error: " + err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json("Error " + err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const username = user.username;
    User.findByIdAndDelete(req.params.id);
    await user.save();
    res.json(`Succesfully deleted ${username}`);
  } catch {
    res.status(400).json("Error " + err);
  }
};

const updateUser = async (req, res) => {
  try {
    username = req.body.username;
    user = await User.findByIdAndUpdate({ username });
    await user.save();

    res.json(`Sucessfully updated ${username}`);
  } catch (err) {
    res.status(400).json("Error " + err);
  }
};
// ------------------ ROUTES ------------------

// Define an endpoint to handle HTTP GET request route at localhost:5000/user/
router.route("/").get((req, res) => {
  getAllUsers(req, res);

  // ^ same as below
  // User.find()
  // .then((users) => res.json(users))
  // .catch((err) => res.status(400).json("Error: " + err));
});

// Route for localhost:5000/user/add
router.route("/add").post((req, res) => {
  addUser(req, res);
});

// Route for localhost:5000/user/id - delete user
router.route("/:id").get((req, res) => {
  getUser(req, res);
});

// Route for localhost:5000/user/id - delete user
router.route("/:id").delete((req, res) => {
  deleteUser(req, res);
});

// Rotue for localhost:5000/user/id - delete user
router.route("/update/:id").post((req, res) => {
  updateUser(req, res);
});
module.exports = router;
