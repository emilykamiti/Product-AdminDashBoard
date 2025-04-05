const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [false, "Order must have a product name"],
  },
  productId: {
    type: String,
    required: [false, "Order must have a product ID"],
  },
  userId: {
    type: String,
    required: [false, "Order must have a user ID"],
    default: "default-user", // Temporary default value
  },
  customer: {
    name: {
      type: String,
      required: [false, "Customer name is required"],
      default: "Guest User", // Temporary default value
    },
    email: String,
  },
  price: {
    type: Number,
    required: [false, "Order must have a price"],
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
