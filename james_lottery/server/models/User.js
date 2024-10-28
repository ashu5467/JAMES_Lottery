const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  //name: { type: String, required: true }, // Adding name field
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  //role: { type: String, default: 'user' }, // Role can be 'admin' or 'user'
  //registrationDate: { type: Date}, // Adding registration date field
  //status: { type: String, default: 'Active' }, // Adding status field
});

module.exports = mongoose.model('User', userSchema);
