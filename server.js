const app = require("./app");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/outshade-task1")
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });
