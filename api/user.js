const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const {signupValidator, loginValidator} = require('../validators');

require('dotenv').config();
const SECRET = process.env.SECRET;

const router = express.Router();

// create new user
router.post('/signup', (req, res) => {
  const {errors, isValid} = signupValidator(req.body);

  const {fName, lName, email, password, username} = req.body;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({$or: [{email}, {username}]})
      .then((user) => {
        if (user) {
          if (user.email === email) {
            return res.status(400).json({email: 'Error: 10'});
          } else {
            return res.status(400).json({username: 'Error: 10'});
          }
        } else {
          const newUser = new User({fName, lName, email, password, username});
          bcrypt.genSalt(16, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then((user) => res.json(user))
                  .catch((err) => console.log({error: 'Error: 19'}));
            });
          });
        }
      });
});

// login (use POST so login credentials aren't sent through URL E.G GET)
router.post('/login', (req, res) => {
  const {errors, isValid} = loginValidator(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const {input, password} = req.body;

  const username = input;
  const email = input;

  User.findOne({$or: [{email}, {username}]}).then((user) => {
    if (!user) {
      return res.status(404).json({input: 'Login Incorrect'});
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
        };
        jwt.sign(payload, SECRET, {expiresIn: 3600}, (err, token) => {
          if (err) {
            console.log(err);
          }
          return res.json({success: true, token: 'Bearer ' + token});
        });
      } else {
        return res.status(400).json({password: 'Password Incorrect'});
      }
    });
  });
});
module.exports = router;


