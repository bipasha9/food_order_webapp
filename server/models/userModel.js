const mongoose = require("mongoose");
const Address = require("./AddressModel");
const Order = require('./OrderModel');
const Product = require('./productModel')
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Please enter your name!"], 
      default: '',
      trim: true,
    },
    email: {
      type: String,
      // required: [true, "Please enter your email!"],
      trim: true,
      default: '',

    },
    password: {
      type: String,
      // required: [true, "Please enter your password!"], 
      default: ''
      // required: true
    },
    phone: {
      type: String,
      //  required: [true, "Please enter your phone number!"],
      default: ''
      // required: true
    },

    role: {
      type: Number,
      default: 0,
    },
    cart: [
      {
        quantity: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId, ref: Product
        }
      },
    ],
    address: [
      { type: mongoose.Schema.Types.ObjectId, ref: Address }
    ],
    order: [
      { type: mongoose.Schema.Types.ObjectId, ref: Order }
    ],
    isSubscribed: {
      type: Boolean,
      default: false
    },
    subcriptionOptions: {
      //holding users endpoints 
      type: {},
      default: {}
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
  }
  },
  {
    timestamps: true,
  },

);

module.exports = mongoose.model("Users", userSchema);
