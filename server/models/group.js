const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  imageUrl: { type: String, default: "" }, // For group profile pictures
});

module.exports = mongoose.model("Group", groupSchema);