import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/Groups.css";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({ name: "", bio: "" });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("/api/groups");
      setGroups(response.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  const handleCreateGroup = async () => {
    try {
      await axios.post("/api/groups", newGroup);
      fetchGroups(); 
      setNewGroup({ name: "", bio: "" });
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      console.log("Deleting group with ID:", groupId);  
  
      await axios.delete(`/api/groups/${groupId}`);
      fetchGroups(); // Refresh groups after deletion
    } catch (err) {
      console.error("Error deleting group:", err); 
    }
  };

  return (
    <div>
      <h1>Groups</h1>
      <div>
        <h2>Create a Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={newGroup.name}
          onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
        />
        <textarea
          placeholder="Group Bio"
          value={newGroup.bio}
          onChange={(e) => setNewGroup({ ...newGroup, bio: e.target.value })}
        />
        <button onClick={handleCreateGroup}>Create</button>
      </div>
      <div>
        <h2>Existing Groups</h2>
        {groups.map((group) => (
          <div key={group._id}>
            <Link to={`/groups/${group._id}`}>{group.name}</Link>
            <button onClick={() => handleDeleteGroup(group._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
