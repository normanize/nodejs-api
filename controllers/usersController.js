const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = require('../models/users');

const Users = mongoose.model('Users', usersSchema);

module.exports = {
  index: async (req, res) => {
    try {
      let users = await Users.find({});
      res
        .status(200)
        .send(users);
    } catch (err) {
      res
        .status(500)
        .send({
          message: "Something wen't wrong. Please try again."
        });
    }
  },

  show: async (req, res) => {
    const { id } = req.params

    try {
      let user = await Users.findById(id).exec();
      res
        .status(200)
        .send(user);
    } catch (err) {
      res
        .status(500)
        .send({
          message: "Something wen't wrong. Please try again."
        });
    }
  },

  create: async (req, res) => {
    let payload = req.body;

    const hashedPassword = await bcrypt.hash(payload.password, 10)

    try {
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
          message: "Successful created."
        });
    } catch (err) {
      res
        .status(500)
        .send({
          message: "Something wen't wrong. Please try again."
        });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    let payload = req.body;

    try {
      await Users.findOneAndUpdate({ _id: id }, payload);
      let user = await Users.findById(id).exec();

      res
        .status(202)
        .send({
          data: user,
          message: "Successful updated."
        });
    } catch (err) {
      console.log(err)
      res
        .status(500)
        .send({
          message: "Something wen't wrong. Please try again."
        });
    }
  },

  remove: async (req, res) => {
    const { id } = req.params;
    try {
      await Users.deleteOne({ _id: id });
      res
        .status(202)
        .send({
          message: "Successful deleted."
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
