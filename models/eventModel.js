const mongoose = require("mongoose");

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${year}-${month}-${day}`;

const eventScheema = new mongoose.Schema({
  eventName: {
    type: String,
    require: true,
  },
  CreatedAt: {
    type: String,
    default: currentDate,
  },
  eventDate: {
    type: String,
    require: true,
  },
  creator: {
    type: String,
    require: true,
  },
  creatorId: {
    type: String,
    require: true,
  },
  eventDetails: {
    type: String,
    require: true,
  },
  userList: [
    {
      email: {
        type: String,
        require: true,
      },
    },
  ],
});

const event = new mongoose.model("event", eventScheema);

module.exports = event;
