const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const imageRouter = require('./routes/imageRouter');
const path = require('path');
const ownersRouter = require('./routes/ownerRouter');
const senseiRouter = require('./routes/senseiRouter');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/images', imageRouter);
app.use('/login',ownersRouter);
// app.use('/sensei',senseiRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
