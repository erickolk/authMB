const express = require('express');
const { registerUser, loginUser, privateUser } = require('./controllers/userController');
const checkToken = require('./middleware/checkToren');

const router = express.Router()


// Open route
router.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa API" });
});

//Private route
router.get('/user/:id', checkToken, privateUser)

// Register user
router.post("/auth/register", registerUser);

//Login user route

router.post("/auth/login", loginUser);

module.exports = router;
