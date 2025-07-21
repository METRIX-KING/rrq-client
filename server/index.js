
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('Mongo Error', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
