const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const salt_rounds = 12;

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    confirmedPassword: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }

});

AuthSchema.pre("save", function(next) {
    return bcrypt
        .hash(this.password, salt_rounds)
        .then(hash => {
            this.password = hash;
            return next();
        })
        .catch(err => {
            return next(err);
        });
    });

AuthSchema.methods.validatePassword = function(guess) {
    return bcrypt.compare(guess, this.password);
};

const AuthModel = mongoose.model("Authentication", AuthSchema, "authentication");

module.exports= AuthModel;