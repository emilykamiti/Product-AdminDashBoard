const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes below
router.use(authController.protect);

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
