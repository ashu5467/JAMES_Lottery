require('dotenv').config();

module.exports = {
  DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/lottery', // Set your MongoDB URI here
};
