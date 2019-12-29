const mongoose = require("../config/db");
const { Schema } = mongoose;
const pollSchema = require("./poll");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  salt: String,

  data: [{ type: Schema.Types.ObjectId, ref: pollSchema }]
  
});

module.exports = mongoose.model("user", userSchema);
