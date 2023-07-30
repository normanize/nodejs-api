const mongoose = require('mongoose');
const { Schema } = mongoose;

const profilesSchema = new Schema({
    age: Number,
    gender: String,
    status: String
});

module.exports = profilesSchema;