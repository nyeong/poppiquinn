const mongoose = require("mongoose");

const User = new mongoose.Schema({
  phone: {
    type: String,
    requierd: true,
    validate: {
      validator: function(v) {
        return /\d{11}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    unique: true
  },
  youPhone: {
    type: String,
    requierd: true,
    validate: {
      validator: function(v) {
        return /\d{11}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }, // 좋아하는 대상의 휴대폰
  nickname: { type: String, requierd: true },
  name: { type: String, requierd: true },
  locations: {
    type: [{ loc: Number, lng: Number, time: Date }]
  } // 최근 세 개의 위치
});

User.statics.findByPhone = async function(phone) {
  return this.findOne({ phone });
};

User.methods.updateLocation = async function({ loc, lng, time }) {
  if (this.locations.push({ loc, lng, time }) > 4)
    this.locations = this.locations.slice(1);
  return await this.save();
};

User.methods.recentLocation = function() {
  return this.locations[this.locations.length];
};

module.exports = mongoose.model("user", User);
