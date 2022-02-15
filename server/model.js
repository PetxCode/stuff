const mongoose = require("mongoose");

const Model = mongoose.Schema(
  {
    name: String
  },
  { timestamp: true }
);

module.exports = mongoose.model("changers", Model);
