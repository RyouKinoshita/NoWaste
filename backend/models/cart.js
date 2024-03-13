const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    prodID: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        default: 0,
        required: [true, "Please enter quantity"],
    },
    status: {
        type:String,
        default: 'onCart',
        enum: ['onCart','outCart']
    }
});

module.exports = mongoose.model("Cart", cartSchema);
