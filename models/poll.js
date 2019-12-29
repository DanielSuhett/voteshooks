const mongoose = require("../config/db");
const { Schema } = mongoose;

const pollSchema = new Schema({
  options: [
    {
      userId: String,
      title: String,
      count_votes: Number
    }
  ]
}
);

module.exports = mongoose.model("poll", pollSchema);
