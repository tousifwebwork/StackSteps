
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDatabase = mongoose.connect(process.env.MONGO_URL)
       .then(() => console.log('MongoDB connected successfully'))
       .catch((error) => console.error('MongoDB connection error:', error));

module.exports = connectDatabase;