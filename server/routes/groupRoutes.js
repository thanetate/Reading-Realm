const express = require("express");
const router = express.Router();
const Group = require("../models/group");


// Fetch all groups
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

// Create a new group
router.post("/", async (req, res) => {
  const { name, bio, imageUrl } = req.body;

  try {
    const newGroup = await Group.create({ name, bio, imageUrl });
    res.json(newGroup);
  } catch (err) {
    res.status(500).json({ error: "Failed to create group" });
  }
});

// Get group details by ID
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch group details" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const groupId = req.params.id;

    console.log("Deleting group with ID:", groupId);

    const deletedGroup = await Group.findByIdAndDelete(groupId); 

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (err) {
    console.error("Error deleting group:", err); 
    res.status(500).json({ message: "Error deleting group", error: err.message });
  }
});


module.exports = router;