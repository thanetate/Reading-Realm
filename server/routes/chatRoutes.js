const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// Fetch all messages for a group
router.get("/:groupId", async (req, res) => {
  try {
    const messages = await Message.find({ groupId: req.params.groupId });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Post a new message
router.post("/", async (req, res) => {
  const { groupId, sender, content } = req.body;

  try {
    const newMessage = await Message.create({ groupId, sender, content });
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
