const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Import models
const Donation = require('./models/Donation.js');
const DailyNeed = require('./models/dailyneeds.js');

// Initialize Express App
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server); // Initialize Socket.io

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://srirampurushothaman2004:RQoSZKpPv92O9BwG@foodtracker.pzyvj.mongodb.net/foodtrackerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Serve your HTML file
app.get('/', (req, res) => {
  res.sendFile('C:/Users/sarat/Desktop/food tracker/log.html'); // Adjust the path as needed
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages from clients
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast the message to all clients
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Route to fetch all donations
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: 'No donations found' });
    }
    res.json(donations);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ message: err.message });
  }
});

// Route to handle donation submission
app.post('/api/donate', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json(donation);
  } catch (err) {
    console.error('Error saving donation:', err);
    res.status(500).json({ message: err.message });
  }
});

// Route to add daily needs
app.post('/api/dailyneeds', async (req, res) => {
  try {
    const { foodItem, quantity, orphanage } = req.body;

    if (!foodItem || !quantity || !orphanage) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const dailyNeed = new DailyNeed({
      foodItem,
      quantity,
      orphanage
    });

    await dailyNeed.save();
    res.status(201).json(dailyNeed);
  } catch (err) {
    console.error('Error adding daily need:', err);
    res.status(500).json({ message: err.message });
  }
});

// Route to fetch daily needs
app.get('/api/dailyneeds', async (req, res) => {
  try {
    const dailyNeeds = await DailyNeed.find();
    if (!dailyNeeds || dailyNeeds.length === 0) {
      return res.status(404).json({ message: 'No daily needs found' });
    }
    res.json(dailyNeeds);
  } catch (err) {
    console.error('Error fetching daily needs:', err);
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
