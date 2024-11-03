// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['user', 'admin'], default: 'user' },
//   //registrationDate: { type: Date, default: Date.now },
//   status: { type: String, enum: ['Active', 'Inactive', 'Banned'], default: 'Active' },
//   profilePhoto: { type: String, default: '' } // Store URL/path of the profile photo
// });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  status: { type: String, enum: ['Active', 'Inactive', 'Banned'], default: 'Active' },
  profilePhoto: { type: String, default: '' }, // Store URL/path of the profile photo
  purchaseHistory: [{ // Track purchases
    lotteryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lottery' },
    purchaseDate: { type: Date, default: Date.now },
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true }
  }]
});

module.exports = mongoose.model('User', userSchema);
