const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const adminSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      default: uuidv4,
      unique: true, // If you want unique UUIDs
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
    created_by: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
      },
    tokenVersion: { type: Number, default: 0 }
      
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
