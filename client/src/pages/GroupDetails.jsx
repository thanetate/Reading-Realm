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
    <div className="group-details-container">
      <h1 className="group-details-title">{group.name}</h1>
      <p className="group-details-bio">{group.bio}</p>

      <div className="chat-box">
        <div className="chat-messages-container">
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <strong className="chat-message-strong">{msg.sender}: </strong>
              <span className="chat-message-span">{msg.content}</span>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            className="chat-input"
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="chat-send-button"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
