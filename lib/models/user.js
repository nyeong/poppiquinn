const mongoose = require("mongoose");

const User = new mongoose.Schema({
  phone: { type: String, requierd: true },
  nickname: { type: String, requierd: true },
  name: { type: String, requierd: true },
  youPhone: { type: String, requierd: true }
});

module.exports = mongoose.model("user", User);
