'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
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

module.exports = mongoose.model('User', UserSchema);
