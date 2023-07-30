const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
    },
    password: {
        required: true,
        type: String,
    },
}, {
    timestamps: true
});

usersSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}

module.exports = usersSchema;