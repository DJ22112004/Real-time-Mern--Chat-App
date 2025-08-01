const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

// Match entered password with hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // only hash if password is modified or new
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // hash actual password
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
