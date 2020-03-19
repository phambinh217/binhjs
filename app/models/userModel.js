'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
});

let userModel = mongoose.model('User', userSchema);

module.exports = userModel;
