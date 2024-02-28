const express = require('express')

const router = express.Router()


// Open route
router.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem vindo a nossa API" });
});

module.exports = router;
