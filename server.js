const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/feedbackDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema and model
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  feedback: String,
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Routes
app.post('/submit-feedback', async (req, res) => {
  const { name, email, feedback } = req.body;
  const newFeedback = new Feedback({ name, email, feedback });
  await newFeedback.save();
  res.json({ message: 'Feedback submitted successfully!' });
});

app.get('/get-feedbacks', async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});