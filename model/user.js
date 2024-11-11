const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  postingLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['interested', 'applied', 'interviewing', 'rejected', 'accepted'],
  },
});

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
  applications: [applicationSchema],
},
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
