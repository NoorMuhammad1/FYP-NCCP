const logs = require("../models/logs");
exports.LogInActivity = (data) => {
  try {
    const { userid, request, output, description, error } = data;
    const _log = new logs({
      userid,
      request,
      output,
      description,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      error,
    });
    _log.getUserName(userid, (username) => {
      _log.username = username;
      _log.save().then(() => console.log("log entry added successfully"));
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getLogs = (req, res) => {
  logs.find({}, "_id username request output date time ", (error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "There was some error fetching the logs",
        error,
      });
    }
    if (data) {
      data = data.map((d) => {
        const { _id, username, request, output, date, time } = d;
        return {
          _id,
          username,
          request,
          output,
          date,
          time,
        };
      });
      return res.status(200).json(data);
    }
  });
};

exports.getLogDetails = (req, res) => {
  const { id } = req.body;
  logs.findById(id, (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error fetching the log details",
        error,
      });
    }
    if (data) {
      return res.status(200).json(data);
    }
  });
};

exports.deleteLogEntries = (req, res) => {
  const { logsToDelete } = req.body;
  logs.deleteMany({ _id: logsToDelete }, (error, data) => {
    if (error) {
      return res.status(400).json({
        message: "There was some error deleting the logs",
        error,
      });
    }
    if (data) {
      return res.status(200).json(data);
    }
  });
};
