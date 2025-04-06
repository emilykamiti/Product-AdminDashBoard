const express = require("express");

const userController = require("../controllers/userController");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the "uploads" directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/signup", upload.single("profileImage"), userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

router.get("/me", userController.getMe);
router.patch("/updateMe", userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

router.route("/").get(userController.getAllUsers);

module.exports = router;
