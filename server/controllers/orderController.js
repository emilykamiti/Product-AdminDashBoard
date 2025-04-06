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

// Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
