const Cart = require("../models/cart");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.addToCartItem = async (req, res) => {
    try {
        console.log(req.body)

        const addCart = await Cart.create({
            userID: req.body.userID,
            prodID: req.body.prodID,
            quantity: 0,
            status: req.body.status,
        });

        const cartItem = new Cart(addCart);
        await cartItem.save();

        return res.status(201).send({
            success: true,
            message: 'New Cart Item Added',
            cartItem,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getAllCartItem = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId)
        const cartItems = await Cart.find({ userID: userId });
        // console.log(cartItems)

        return res.status(200).send({
            success: true,
            cartItems,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error retrieving Cart Items'
        });
    }
};

exports.outCartStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const outCartUpdate = {
            status: 'outCart',
        };

        const cart = await Cart.findByIdAndUpdate(id, outCartUpdate, {
            new: true,
        });
        // console.log(cart)

        res.status(200).json({ success: true, message:'Cart is Deleted', user: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.onCartStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const outCartUpdate = {
            status: 'onCart',
        };

        const cart = await Cart.findByIdAndUpdate(id, outCartUpdate, {
            new: true,
        });
        // console.log(cart)

        res.status(200).json({ success: true, message:'Cart is Restored', user: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}