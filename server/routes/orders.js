const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Order = require("../models/Order");

//Place order
router.post("/", auth, async (req, res) => {
  const { productId, name, price } = req.body;
  try {
    const order = new Order({
      userId: req.user.id,
      productId,
      name,
      price,
    });
    await order.save();
    res, json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get user's orders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
