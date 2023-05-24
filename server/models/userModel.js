const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = model("UserModel", UserSchema);
