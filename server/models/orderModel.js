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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  price: {
    type: Number,
    required: [false, "Order must have a price"],
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "ompleted"],
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
