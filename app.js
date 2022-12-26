const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", userRoute);
app.use("/api/v1", eventRoute);

app.listen(4000, () => {
  console.log("server running at port 4000");
});
module.exports = app;
