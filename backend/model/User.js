// user.js

const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String},
  password: { type: String}
});

module.exports = mongoose.model('User', userSchema);

