const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    user_id : {
      type: String,
      required: true,
    },
    order_id: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    description : {
      type : String 
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
