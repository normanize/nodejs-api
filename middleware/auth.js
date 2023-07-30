const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const usersSchema = require('../models/users');
const Users = mongoose.model('Users', usersSchema);

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await jwt.verify(token, process.env.TOKEN_KEY);
    req.auth = user;
    
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

const roleMiddleware = (roles) => async (req, res, next) => {
  try {
    !req.auth || !roles.includes(req.auth.role)
      ? res.status(403).send("You do not have access to this route")
      : next();
  } catch (err) {
    res.sendStatus(403);
  }
};

module.exports = {
  authMiddleware,
  roleMiddleware
};