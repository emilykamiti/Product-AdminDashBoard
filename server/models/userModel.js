const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password should be at least 8 characters"],
    select: false,
  },

  phone: {
    type: String,
    validate: [validator.isMobilePhone, "Please provide a valid phone number"],
  },
  profileImage: {
    type: String,
    default: "default.jpg", // Default profile image
  },
  address: {
    type: String,
    default: "Not provided",
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check if password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
