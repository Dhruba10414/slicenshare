const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const productSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      default: uuidv4,
      unique: true, 
    },
    name:{
      type: String,
      required: [true, "Please add a name"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    merchant_name: {
        type: String,
        required: [true, "Please add a merchant name"],
    },
    price: {
      type: Number,
      required: [true, "Please add the price"]
    },
    isAvailable: {
      type: Boolean,
      required: [true, "Please add availibility"],
    }

  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
