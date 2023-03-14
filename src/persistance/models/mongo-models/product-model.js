import mongoose from "mongoose"

export const Product = mongoose.model('Product', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    timestamp: {
        type: Date, 
        default: Date.now, 
        required: false
    },
    description: {
        type: String, 
        required: true
    },
    stock: {
        type: Number, 
        required: true
    }
}));