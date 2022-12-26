const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token || token === "loggedOUT") {
      return res.status(401).json({
        message: "please login first",
      });
    } else {
      const decodedData = jwt.verify(token, 'ASLDKJFSKALJDKAJSLHasdkjlkjASDdsfglkjaklASDFAasdf');
      req.user = await user.findById(decodedData.id);
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error,
    });
  }
};

module.exports = isAuthenticated;
