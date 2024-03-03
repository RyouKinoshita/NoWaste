const Order = require("../models/order");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.getAdminOrder = async (req, res, next) => {
    const orders = await Order.find();
    
    res.status(200).json({
      success: true,
      orders,
    });
  };