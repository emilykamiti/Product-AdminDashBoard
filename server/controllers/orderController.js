const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrders = catchAsync(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.createOrder = catchAsync(async (req, res) => {
  console.log("Received order data:", req.body); // Debug log

  const newOrder = await Order.create({
    name: req.body.name,
    productId: req.body.productId,
    price: req.body.price,
    status: req.body.status || "pending",
  });

  res.status(201).json({
    status: "success",
    data: {
      order: newOrder,
    },
  });
});
