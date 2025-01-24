const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const userSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      default: uuidv4,
      unique: true, 
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be up to 6 characters"],
    },
    phone: {
      type: String,
      required: [true, "Please add a password"],
    },

  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
