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
    <div className="groups-container">
      <h1 className="groups-title">Groups</h1>
      <div>
        <h2 className="groups-creation-title">Create a Group</h2>
        <input
          className="groups-input"
          type="text"
          placeholder="Group Name"
          value={newGroup.name}
          onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
        />
        <textarea
          className="groups-textarea"
          placeholder="Group Bio"
          value={newGroup.bio}
          onChange={(e) => setNewGroup({ ...newGroup, bio: e.target.value })}
        />
        <button
          className="groups-create-button"
          onClick={() => handleCreateGroup(newGroup)}
        >
          Create
        </button>
      </div>
      <div className="groups-list">
        {groups.map((group) => (
          <div key={group._id} className="groups-list-item">
            <Link to={`/groups/${group._id}`} className="groups-list-link">
              {group.name}
            </Link>
            <button
              className="groups-delete-button"
              onClick={() => handleDeleteGroup(group._id)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
