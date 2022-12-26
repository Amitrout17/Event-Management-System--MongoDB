const event = require("../models/eventModel");

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await event.create({
      eventName: req.body.eventName,
      creator: req.user.name,
      eventDetails: req.body.eventDetails,
      userList: req.body.userList,
      creatorId: req.user._id,
      eventDate: req.body.date,
    });
    res.status(200).json({
      message: "Event created sucessfully",
      event_details: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

exports.inviteFriends = async (req, res) => {
  try {
    //Invite user to a perticular event that is created by logged-in user
    const eventDetails = await event.findOne({
      creatorId: req.user._id,
      eventName: req.body.eventName,
    });

    if (!eventDetails) {
      return res.status(404).json({
        message: "No such event found",
      });
    }
    var tempList = eventDetails.userList;

    const newInvite = {
      email: req.body.userEmail,
    };

    tempList.push(newInvite);

    eventDetails.userList = tempList;
    await eventDetails.save();
    res.status(200).json({
      message: "Invitation Added Sucessfylly",
      details: eventDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

exports.eventDetails = async (req, res) => {
  try {
    const eventDetails = await event.find({
      creatorId: req.user._id,
      eventName: req.body.eventName,
    });

    if (!eventDetails) {
      return res.status(404).json({
        message: "No such event found",
      });
    }

    res.status(200).json({
      message: "Event Details Fetch Sucessfully",
      details: eventDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

exports.eventUpdate = async (req, res) => {
  try {
    const update = req.body;
    const eventDetails = await event.findOneAndUpdate(
      {
        creatorId: req.user._id,
        eventName: req.params.eventName,
      },
      update,
      {
        new: true,
      }
    );
    if (!eventDetails) {
      return res.status(404).json({
        message: "No such event found",
      });
    }

    console.log(req.params.eventName);
    res.status(200).json({
      message: "Event updated Sucessfully",
      details: eventDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

//api to see list of events which the user has created when he login

exports.myEvents = async (req, res) => {
  try {
    const { eventDate, eventName } = req.query;
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const queryObj = {};
    if (eventDate) {
      queryObj.eventDate = eventDate;
    }
    if (eventName) {
      queryObj.eventName = eventName;
    }
    queryObj.creatorId = req.user._id;

    var sortObj = {};

    const { sort, sortOrder } = req.query;

    if (sort && sortOrder) {
      sortObj = { [sort]: sortOrder };
    } else {
      sortObj.eventName = "asc";
    }

    const eventDetails = await event
      .find(queryObj)
      .skip(page * limit)
      .limit(limit)
      .sort(sortObj);

    if (!eventDetails) {
      return res.status(404).json({
        message: "No such event found",
      });
    }

    res.status(200).json({
      message: "Event Details Fetch Sucessfully",
      details: eventDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

//Api to see the invites that the user has recived

exports.eventReceived = async (req, res) => {
  try {
    var listArr = {
      email: req.user.email,
    };

    //filters
    const { eventDate, eventName } = req.query;
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const queryObj = {};
    if (eventDate) {
      queryObj.eventDate = eventDate;
    }
    if (eventName) {
      queryObj.eventName = eventName;
    }

    var sortObj = {};

    const { sort, sortOrder } = req.query;

    if (sort && sortOrder) {
      sortObj = { [sort]: sortOrder };
    } else {
      sortObj.eventName = "asc";
    }

    const eventDetails = await event
      .find({
        userList: { $elemMatch: listArr },
        ...queryObj,
      })
      .skip(page * limit)
      .limit(limit)
      .sort(sortObj);

    console.log(queryObj);

    res.status(200).json({
      message: "List fetch Sucessfully",
      list: eventDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};
