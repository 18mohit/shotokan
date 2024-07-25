const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const imageRouter = require('./routes/imageRouter');
const path = require('path');
const session = require('express-session');
const ownersRouter = require('./routes/ownerRouter');
const senseiRouter = require('./routes/senseiRouter');
const authRouter = require('./routes/authRouter');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:5173', // Ensure this matches your frontend URL
  credentials: true, // Allow credentials
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Ensure this line is present
app.use(session({
  secret: 'shotokan',
  resave: false,
  saveUninitialized: true,
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api', authRouter);
app.use('/api/images', imageRouter);
// app.use('/register', ownersRouter);
// app.use('/register', senseiRouter);
// app.use('/student', studentRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
