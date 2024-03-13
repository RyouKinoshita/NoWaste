const Order = require("../models/order");
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
        country,
      },
      paymentInfo: {
        id: "pt944ndh3213mczx",
        method,
      },
      user: req.user.id,
      orderItems,
      itemsPrice: itemsPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    });

    await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (product) {
          product.sack -= item.quantity;
          await product.save();
        }
      })
    );

    await Cart.deleteMany({ userID: req.user.id });

    res.status(201).json({
      success: true,
      message: "Success Create of Order",
      data: order,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming you're passing the user ID in the request params

    // Find orders by user ID
    const orders = await Order.find({ user: id });
    console.log(orders);

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    order.orderStatus = status;
    order.deliveredAt = status === "Received" ? Date.now() : null;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// exports.getUserFillUpForm = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const orders = await Order.find({ user: id });

//     if (orders.length > 0) {
//       const latestOrder = orders[orders.length - 1];
//       const { shippingInfo } = latestOrder;

//       res.status(200).json({
//         success: true,
//         shippingInfo,
//       });
//     } else {
//       res.status(200).json({
//         success: true,
//         shippingInfo: {},
//       });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Server Error',
//     });
//   }
// };
