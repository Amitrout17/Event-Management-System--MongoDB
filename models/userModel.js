const mongoose = require("mongoose");

const userScheema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const user = new mongoose.model("user", userScheema);
module.exports = user;
