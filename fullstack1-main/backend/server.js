const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// MongoDB connection (Replace with your own MongoDB URI)
mongoose.connect('mongodb+srv://kavindakiridena:UsGGXH0OjoB3oHDJ@cluster0.xlrfs.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define a simple schema for chat messages (Optional: You can store messages in MongoDB)
const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the React app (for production build)
app.use(express.static(path.join(__dirname, 'client', 'build')));

// WebSocket connections
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');

  // Listen for incoming messages
  ws.on('message', async (data) => {
    const decodedMessage = data.toString();
    console.log('Received message: ', decodedMessage);

    // Save the message to MongoDB
    const newMessage = new Message({ username: 'User', message: decodedMessage });
    await newMessage.save();

    // Broadcast message to all connected clients
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(decodedMessage);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Routes (Optional: For other API endpoints)
app.get('/api/messages', async (req, res) => {
  const messages = await Message.find().sort({ timestamp: -1 }).limit(50); // Get the last 50 messages
  res.json(messages);
});

// For production, serve React's static files after building the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 5000;