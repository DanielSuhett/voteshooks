const mongoose = require("../config/db");
const { Schema } = mongoose;

const pollSchema = new Schema({
  question: String,
  userId: String,
  options: [
    {
      title: String,
      count_votes: Number
    }
  ]
}

);

module.exports = mongoose.model("poll", pollSchema);
