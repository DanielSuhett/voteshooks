const express = require("express");
const app = express();
const verifyJWT = require('./config/auth');

require("./config/middlewares")(app);

require("./routes/polls.routes")(app, verifyJWT);
require("./routes/auth.routes")(app);

require('./config/server')(app)
