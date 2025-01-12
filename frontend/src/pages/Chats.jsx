import React, { useEffect, useState } from 'react';
import './Chats.css';

function Chats() {
  const [messages, setMessages] = useState([]); // Store chat messages
  const [newMessage, setNewMessage] = useState(''); // Input message
  const [socket, setSocket] = useState(null); // WebSocket connection

  // Initialize WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5000'); // Connect to the WebSocket server
    setSocket(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const receivedMessage = event.data;
      console.log('Received message: ', receivedMessage);
      setMessages(prevMessages => [...prevMessages, receivedMessage]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close(); // Clean up WebSocket connection
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.send(newMessage); // Send the message as a string
      setMessages(prevMessages => [...prevMessages, `You: ${newMessage}`]); // Add to local chat
      setNewMessage(''); // Clear input field
    }
  };

  return (
    <div className="chat-wrapper">
    <div className="chat-container">
      <h1>Live Chat</h1>
      <div className="chat-box">
        <ul className="message-list">
          {messages.map((message, index) => (
            <li key={index} className="message-item">{message}</li>
          ))}
        </ul>
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
    </div>
  );
}

export default Chats;