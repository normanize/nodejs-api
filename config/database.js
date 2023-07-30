const mongoose = require('mongoose');

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((err) => {
            console.log("Database connection failed.");
            console.log(err)
        });
}