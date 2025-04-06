const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name phone address");
    res.status(200).json({
      status: "success",
      results: orders.length,
      data: { orders },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: { order: newOrder },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
