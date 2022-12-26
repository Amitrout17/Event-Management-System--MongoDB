const express = require("express");
const {
  createEvent,
  inviteFriends,
  eventDetails,
  eventUpdate,
  myEvents,
  eventReceived,
} = require("../controllers/eventController");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuth");
router.route("/createEvent").post(isAuthenticated, createEvent);
router.route("/invite").post(isAuthenticated, inviteFriends);
router.route("/event/details").post(isAuthenticated, eventDetails);
router.route("/event/update/:eventName").post(isAuthenticated, eventUpdate);
router.route("/myEvents").post(isAuthenticated, myEvents);
router.route('/events/received').get(isAuthenticated,eventReceived)
module.exports = router;
