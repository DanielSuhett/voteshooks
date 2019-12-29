var mongoose = require("mongoose");
require("dotenv").config();

var mongoDB = process.env.DBURL;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});


mongoose.Promise = global.Promise;

module.exports = mongoose;
