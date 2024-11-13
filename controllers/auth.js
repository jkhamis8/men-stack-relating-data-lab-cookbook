const express = require("express");
const router = express.Router();
const user = require('../models/user')
const bcrypt = require('bcrypt')



router.get("/sign-up", async (req, res) => {
  res.render("auth/sign-up.ejs")
});

router.post("/sign-up", async (req, res) => {
  const userInDatabase = await user.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send('username is already taken')
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send("password and Confirm Password Must Match")
  }
  const hashPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashPassword
  const createdUser = await user.create(req.body)
  res.send(`Thanks for signing up ${createdUser.username}`)
  //res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {
  const userInDatabase = await user.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send('username is not correct')
  }
  if (bcrypt.compareSync(req.body.password, userInDatabase.password)) {
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    }
    res.redirect('/')
  } else {
    return res.send('Password is not correct')
  }

});

router.get("/sign-in", async (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.get("/sign-out", async (req, res) => {
  req.session.destroy();
  res.redirect("/");
});


module.exports = router;
