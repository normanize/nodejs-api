const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authRequest = require('./requests/auth');

const usersSchema = require('../models/users');
const Users = mongoose.model('Users', usersSchema);

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    let validate = await authRequest.authentication(req.body);

    if (!validate.success) {
      return res.status(422).send(validate.message);
    }

    try {
      const user = await Users.findOne({ email }).exec();

      if (user && (await bcrypt.compare(password, user.password))) {
        let response = user.toJSON();
        response.access_token = await jwt.sign(
          {
            user_id: user._id,
            role: user.role,
            email
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        res
          .status(200)
          .send(response);
      } else {
        res
          .status(400)
          .send("Invalid email or password.");
      }
    } catch (err) {
      res
        .status(500)
        .send({
          message: "Something wen't wrong. Please try again."
        });
    }
  },

  signup: async (req, res) => {
    let payload = req.body;
    let validate = await authRequest.signup(req.body);

    if (!validate.success) {
      return res.status(422).send(validate.message);
    }

    try {
      const hashedPassword = await bcrypt.hash(payload.password, 10)

      let user = await Users.create({
        name: payload.name,
        email: payload.email,
        role: payload.role,
        password: hashedPassword,
      });
      
      res
        .status(201)
        .send({
          data: user,
          message: "Successful registered."
        });
    } catch (err) {
      res
        .status(500)
        .send({
          message: "Something wen't wrong. Please try again."
        });
    }
  }
}
