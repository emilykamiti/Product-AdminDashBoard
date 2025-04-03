const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.TYpes.ObjectId, ref: "User", reuqired: true },
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
