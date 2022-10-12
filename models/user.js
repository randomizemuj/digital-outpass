const { text } = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    registration_no: {
        type: Number,
        required: true,
        unique: true
    },
    block: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    confirm_password:{
        type:String,
        required:true
    }

}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;
