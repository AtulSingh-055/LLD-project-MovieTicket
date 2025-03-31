const mongoose = require("mongoose");

// Theatre Schema

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  isActive: {
    type: Boolean,
    default: false,
  },
});

const Theatre = mongoose.model("theatres", theatreSchema);

module.exports = Theatre;
