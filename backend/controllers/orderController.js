const Order = require("../models/order");
const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.getAdminOrder = async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
};
exports.getSellerSingleOrder = async (req, res, next) => {
  const id = req.params.id
  const orders = await Order.findById(id);

  res.status(200).json({
    success: true,
    orders,
  });
};
exports.getUserSingleOrder = async (req, res, next) => {
  const id = req.params.id
  const orders = await Order.findById(id);

  res.status(200).json({
    success: true,
    orders,
  });
};

exports.getSellerOrder = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    console.log('seller', userId)

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const products = await Product.find({ seller: user.name });

    const productIds = products.map(product => product._id);

    const orders = await Order.find({
      'orderItems.product': { $in: productIds },
      orderStatus: 'Completed'
    }).populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        select: 'name seller',
      }
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getSellerAllOrder = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    console.log('seller', userId)

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const products = await Product.find({ seller: user.name });

    const productIds = products.map(product => product._id);

    const orders = await Order.find({
      'orderItems.product': { $in: productIds }
    }).populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        select: 'name seller',
      }
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getSellerOrdersList = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    console.log('seller', userId)

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const products = await Product.find({ seller: user.name });

    const productIds = products.map(product => product._id);

    const orders = await Order.find({
      'orderItems.product': { $in: productIds },
    }).populate({
      path: 'orderItems',
      populate: {
        path: 'product',
        select: 'name seller',
      }
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.orderCreate = async (req, res, next) => {
  try {
    const {
      method,
      address,
      city,
      phoneNo,
      postalCode,
      country,
      totalPrice,
      itemsPrice,
      taxPrice,
      ...productData
    } = req.body;

    // console.log(req.body);
    // console.log(productData);

    const orderItems = Object.values(productData);

    const order = await Order.create({
      shippingInfo: {
        address,
        city,
        phoneNo,
        postalCode,
        country
      },
      paymentInfo: {
        id: 'pt944ndh3213mczx',
        method
      },
      user: req.user.id,
      orderItems,
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice
    });

    await Promise.all(orderItems.map(async (item) => {
      const product = await Product.findById(item.product);
      if (product) {
        product.sack -= item.quantity;
        await product.save();
      }
    }));

    await Cart.deleteMany({ userID: req.user.id });

    res.status(201).json({
      success: true,
      message: 'Success Create of Order',
      data: order
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming you're passing the user ID in the request params

    // Find orders by user ID
    const orders = await Order.find({ user: id });
    console.log(orders)

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

exports.orderStatusComplete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const OrderStatus = {
      orderStatus: 'Completed',
    };

    const order = await Order.findByIdAndUpdate(id, OrderStatus, {
      new: true,
    });
    // console.log(order)

    res.status(200).json({ success: true, message: 'Order is now Completed', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
