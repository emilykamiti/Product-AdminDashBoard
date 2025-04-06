const express = require("express");
const path = require("path");
const multer = require("multer");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController"); // Import authController
const User = require("../models/userModel"); // Ensure User model is imported if used

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const userName = req.body.name.replace(/\s+/g, "_");
    cb(null, `${userName}_${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

// Route to handle profile image upload
router.post(
  "/upload-profile-image",
  authController.protect, // Ensure the user is authenticated
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const profileImagePath = req.file.filename;
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { profileImage: profileImagePath },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        status: "success",
        data: updatedUser,
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: "Error updating profile image",
      });
    }
  }
);

// Signup route with profile image upload
router.post("/signup", upload.single("profileImage"), userController.signup);

// Other user routes
router.post("/login", userController.login);
router.get("/logout", userController.logout);

router.get("/me", authController.protect, userController.getMe);
router.patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", authController.protect, userController.deleteMe);

router.route("/").get(authController.protect, userController.getAllUsers);

module.exports = router;
