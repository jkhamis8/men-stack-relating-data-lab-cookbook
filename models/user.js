const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "userName must be more than 3 Char"],
    maxlength: [10, "userName must be less than 10 char"]
  },
  password: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
