const mongoose = require("mongoose");
var validator = require("validator");
var bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please Enter Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter Valid Email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password should be minimum of length 8"],
      required: [true, "Please Enter Password"],
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    var hash = await bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
