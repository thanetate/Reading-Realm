import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../Styles/GroupDetails.css'; 

const GroupDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchGroupDetails();
    fetchMessages();
  }, [id]);

  const fetchGroupDetails = async () => {
    try {
      const response = await axios.get(`/api/groups/${id}`);
      setGroup(response.data);
    } catch (err) {
      console.error("Error fetching group details:", err);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/groups/chat/${id}`);
      setMessages(response.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const handleSendMessage = async () => {
    try {
      await axios.post("/api/groups/chat", { groupId: id, sender: "User1", content: newMessage });
      fetchMessages(); // Refresh messages
      setNewMessage(""); // Clear input after sending
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (!group) return <div>Loading...</div>;

  return (
    <div className="group-details">
      <h1>{group.name}</h1>
      <p>{group.bio}</p>

      <div className="chat-box">
        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg._id} className="message">
              <strong>{msg.sender}: </strong>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
