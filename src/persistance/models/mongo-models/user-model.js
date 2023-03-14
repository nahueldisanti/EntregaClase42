import mongoose from "mongoose"

export const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    domicilio:{
        type: String,
        required: true
    },
    edad:{
        type: String,
        required: true
    },
    tel:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: true
    },
    cart:{
        type: Array,
        required: true
    },
    order:{
        type: Array,
        required: true
    }
}));