const Joi = require("joi");
const mongoose = require("mongoose");
const { bool, string } = require("joi");

mongoose
  .connect("mongodb://localhost:27017/projectile", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log("Server Error: Could not connect to Data base");
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
  },
  active: {
    type: Boolean,
    default: false,
  },
  verification: String,
});

const User = mongoose.model("User", userSchema);

module.exports.User = User;
